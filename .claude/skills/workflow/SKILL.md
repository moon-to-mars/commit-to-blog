---
name: workflow
description: 사용자가 /workflow를 입력하면 프로젝트 루트의 checklist.md에서 첫 번째 미완료 항목을 찾아 설계 → 구현 → 리뷰 → 확인 → commit 준비까지의 전체 개발 워크플로우를 단계별로 진행합니다. 사용자가 "/workflow"를 입력하면 반드시 이 스킬을 사용하세요.
depends_on: [design, implement, review, confirm, commit]
---

# workflow (오케스트레이터)

## 역할
이 스킬은 각 단계 스킬을 순서대로 **발동(invoke)** 하는 오케스트레이터다. 직접 동작을 수행하지 않고, 아래 순서에 따라 독립 스킬을 하나씩 실행한다.

## 의존 스킬

| 스킬 | 역할 |
|------|------|
| `design` | checklist 항목 선택 + 구현 방법 합의 |
| `implement` | 합의된 설계를 코드로 구현 |
| `review` | 구현 코드 설명 + 피드백 수집 |
| `confirm` | 피드백 반영 후 수정 |
| `commit` | 변경사항 요약 + checklist 업데이트 + 커밋 안내 |

## 실행 순서

```
/workflow 입력
    │
    ▼
[design 스킬 발동]
    │ 설계 요약 확인 완료
    ▼
[implement 스킬 발동]
    │ 코드 작성 완료
    ▼
[review 스킬 발동]
    │
    ├─ 피드백 있음 → [confirm 스킬 발동] → [review 스킬 재발동] (루프)
    │
    └─ 만족 → [commit 스킬 발동]
                    │
                    ▼
                  종료
```

## 전환 규칙

각 스킬은 완료 조건이 충족되면 다음 스킬로 전환한다. 사용자에게 별도 안내 없이 자동으로 넘어간다. 단, 사용자의 응답이 있어야 다음 단계로 진행한다 — 단계 간 전환은 사용자 확인 후 이루어진다.
