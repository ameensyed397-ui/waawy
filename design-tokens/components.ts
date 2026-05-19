/**
 * COMPONENT-SPECIFIC DESIGN TOKENS
 * 
 * Tokens tailored for specific component patterns.
 * These build on top of alias tokens and provide component-level styling.
 */

import { primitives } from './primitives';
import { aliases } from './aliases';

export const components = {
    // Button Component Tokens
    button: {
        primary: {
            background: aliases.interactive.primary.default,
            backgroundHover: aliases.interactive.primary.hover,
            backgroundActive: aliases.interactive.primary.active,
            backgroundDisabled: aliases.interactive.primary.disabled,
            text: aliases.text.inverse,
            textDisabled: aliases.text.disabled,
            borderRadius: primitives.borderRadius.md,
            padding: {
                sm: `${primitives.spacing[2]} ${primitives.spacing[3]}`,
                md: `${primitives.spacing[2]} ${primitives.spacing[4]}`,
                lg: `${primitives.spacing[3]} ${primitives.spacing[6]}`,
            },
            fontSize: {
                sm: primitives.typography.fontSize.sm,
                md: primitives.typography.fontSize.base,
                lg: primitives.typography.fontSize.lg,
            },
            fontWeight: primitives.typography.fontWeight.medium,
            shadow: aliases.elevation.low,
            shadowHover: aliases.elevation.medium,
        },
        secondary: {
            background: 'transparent',
            backgroundHover: aliases.background.surfaceHover,
            backgroundActive: aliases.background.surfaceActive,
            backgroundDisabled: 'transparent',
            text: aliases.interactive.secondary.default,
            textDisabled: aliases.text.disabled,
            border: aliases.border.default,
            borderHover: aliases.interactive.secondary.hover,
            borderRadius: primitives.borderRadius.md,
            padding: {
                sm: `${primitives.spacing[2]} ${primitives.spacing[3]}`,
                md: `${primitives.spacing[2]} ${primitives.spacing[4]}`,
                lg: `${primitives.spacing[3]} ${primitives.spacing[6]}`,
            },
        },
        ghost: {
            background: aliases.interactive.ghost.default,
            backgroundHover: aliases.interactive.ghost.hover,
            backgroundActive: aliases.interactive.ghost.active,
            text: aliases.text.primary,
            textDisabled: aliases.text.disabled,
            borderRadius: primitives.borderRadius.md,
        },
    },

    // Input Component Tokens
    input: {
        background: aliases.background.surface,
        backgroundDisabled: aliases.background.disabled,
        text: aliases.text.primary,
        textPlaceholder: aliases.text.tertiary,
        border: aliases.border.default,
        borderHover: aliases.border.hover,
        borderFocus: aliases.border.focus,
        borderError: aliases.feedback.error.border,
        borderRadius: primitives.borderRadius.md,
        padding: `${primitives.spacing[2]} ${primitives.spacing[3]}`,
        fontSize: primitives.typography.fontSize.base,
        shadow: primitives.shadows.sm,
        shadowFocus: `0 0 0 3px ${aliases.focus.ring}33`,
    },

    // Card Component Tokens
    card: {
        background: aliases.background.surface,
        backgroundHover: aliases.background.surfaceHover,
        border: aliases.border.default,
        borderRadius: primitives.borderRadius.lg,
        padding: {
            sm: primitives.spacing[4],
            md: primitives.spacing[6],
            lg: primitives.spacing[8],
        },
        shadow: aliases.elevation.low,
        shadowHover: aliases.elevation.medium,
    },

    // Modal/Dialog Component Tokens
    modal: {
        overlay: aliases.background.overlay,
        background: aliases.background.surface,
        border: aliases.border.default,
        borderRadius: primitives.borderRadius.xl,
        padding: primitives.spacing[6],
        shadow: aliases.elevation.highest,
        maxWidth: {
            sm: '400px',
            md: '600px',
            lg: '800px',
            xl: '1200px',
        },
    },

    // Navigation Component Tokens
    navigation: {
        background: aliases.background.surface,
        border: aliases.border.default,
        item: {
            text: aliases.text.secondary,
            textHover: aliases.text.primary,
            textActive: aliases.interactive.primary.default,
            background: 'transparent',
            backgroundHover: aliases.background.surfaceHover,
            backgroundActive: aliases.interactive.primary.default + '10',
            borderRadius: primitives.borderRadius.md,
            padding: `${primitives.spacing[2]} ${primitives.spacing[3]}`,
        },
    },

    // Badge Component Tokens
    badge: {
        primary: {
            background: aliases.interactive.primary.default,
            text: aliases.text.inverse,
            borderRadius: primitives.borderRadius.full,
            padding: `${primitives.spacing[1]} ${primitives.spacing[2]}`,
            fontSize: primitives.typography.fontSize.xs,
            fontWeight: primitives.typography.fontWeight.medium,
        },
        success: {
            background: aliases.feedback.success.background,
            text: aliases.feedback.success.text,
            border: aliases.feedback.success.border,
        },
        error: {
            background: aliases.feedback.error.background,
            text: aliases.feedback.error.text,
            border: aliases.feedback.error.border,
        },
        warning: {
            background: aliases.feedback.warning.background,
            text: aliases.feedback.warning.text,
            border: aliases.feedback.warning.border,
        },
    },

    // Alert Component Tokens
    alert: {
        success: {
            background: aliases.feedback.success.background,
            border: aliases.feedback.success.border,
            text: aliases.feedback.success.text,
            icon: aliases.feedback.success.icon,
            borderRadius: primitives.borderRadius.md,
            padding: primitives.spacing[4],
        },
        error: {
            background: aliases.feedback.error.background,
            border: aliases.feedback.error.border,
            text: aliases.feedback.error.text,
            icon: aliases.feedback.error.icon,
            borderRadius: primitives.borderRadius.md,
            padding: primitives.spacing[4],
        },
        warning: {
            background: aliases.feedback.warning.background,
            border: aliases.feedback.warning.border,
            text: aliases.feedback.warning.text,
            icon: aliases.feedback.warning.icon,
            borderRadius: primitives.borderRadius.md,
            padding: primitives.spacing[4],
        },
        info: {
            background: aliases.feedback.info.background,
            border: aliases.feedback.info.border,
            text: aliases.feedback.info.text,
            icon: aliases.feedback.info.icon,
            borderRadius: primitives.borderRadius.md,
            padding: primitives.spacing[4],
        },
    },
} as const;

export type Components = typeof components;
