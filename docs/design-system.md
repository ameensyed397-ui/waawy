# Waawy HRMS Design System Documentation

## Overview

Waawy HRMS implements a **comprehensive design system** with:

- **Typography**: Satoshi (display/headings) + Inter (body/UI)
- **3-layer design token architecture** for scalable, maintainable styling
- **Semantic typescale system** with responsive type sizing
- **Consistent spacing and color tokens**

---

## Typography System

### Font Families

**Display & Headings:** Satoshi

- Used for: H1-H6, hero text, marketing copy, buttons
- Weights: 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black)
- Characteristics: Geometric, modern, confident
- Loaded via: Fontshare CDN (optimal performance)

**Body & UI:** Inter

- Used for: Body text, labels, inputs, tooltips, all UI components
- Weights: 400-700
- Characteristics: Highly legible, optimized for screens
- Features: OpenType features (ligatures, alternates)
- Loaded via: next/font/google (self-hosted, optimal)

**Hand / Accent:** Caveat

- Used for: Waawy wordmark (footer), hero accent line "Waawy handles people.", callout phrases in sections
- Tailwind class: `font-hand` (CSS var: `--font-hand`)
- Weights: 400, 500, 600, 700
- Characteristics: Casual handwritten feel — adds warmth and brand personality
- Loaded via: next/font/google (self-hosted, optimal)

### Typescale System

```typescript
// Display sizes (Satoshi, for hero sections and large headings)
display-2xl   72px / 1.1 / -0.02em / 700    // Hero headlines
display-xl    60px / 1.1 / -0.02em / 700    // Page titles
display-lg    48px / 1.2 / -0.01em / 700    // Section headers
display-md    36px / 1.2 / -0.01em / 700    // Card headers
display-sm    30px / 1.3 / 0em / 600        // Subsection titles

// Heading sizes (Satoshi, for semantic headings)
heading-xl    24px / 1.4 / 0em / 600        // H4
heading-lg    20px / 1.5 / 0em / 600        // H5
heading-md    18px / 1.5 / 0em / 600        // H6
heading-sm    16px / 1.5 / 0em / 600        // Small headings

// Body sizes (Inter, for content and UI)
body-xl       20px / 1.6 / 0em / 400        // Large paragraphs
body-lg       18px / 1.6 / 0em / 400        // Reading content
body-md       16px / 1.6 / 0em / 400        // Default text (base)
body-sm       14px / 1.5 / 0em / 400        // Small text
body-xs       12px / 1.5 / 0em / 400        // Captions, metadata

// Label sizes (Inter, for UI labels and controls)
label-lg      14px / 1.4 / 0em / 500        // Form labels
label-md      13px / 1.4 / 0em / 500        // Compact labels
label-sm      12px / 1.4 / 0.01em / 500     // Tiny labels
```

### Usage Examples

```tsx
// Display text (marketing, landing pages)
<h1 className="font-display text-display-2xl">
  Welcome to Waawy
</h1>

// Headings (semantic HTML)
<h2 className="font-heading text-display-md">
  Company Onboarding
</h2>

// Body content
<p className="text-body-md">
  This is a standard paragraph with optimal readability.
</p>

// Labels and UI
<label className="text-label-lg font-medium">
  Email address
</label>

// Small text
<span className="text-body-xs text-muted-foreground">
  Last updated 2 hours ago
</span>
```

---

## Architecture Layers

### Layer 1: Primitives (`design-tokens/primitives.ts`)

**Purpose**: Raw, foundational design values  
**Usage**: Reference only, not for direct use in components

**Includes**:

- **Colors**: Complete color palettes (blue, purple, gray, green, red, yellow)
- **Spacing**: 4px base grid system (0-64)
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Border Radius**: From none to full rounded
- **Shadows**: Elevation system (sm to 2xl)
- **Z-Index**: Layering scale for UI elements
- **Transitions**: Duration and timing functions

