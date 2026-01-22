---
title: Create Rule Files in skills/name/rules/
impact: MEDIUM
impactDescription: Consistent rule structure enables grep-based discovery
tags: rules, structure, organization, discovery
---

## Create Rule Files in skills/name/rules/

Skills should organize specific patterns into individual rule files in a `rules/` directory.

### Directory Structure

```
my-skill/
├── SKILL.md              # Core skill definition
├── rules/                # Specific patterns
│   ├── rule-1.md
│   ├── rule-2.md
│   └── rule-3.md
└── AGENTS.md             # Full expansion (optional)
```

### Rule File Frontmatter

Each rule must have YAML frontmatter:

```yaml
---
title: Descriptive Rule Title
impact: HIGH|MEDIUM|LOW
impactDescription: One-line impact statement
tags: tag1, tag2, tag3
---
```

### Rule File Structure

```markdown
---
title: Rule Title
impact: MEDIUM
impactDescription: Avoids unnecessary re-renders
tags: react, optimization, hooks
---

## Rule Title

Brief explanation of the rule.

### Incorrect

```tsx
// Bad code example
// Why it's bad: explanation
```

### Correct

```tsx
// Good code example
// Why it's good: explanation
```

### When to Apply

- Context 1
- Context 2
```

### Impact Levels

| Level | Meaning | Example |
|-------|---------|---------|
| HIGH | Critical performance/correctness | Security, hydration, waterfalls |
| MEDIUM | Important but not critical | Re-renders, bundle size |
| LOW | Nice to have | Code style, minor optimizations |

### Tagging for Discovery

Tags enable grep-based rule discovery:

```yaml
tags: react, hooks, useEffect, cleanup
```

Then find with:
```bash
grep -r "useEffect" skills/*/rules/
```

### Common Tags by Domain

| Domain | Example Tags |
|--------|--------------|
| React | react, hooks, components, jsx, props |
| Performance | performance, optimization, bundle, lazy |
| Next.js | nextjs, ssr, routing, server-components |
| TypeScript | typescript, types, generics, inference |
| Testing | tests, vitest, jest, react-testing-library |

### Numbering Rules

Prefix rules with numbers for logical ordering in AGENTS.md:

```
rules/
├── 01-folder-structure.md
├── 02-naming-conventions.md
└── 03-code-patterns.md
```

This ensures predictable expansion order.

### Avoid Duplication

Each rule should cover one concept. Don't combine multiple patterns in one file.

Good:
- `rerender-memo.md` (one concept)
- `rerender-dependencies.md` (one concept)

Bad:
- `rerender-optimization.md` (combines memo + dependencies)
