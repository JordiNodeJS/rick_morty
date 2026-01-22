---
title: Write Valid SKILL.md Frontmatter
impact: HIGH
impactDescription: Invalid frontmatter prevents skill discovery and triggering
tags: skill, metadata, frontmatter, yaml
---

## Write Valid SKILL.md Frontmatter

Every skill must have valid YAML frontmatter in SKILL.md. This is the primary triggering mechanism.

### Incorrect (missing frontmatter)

```markdown
# My Skill

This skill does amazing things.

## When to Use
- User asks for X
- User needs Y
```

### Correct (with frontmatter)

```yaml
---
name: my-skill
description: Does amazing things. Use when user asks for X or needs Y.
---

# My Skill

This skill does amazing things.

## When to Use
- User asks for X
- User needs Y
```

### Required Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `name` | Skill identifier (kebab-case) | `react-best-practices` |
| `description` | Triggering description | See below |

### Description Best Practices

The `description` is critical. It must answer:
1. **What**: What the skill does
2. **When**: When to use it
3. **Triggers**: Specific phrases that activate it

```yaml
description: |
  Validates React components and enforces TypeScript best practices.
  Use when: (1) Writing new React components, (2) Adding props/types,
  (3) Reviewing component patterns, (4) Fixing type errors.
  Triggers: "validate component", "add prop types", "fix typescript"
```

### Common Errors

1. **Missing description entirely**
2. **Too vague**: "Helps with React" (vs. specific use cases)
3. **Too long**: >200 words (Claude skips long descriptions)
4. **Missing triggers**: Doesn't say when to activate

### Validation Command

```bash
# Check frontmatter exists and has required fields
grep -A2 "^---$" SKILL.md | head -4
```

### Multi-line Descriptions

Use YAML block scalar for long descriptions:

```yaml
description: |
  Detailed description spanning multiple lines.
  Line 2 continues the description.
  Line 3 provides additional context.
```

Avoid:
```yaml
description: Short description. (too brief)
description: This is a very long description that goes on and on and on...
  (inline continuation - hard to read)
```
