#!/usr/bin/env bash
# Codec Generator — automatic schema-driven codec generation
# This standard HARNESS-PROCESS-STANDARD.md §6 + sg-gw ADR-016 / §7.10
#
# Input:  src/main/resources/telegram-schema/*.yaml
# Output: src/main/java/com/{org}/{prj}/{codec-pkg}/*.java  (auto-generated)
#
# Usage:
#   scripts/generate-codecs.sh                # Regenerate all schemas
#   scripts/generate-codecs.sh cs-header      # A specific schema only
#   scripts/generate-codecs.sh --check        # Regenerate and verify git diff (for CI)

set -euo pipefail

# ──────────────────────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────────────────────
SCHEMA_DIR="${SCHEMA_DIR:-src/main/resources/telegram-schema}"
GENERATOR_PKG="${GENERATOR_PKG:-com.{org}.{prj}.codecgen.CodecGenerator}"

MODE="generate"
TARGET=""

for arg in "$@"; do
  case "$arg" in
    --check) MODE="check" ;;
    --help|-h)
      grep '^# ' "$0" | head -20
      exit 0
      ;;
    *) TARGET="$arg" ;;
  esac
done

# ──────────────────────────────────────────────────────────
# Preflight checks
# ──────────────────────────────────────────────────────────
if [ ! -d "$SCHEMA_DIR" ]; then
  echo "[codecgen] schema directory not found: $SCHEMA_DIR"
  echo "[codecgen] For a guide on writing new schemas, see ADR-016"
  exit 1
fi

# ──────────────────────────────────────────────────────────
# Determine schema list
# ──────────────────────────────────────────────────────────
if [ -n "$TARGET" ]; then
  SCHEMAS=("$SCHEMA_DIR/${TARGET}.yaml")
  if [ ! -f "${SCHEMAS[0]}" ]; then
    echo "[codecgen] schema not found: ${SCHEMAS[0]}"
    exit 1
  fi
else
  mapfile -t SCHEMAS < <(find "$SCHEMA_DIR" -name "*.yaml" -not -path "*/catalog/*")
fi

echo "[codecgen] Processing ${#SCHEMAS[@]} schema(s)"

# ──────────────────────────────────────────────────────────
# Run CodecGenerator (Maven exec:java)
# ──────────────────────────────────────────────────────────
for schema in "${SCHEMAS[@]}"; do
  echo "  [generate] $schema"
  ./mvnw -q exec:java \
    -Dexec.mainClass="$GENERATOR_PKG" \
    -Dexec.args="$schema" \
    -DskipTests || {
      echo "[codecgen] FAIL: $schema"
      exit 1
    }
done

echo "[codecgen] All schemas processed"

# ──────────────────────────────────────────────────────────
# --check mode: verify git diff (for CI)
# ──────────────────────────────────────────────────────────
if [ "$MODE" = "check" ]; then
  echo "[codecgen] Verifying git diff after regeneration..."
  if git diff --quiet -- 'src/main/java/**/codec/*.java' 2>/dev/null; then
    echo "[codecgen] PASS — schemas and generated code are in sync"
    exit 0
  else
    echo ""
    echo "[codecgen] FAIL — schemas and generated code are out of sync"
    echo ""
    echo "  Possible causes:"
    echo "  - Regeneration skipped after a schema change"
    echo "  - Generated files edited directly (prohibited)"
    echo ""
    echo "  Remediation:"
    echo "  1. Run scripts/generate-codecs.sh"
    echo "  2. Review the git diff and commit"
    echo ""
    echo "  See this standard §7.10.5"
    git diff --stat -- 'src/main/java/**/codec/*.java'
    exit 1
  fi
fi