**Example**:
\`\`\`typescript
import { primitives } from '@/design-tokens';

// ❌ Don't use primitives directly in components
const badExample = primitives.colors.blue[600];

// ✅ Use aliases instead
import { aliases } from '@/design-tokens';
const goodExample = aliases.interactive.primary.default;
\`\`\`

---

### Layer 2: Aliases (`design-tokens/aliases.ts`)

**Purpose**: Semantic mappings that give meaning to primitives  
**Usage**: Primary token layer for component styling

**Categories**:

#### Background Colors

- `background.canvas` - Page background
- `background.surface` - Card/panel backgrounds
- `background.surfaceHover` - Hover states
- `background.overlay` - Modal overlays

#### Text Colors

- `text.primary` - Main content text
- `text.secondary` - Supporting text
- `text.tertiary` - Subtle text
- `text.link` - Hyperlinks

#### Interactive States

- `interactive.primary.*` - Primary actions (default, hover, active, disabled)
- `interactive.secondary.*` - Secondary actions
- `interactive.ghost.*` - Ghost/minimal buttons

#### Feedback Colors

- `feedback.success.*` - Success states
- `feedback.error.*` - Error states
- `feedback.warning.*` - Warning states
- `feedback.info.*` - Informational states

**Example**:
\`\`\`typescript
import { aliases } from '@/design-tokens';

// ✅ Use semantic aliases
const Button = () => (
  <button style={{
    backgroundColor: aliases.interactive.primary.default,
    color: aliases.text.inverse,
  }}>
    Click me
  </button>
);
\`\`\`

---

### Layer 3: Components (`design-tokens/components.ts`)

**Purpose**: Component-specific styling configurations  
**Usage**: Pre-configured token sets for specific components

**Available Components**:

#### Button

- `button.primary.*` - Primary button styling
- `button.secondary.*` - Secondary button styling
- `button.ghost.*` - Ghost button styling

#### Input

- `input.background` - Input field background
- `input.border` - Border colors for all states
- `input.shadow` - Focus shadows

#### Card

- `card.background` - Card background
- `card.padding` - Size variants (sm, md, lg)
- `card.shadow` - Elevation

#### Modal

- `modal.overlay` - Backdrop styling
- `modal.maxWidth` - Size variants

#### Navigation

- `navigation.item.*` - Nav item states

#### Badge & Alert

- Pre-configured variants for all feedback states

**Example**:
\`\`\`typescript
import { components } from '@/design-tokens';

const PrimaryButton = () => (
  <button style={{
    backgroundColor: components.button.primary.background,
    color: components.button.primary.text,
    padding: components.button.primary.padding.md,
    borderRadius: components.button.primary.borderRadius,
  }}>
    Submit
  </button>
);
\`\`\`

---

## Integration with Tailwind CSS

The design tokens are integrated with Tailwind through CSS variables defined in `app/globals.css`.

### CSS Variables

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /*... more variables*/
}

.dark {
  --primary: 217.2 91.2% 59.8%;
  --background: 222.2 84% 4.9%;
  /*... dark mode overrides*/
}
\`\`\`

### Using with Tailwind

\`\`\`tsx
// Use Tailwind classes that reference CSS variables
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
\`\`\`

---

## shadcn/ui Integration

shadcn/ui components automatically use the design token system through:

1. **CSS Variables**: Components reference `--primary`, `--background`, etc.
2. **Tailwind Config**: Extended theme in `tailwind.config.ts`
3. **Component Variants**: Using `class-variance-authority`

### Adding shadcn/ui Components

\`\`\`bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
\`\`\`

Components will automatically use your design tokens!

---

## Theming

### Light/Dark Mode

Toggle dark mode by adding/removing the `dark` class on the `<html>` element:

\`\`\`typescript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
\`\`\`

### Custom Themes

To create a custom theme:

1. **Update Primitives**: Modify color palettes in `primitives.ts`
2. **Update CSS Variables**: Adjust HSL values in `globals.css`
3. **Rebuild**: Changes apply automatically

---

## Best Practices

### ✅ Do

- Use **aliases** for most component styling
- Use **component tokens** for complex, reusable components
- Keep **primitives** as the single source of truth
- Update tokens centrally, not in individual components
- Use semantic naming (e.g., `text.primary` not `gray.900`)

### ❌ Don't

- Don't use primitive tokens directly in components
- Don't hardcode colors, spacing, or other values
- Don't create one-off styles outside the token system
- Don't bypass the token layers

---

## Examples

### Creating a Custom Component

\`\`\`typescript
import { aliases, components } from '@/design-tokens';

export function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: aliases.background.surface,
        border: \`1px solid \${aliases.border.default}\`,
        borderRadius: components.card.borderRadius,
        padding: components.card.padding.md,
        boxShadow: components.card.shadow,
      }}
    >
      {children}
    </div>
  );
}
\`\`\`

### Using with Tailwind (Recommended)

\`\`\`tsx
export function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      {children}
    </div>
  );
}
\`\`\`

---

## Updating the Design System

### Changing Colors

1. Update `primitives.ts` color palette
2. Update `aliases.ts` semantic mappings if needed
3. Update CSS variables in `globals.css`
4. Test in both light and dark modes

### Adding New Tokens

1. Add to appropriate layer (primitives, aliases, or components)
2. Export from `design-tokens/index.ts`
3. Document usage in this file
4. Update CSS variables if needed

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
