# Runbook — {project name}

> **Audience**: Operations team
> **Version**: 1.0
> **Date**: {YYYY-MM-DD}
> **Approval**: {operations lead}

---

## 1. System Overview

| Item | Description |
|------|------|
| System name | {project name} |
| Primary owner | {name / contact} |
| Secondary owner | {name / contact} |
| Operating hours | {24/7 / weekdays 06:00~22:00} |
| Scheduled maintenance | {1st Saturday of each month 02:00~04:00} |

## 2. Architecture Summary

```
{ASCII diagram or Mermaid}
```

Core components:
- {API Gateway}
- {transaction processing}
- {settlement}
- {external adapters}
- {DB / messaging}

## 3. Routine Operations Procedures

### 3.1 Daily Checks (every day at 09:00)
- [ ] Service health check (`curl https://api.../health`)
- [ ] Review dashboard KPIs (Grafana / Datadog)
- [ ] Review error logs (severity ≥ HIGH)
- [ ] Verify batch results (previous night)

### 3.2 Daily Batch (starts at 00:00)
| Time | Job | Duration | Owner |
|------|------|------|------|
| 00:00 | Daily settlement start | 60 min | Automated |
| 01:00 | External system integration | 30 min | Automated |
| 01:30 | Backup | 60 min | Automated |
| 02:30 | Monitoring report | 10 min | Operations |

### 3.3 Weekly Operations
- [ ] Review security patch application (every Monday)
- [ ] Review log retention policy (every Friday)
- [ ] Analyze load trends (every Friday)

## 4. Troubleshooting

### 4.1 Health Check Failure

**Symptom**: `/health` returns 500

**Check order**:
1. Is the service process alive? (`ps aux | grep <service>`)
2. Can the DB be reached? (`psql -h ... -c 'SELECT 1'`)
3. Can the messaging queue be reached?
4. Health of dependent external systems (each external API)

**Recovery**:
- Single instance failure → wait for automatic restart (30 s)
- Multiple instance failure → escalate to §5 incident response procedure

### 4.2 Response Latency (P95 > 1s)

**Check order**:
1. CPU / memory usage (`top` / `htop`)
2. GC logs (for Java)
3. DB slow query logs
4. External API response times

**Recovery**:
- Review DB indexes
- Cache warm-up
- Horizontal scaling (`kubectl scale`)

### 4.3 External API Failure

**Check order**:
1. External system status page
2. Queue backlog (retry queue)
3. Circuit breaker state

**Recovery**:
- 3 automatic retries → queue
- Automatic reprocessing when the external system recovers
- If it persists longer than 1 hour, contact the external system owner

## 5. Incident Response by Severity

| Severity | Definition | Response Time | Alerting |
|------|------|---------|------|
| Sev-1 | Company-wide service outage | Within 30 min | SMS + phone |
| Sev-2 | Partial feature outage | Within 1 hour | SMS + email |
| Sev-3 | Performance degradation | Within 4 hours | Email |
| Sev-4 | Minor issue | Within 24 hours | Slack |

## 6. Deployment Procedure

### 6.1 Regular Deployment (once a week, Tuesday 22:00)

```bash
# 1. Pre-deployment checks
./scripts/pre-deploy-check.sh

# 2. Blue-green deployment
./scripts/deploy.sh --env=prod --strategy=blue-green

# 3. Health check (wait 60 seconds)
./scripts/wait-healthy.sh --timeout=60

# 4. Traffic switch
./scripts/switch-traffic.sh --to=green

# 5. 5-minute monitoring
./scripts/post-deploy-monitor.sh --duration=300

# 6. Keep previous version (for rollback, 72 hours)
```

### 6.2 Emergency Patch

- Sev-1 defect → hotfix deployment within 4 hours (G3 may be bypassed; PM approval required)
- Afterwards, strengthen regression verification via the regular procedure

### 6.3 Rollback

```bash
# Recover by blue-green traffic switch only (no changes to production data)
./scripts/switch-traffic.sh --to=blue
./scripts/wait-healthy.sh

# If DB schema changes are involved
psql -f mapping/db/migration/rollback/U{version}__{name}.sql
```

> Keep emergency rollback available for **72 hours** after cutover (BCP principle).

## 7. Backup / Recovery

| Item | Interval | Retention | Location |
|------|------|------|------|
| DB full backup | Daily 03:00 | 30 days | S3 + Glacier |
| DB incremental backup | Hourly | 7 days | S3 |
| Transaction logs | Real-time | 7 days | Local + S3 |
| Audit logs | Daily | 7 years | Glacier |
| Application logs | Daily | 30 days | ELK |

### Recovery Scenarios

- **Single table corruption**: PITR (Point-In-Time Recovery)
- **Full DB corruption**: full backup restore + WAL replay (RTO ≤ 1 hour)
- **DR site failover**: activate secondary (RPO ≤ 5 min)

## 8. Monitoring / Alerts

| Metric | Threshold | Channel | Response |
|------|--------|------|------|
| CPU > 80% | Sustained 5 min | Slack | Horizontal scaling |
| Memory > 90% | Sustained 5 min | Slack + SMS | GC review |
| Error rate > 1% | Sustained 1 min | Slack + SMS | Log analysis |
| Response P95 > 1s | Sustained 5 min | Slack | Load analysis |
| DB connections > 80% | Sustained 1 min | Slack | Pool review |
| Disk > 85% | Immediately | Slack + SMS | Log cleanup |

## 9. Contacts

| Role | Name | Phone | Email | Backup |
|------|------|------|------|------|
| Operations lead | {name} | {010-} | {email} | {name} |
| Development lead | {name} | {010-} | {email} | {name} |
| DBA | {name} | {010-} | {email} | {name} |
| Information Security | {name} | {010-} | {email} | {name} |
| External (KFTC etc.) | {name} | {ext} | {email} | - |

## 10. Frequently Asked Operations Questions (FAQ)

| Q | A |
|---|---|
| Nightly batch failed? | §4.3 external API failure procedure / if not recovered by 06:00, §5 Sev-2 |
| DB disk running out? | Archive log tables → see §7 backup policy |
| Certificate expiring soon? | Automatic alert 30 days ahead / `scripts/renew-cert.sh` |
| Key rotation? | Automatic every 90 days / for manual rotation see security ADR-007 |

---

**Approval**
| Date | Approver | Comment |
|------|--------|------|
| {YYYY-MM-DD} | Operations lead | |
| {YYYY-MM-DD} | Information Security | |
