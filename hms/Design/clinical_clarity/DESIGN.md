---
name: Clinical Clarity
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#525657'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6e70'
  on-tertiary-container: '#eff1f3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style
The design system focuses on a **Premium Healthcare SaaS** aesthetic, balancing clinical precision with a calming, high-end user experience. The brand personality is trustworthy, innovative, and highly legible, targeting healthcare professionals and administrators who require clarity under pressure.

The visual style is a hybrid of **Glassmorphism** and **Modern Corporate**. It utilizes frosted glass surfaces to represent transparency and "breathable" space, paired with sophisticated background blurs and soft, multi-layered shadows. The emotional response should be one of "effortless control"—reducing the cognitive load often associated with medical data through depth, light, and structured hierarchy.

## Colors
The palette is rooted in **Medical Blue (#2563EB)** to establish authority and trust, complemented by **Teal (#14B8A6)** for high-action secondary elements like wellness tracking or positive confirmations.

### Color Strategy
- **Primary:** Used for main actions and branding.
- **Secondary:** Used for secondary metrics and supportive UI elements.
- **Accent/Surface:** #F8FAFC serves as the foundation for light-mode surfaces, providing a cool, sterile but welcoming backdrop.
- **Glass Effects:** Surfaces utilize semi-transparent whites (light mode) or deep navy (dark mode) with a 20px-30px backdrop blur to create depth without cluttering the interface.

## Typography
The system uses **Inter** for its exceptional legibility in data-dense environments. 

### Implementation Rules
- **Headlines:** Use tighter letter spacing and bold weights to anchor sections.
- **Body:** Maintain a generous line height (1.5 - 1.6) for patient records and clinical notes to ensure readability.
- **Labels:** Use Medium (500) or Semi-bold (600) weights for data labels and small UI captions to differentiate them from body text.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a focus on "Clinical Air"—generous white space that prevents information overload.

- **Desktop:** 12-column grid, 24px gutters, 40px margins.
- **Tablet:** 8-column grid, 16px gutters, 24px margins.
- **Mobile:** 4-column grid, 16px gutters, 16px margins.

Spacing follows a 4px baseline, but primary components (cards/sections) should favor the `md` (24px) and `lg` (40px) tokens to maintain the premium, airy feel.

## Elevation & Depth
This design system relies on a "Layered Glass" philosophy to establish hierarchy.

1.  **Level 0 (Base):** Solid neutral background (#F8FAFC or #0F172A).
2.  **Level 1 (Surface):** Glassmorphic panels with `backdrop-filter: blur(20px)` and a subtle 1px inner border (white at 20% opacity).
3.  **Level 2 (Active/Floating):** Use soft, multi-stage shadows. A "Medical Glow" is achieved using a large-radius shadow with a hint of the Primary color (e.g., `0 20px 40px rgba(37, 99, 235, 0.08)`).
4.  **Transitions:** All elevation changes (hovering over a card) must use a 300ms cubic-bezier curve for a "weighted" feel.

## Shapes
The shape language is ultra-soft to counteract the sterile nature of medical data.

- **Cards:** Use `rounded-xl` (1.5rem / 24px) to create a friendly, modern container.
- **Buttons & Inputs:** Use `rounded-lg` (0.75rem / 12px) for a sophisticated, tactile feel.
- **Status Chips:** Use full pill-shaping (999px) to clearly distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Solid gradient (Primary to a slightly darker shade), 12px border radius, subtle drop shadow.
- **Secondary:** Transparent with a 1.5px border and glass blur, or a subtle Teal fill for "Add" actions.

### Glass Cards
- All cards must feature a `1px` white border (20% opacity) on the top/left to simulate a light source.
- Content within cards should have `md` (24px) padding.

### Input Fields
- Inputs are slightly taller (48px) with a soft background tint.
- On focus, the border transitions to Primary Blue with a 4px soft outer glow.

### Lists & Data Tables
- Use "Zebra-blur" styling: alternating rows have a 5% opacity Primary Blue tint instead of a solid gray.
- Column headers are `label-sm` with increased tracking for professional hierarchy.

### Health Charts & Visuals
- Use Primary and Secondary colors for data lines.
- Lines should be thick (3px) with "smoothed" vertices (spline curves) to maintain the soft aesthetic.