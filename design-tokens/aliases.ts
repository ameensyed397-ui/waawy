/**
 * ALIAS DESIGN TOKENS
 * 
 * Semantic tokens that map primitives to specific use cases.
 * These provide meaning and context to raw primitive values.
 * Components should primarily use alias tokens, not primitives.
 */

import { primitives } from './primitives';

export const aliases = {
    // Background Colors
    background: {
        canvas: primitives.colors.gray[50],
        surface: primitives.colors.white,
        surfaceHover: primitives.colors.gray[100],
        surfaceActive: primitives.colors.gray[200],
        overlay: 'rgba(0, 0, 0, 0.5)',
        disabled: primitives.colors.gray[100],

        // Dark mode
        dark: {
            canvas: primitives.colors.gray[950],
            surface: primitives.colors.gray[900],
            surfaceHover: primitives.colors.gray[800],
            surfaceActive: primitives.colors.gray[700],
            overlay: 'rgba(0, 0, 0, 0.7)',
            disabled: primitives.colors.gray[800],
        },
    },

    // Text Colors
    text: {
        primary: primitives.colors.gray[900],
        secondary: primitives.colors.gray[600],
        tertiary: primitives.colors.gray[500],
        disabled: primitives.colors.gray[400],
        inverse: primitives.colors.white,
        link: primitives.colors.blue[600],
        linkHover: primitives.colors.blue[700],

        // Dark mode
        dark: {
            primary: primitives.colors.gray[50],
            secondary: primitives.colors.gray[400],
            tertiary: primitives.colors.gray[500],
            disabled: primitives.colors.gray[600],
            inverse: primitives.colors.gray[900],
            link: primitives.colors.blue[400],
            linkHover: primitives.colors.blue[300],
        },
    },

    // Border Colors
    border: {
        default: primitives.colors.gray[200],
        hover: primitives.colors.gray[300],
        active: primitives.colors.gray[400],
        focus: primitives.colors.blue[500],
        disabled: primitives.colors.gray[200],

        // Dark mode
        dark: {
            default: primitives.colors.gray[700],
            hover: primitives.colors.gray[600],
            active: primitives.colors.gray[500],
            focus: primitives.colors.blue[500],
            disabled: primitives.colors.gray[800],
        },
    },

    // Interactive States
    interactive: {
        primary: {
            default: primitives.colors.blue[600],
            hover: primitives.colors.blue[700],
            active: primitives.colors.blue[800],
            disabled: primitives.colors.gray[300],
        },
        secondary: {
            default: primitives.colors.purple[600],
            hover: primitives.colors.purple[700],
            active: primitives.colors.purple[800],
            disabled: primitives.colors.gray[300],
        },
        ghost: {
            default: 'transparent',
            hover: primitives.colors.gray[100],
            active: primitives.colors.gray[200],
            disabled: 'transparent',
        },
    },

    // Feedback Colors
    feedback: {
        success: {
            background: primitives.colors.green[50],
            border: primitives.colors.green[200],
            text: primitives.colors.green[800],
            icon: primitives.colors.green[600],
        },
        error: {
            background: primitives.colors.red[50],
            border: primitives.colors.red[200],
            text: primitives.colors.red[800],
            icon: primitives.colors.red[600],
        },
        warning: {
            background: primitives.colors.yellow[50],
            border: primitives.colors.yellow[200],
            text: primitives.colors.yellow[800],
            icon: primitives.colors.yellow[600],
        },
        info: {
            background: primitives.colors.blue[50],
            border: primitives.colors.blue[200],
            text: primitives.colors.blue[800],
            icon: primitives.colors.blue[600],
        },
    },

    // Focus States
    focus: {
        ring: primitives.colors.blue[500],
        ringOffset: primitives.colors.white,
        ringWidth: '2px',
        ringOffsetWidth: '2px',
    },

    // Elevation (Shadows)
    elevation: {
        low: primitives.shadows.sm,
        medium: primitives.shadows.md,
        high: primitives.shadows.lg,
        highest: primitives.shadows.xl,
    },
} as const;

export type Aliases = typeof aliases;
