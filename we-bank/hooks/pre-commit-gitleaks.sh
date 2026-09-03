#!/usr/bin/env bash
# Security Hook L1 — git pre-commit gitleaks scan
# This standard (HARNESS-PROCESS-STANDARD.md §5.4), stage L1
#
# Installation:
#   cp hooks/pre-commit-gitleaks.sh .git/hooks/pre-commit
#   chmod +x .git/hooks/pre-commit
#
# Or register this script if using husky / the pre-commit framework.

set -euo pipefail

# ────────────────────────────────────────────────────────────────────
# Configuration
# ────────────────────────────────────────────────────────────────────
GITLEAKS_VERSION="${GITLEAKS_VERSION:-v8.18.0}"
CONFIG_FILE="${GITLEAKS_CONFIG:-hooks/gitleaks.toml}"  # Project custom rules
ALLOW_BYPASS_ENV="ALLOW_GITLEAKS_BYPASS"               # For emergencies only

# ────────────────────────────────────────────────────────────────────
# Verify gitleaks installation
# ────────────────────────────────────────────────────────────────────
if ! command -v gitleaks >/dev/null 2>&1; then
  echo "[L1 Hook] gitleaks is not installed. Installation instructions:"
  echo "  macOS:   brew install gitleaks"
  echo "  Linux:   curl -sSL https://github.com/gitleaks/gitleaks/releases/download/${GITLEAKS_VERSION}/gitleaks_$(uname -s)_$(uname -m).tar.gz | tar xz -C /usr/local/bin"
  echo "  Docker:  docker run --rm -v \$PWD:/repo zricethezav/gitleaks:latest"
  exit 1
fi

# ────────────────────────────────────────────────────────────────────
# Bypass prevention
# ────────────────────────────────────────────────────────────────────
if [ "${!ALLOW_BYPASS_ENV:-}" = "1" ]; then
  APPROVAL_FILE="${GITLEAKS_BYPASS_APPROVAL:-security/gitleaks-bypass-approval.md}"
  echo "[L1 Hook] WARNING — bypass attempted with ${ALLOW_BYPASS_ENV}=1."
  echo "[L1 Hook] Bypass is allowed only when a PM approval record file exists: ${APPROVAL_FILE}"

  if [ ! -f "${APPROVAL_FILE}" ]; then
    echo "[L1 Hook] FAIL — blocking bypass because the approval record file is missing."
    echo "[L1 Hook] Required items: reason / approver / expiry date / key rotation plan / APPROVED status"
    exit 1
  fi

  if ! grep -Eq 'APPROVED' "${APPROVAL_FILE}"; then
    echo "[L1 Hook] FAIL — the approval record file does not contain an APPROVED status."
    exit 1
  fi

  logger -t harness-l1-hook "gitleaks bypass by ${USER} at $(date), approval=${APPROVAL_FILE}"
  echo "[L1 Hook] BYPASS APPROVED — proceeding with audit log and approval record retained."
  exit 0
fi

# ────────────────────────────────────────────────────────────────────
# Run scan (staged area only)
# ────────────────────────────────────────────────────────────────────
echo "[L1 Hook] Starting gitleaks secret scan (staged files)..."

GITLEAKS_OPTS=(
  "protect"
  "--staged"
  "--verbose"
  "--no-banner"
  "--redact"
)

if [ -f "${CONFIG_FILE}" ]; then
  GITLEAKS_OPTS+=("--config" "${CONFIG_FILE}")
  echo "[L1 Hook] Using custom rules: ${CONFIG_FILE}"
fi

if gitleaks "${GITLEAKS_OPTS[@]}"; then
  echo "[L1 Hook] PASS — no secrets found"
  exit 0
else
  echo ""
  echo "[L1 Hook] FAIL — secrets detected. The commit has been blocked."
  echo ""
  echo "  Remediation:"
  echo "  1. Move detected secrets to environment variables or Vault/KMS"
  echo "  2. Add .env files to .gitignore"
  echo "  3. If already pushed, rotate keys immediately + rewrite git history"
  echo ""
  echo "  See this standard §5.4, security hook stage 3"
  echo ""
  exit 1
fi
