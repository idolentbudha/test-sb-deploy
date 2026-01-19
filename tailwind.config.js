/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Spacing scale from design tokens
      spacing: {
        0: "0px",
        0.5: "var(--scale-0-2)px",
        1: "var(--scale-25)px",
        1.5: "var(--scale-25-2)px",
        2: "var(--scale-50)px",
        3: "var(--scale-100)px",
        4: "var(--scale-100)px",
        6: "var(--scale-300)px",
        8: "var(--scale-200)px",
        10: "var(--scale-400)px",
        12: "var(--scale-300)px",
        16: "var(--scale-400)px",
        20: "var(--scale-500)px",
        24: "var(--scale-600)px",
        28: "var(--scale-700)px",
        32: "var(--scale-800)px",
        36: "var(--scale-900)px",
        40: "var(--scale-1000)px",
        44: "var(--scale-1100)px",
        48: "var(--scale-1200)px",
        52: "var(--scale-1300)px",
        56: "var(--scale-1400)px",
        60: "var(--scale-1500)px",
        64: "var(--scale-1600)px",
        72: "var(--scale-1800)px",
        80: "var(--scale-2000)px",
        96: "var(--scale-2400)px",
      },

      // Font sizes from responsive tokens
      fontSize: {
        xs: [
          "var(--font-size-body-xs)px",
          { lineHeight: "var(--line-height-body-xs)px" },
        ],
        sm: [
          "var(--font-size-body-sm)px",
          { lineHeight: "var(--line-height-body-sm)px" },
        ],
        base: [
          "var(--font-size-body-md)px",
          { lineHeight: "var(--line-height-body-md)px" },
        ],
        lg: [
          "var(--font-size-body-lg)px",
          { lineHeight: "var(--line-height-body-lg)px" },
        ],
        xl: [
          "var(--font-size-heading-h7)px",
          { lineHeight: "var(--line-height-heading-h7)px" },
        ],
        "2xl": [
          "var(--font-size-heading-h6)px",
          { lineHeight: "var(--line-height-heading-h6)px" },
        ],
        "3xl": [
          "var(--font-size-heading-h5)px",
          { lineHeight: "var(--line-height-heading-h5)px" },
        ],
        "4xl": [
          "var(--font-size-heading-h4)px",
          { lineHeight: "var(--line-height-heading-h4)px" },
        ],
        "5xl": [
          "var(--font-size-heading-h3)px",
          { lineHeight: "var(--line-height-heading-h3)px" },
        ],
        "6xl": [
          "var(--font-size-heading-h2)px",
          { lineHeight: "var(--line-height-heading-h2)px" },
        ],
        "7xl": [
          "var(--font-size-heading-h1)px",
          { lineHeight: "var(--line-height-heading-h1)px" },
        ],
      },

      // Font families from mapped tokens
      fontFamily: {
        heading: "var(--font-font-family-headings)",
        body: "var(--font-font-family-paragraph)",
        sans: "var(--font-font-family-paragraph)",
      },

      // Border radius from mapped tokens
      borderRadius: {
        none: "var(--border-radius-none)px",
        sm: "var(--border-radius-sm)px",
        DEFAULT: "var(--border-radius-md)px",
        md: "var(--border-radius-md)px",
        lg: "var(--border-radius-lg)px",
        xl: "var(--border-radius-xl)px",
        "2xl": "var(--border-radius-xxl)px",
        full: "var(--border-radius-round)px",
      },

      // Border widths from mapped tokens
      borderWidth: {
        DEFAULT: "var(--border-width-sm)px",
        0: "0px",
        2: "var(--border-width-md)px",
        4: "var(--border-width-lg)px",
        8: "var(--border-width-xl)px",
      },

      // Colors - keeping Tailwind defaults and adding semantic token-based colors

      colors: {
        // Surface/Background colors
        page: "var(--surface-colour-page)",
        primary: "var(--surface-colour-brand-primary)",
        secondary: "var(--surface-colour-secondary)",
        accent: "var(--surface-colour-accent)",

        // Action/Interactive colors
        "action-primary": "var(--surface-colour-action-primary)",
        "action-primary-hover": "var(--surface-colour-action-hover-primary)",
        "action-secondary": "var(--surface-colour-action-secondary)",
        "action-secondary-hover":
          "var(--surface-colour-action-hover-secondary)",
        "action-inverse": "var(--surface-colour-action-inverse)",
        "action-selected": "var(--surface-colour-action-selected)",

        // State colors
        error: "var(--surface-colour-error)",
        warning: "var(--surface-colour-warning)",
        success: "var(--surface-colour-positive-light)",
        info: "var(--surface-colour-highlight)",

        // Text colors
        "text-heading": "var(--text-colour-headings)",
        "text-body": "var(--text-colour-body)",
        "text-error": "var(--text-colour-error)",
        "text-success": "var(--text-colour-success)",
        "text-inverse": "var(--text-colour-inverse)",
        "text-brand": "var(--text-colour-brand)",

        // Border colors
        "border-primary": "var(--border-colour-primary)",
        "border-secondary": "var(--border-colour-secondary)",
        "border-error": "var(--border-colour-error)",
        "border-selected": "var(--border-colour-selected)",
      },
    },
  },
  plugins: [],
};
