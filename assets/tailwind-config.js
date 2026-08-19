/* ============================================================================
   Muse Ice Cream Bar — gedeelde Tailwind-config
   ----------------------------------------------------------------------------
   Alle pagina's gebruiken deze config, zodat kleurnamen als bg-primary of
   text-on-surface-variant overal hetzelfde betekenen.

   De kleuren zelf staan NIET hier maar in assets/theme.css, als CSS-variabelen.
   Daardoor kan één palet-omschakeling de hele site meenemen.
   Dit bestand moet ná de Tailwind-CDN geladen worden.
   ========================================================================= */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "inverse-primary": "rgb(var(--c-inverse-primary) / <alpha-value>)",
              "tertiary-fixed": "rgb(var(--c-tertiary-fixed) / <alpha-value>)",
              "surface-variant": "rgb(var(--c-surface-variant) / <alpha-value>)",
              "on-background": "rgb(var(--c-on-background) / <alpha-value>)",
              "on-primary-fixed": "rgb(var(--c-on-primary-fixed) / <alpha-value>)",
              "on-primary-container": "rgb(var(--c-on-primary-container) / <alpha-value>)",
              "on-secondary-fixed": "rgb(var(--c-on-secondary-fixed) / <alpha-value>)",
              "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)",
              "secondary-fixed": "rgb(var(--c-secondary-fixed) / <alpha-value>)",
              "error-container": "rgb(var(--c-error-container) / <alpha-value>)",
              "outline": "rgb(var(--c-outline) / <alpha-value>)",
              "on-tertiary": "rgb(var(--c-on-tertiary) / <alpha-value>)",
              "primary-fixed-dim": "rgb(var(--c-primary-fixed-dim) / <alpha-value>)",
              "primary": "rgb(var(--c-primary) / <alpha-value>)",
              "on-error": "rgb(var(--c-on-error) / <alpha-value>)",
              "surface-container": "rgb(var(--c-surface-container) / <alpha-value>)",
              "on-primary-fixed-variant": "rgb(var(--c-on-primary-fixed-variant) / <alpha-value>)",
              "on-tertiary-fixed": "rgb(var(--c-on-tertiary-fixed) / <alpha-value>)",
              "secondary-fixed-dim": "rgb(var(--c-secondary-fixed-dim) / <alpha-value>)",
              "secondary": "rgb(var(--c-secondary) / <alpha-value>)",
              "background": "rgb(var(--c-background) / <alpha-value>)",
              "surface": "rgb(var(--c-surface) / <alpha-value>)",
              "error": "rgb(var(--c-error) / <alpha-value>)",
              "on-primary": "rgb(var(--c-on-primary) / <alpha-value>)",
              "inverse-surface": "rgb(var(--c-inverse-surface) / <alpha-value>)",
              "inverse-on-surface": "rgb(var(--c-inverse-on-surface) / <alpha-value>)",
              "surface-tint": "rgb(var(--c-surface-tint) / <alpha-value>)",
              "on-surface": "rgb(var(--c-on-surface) / <alpha-value>)",
              "surface-container-lowest": "rgb(var(--c-surface-container-lowest) / <alpha-value>)",
              "surface-container-low": "rgb(var(--c-surface-container-low) / <alpha-value>)",
              "on-secondary-fixed-variant": "rgb(var(--c-on-secondary-fixed-variant) / <alpha-value>)",
              "on-error-container": "rgb(var(--c-on-error-container) / <alpha-value>)",
              "primary-fixed": "rgb(var(--c-primary-fixed) / <alpha-value>)",
              "on-secondary-container": "rgb(var(--c-on-secondary-container) / <alpha-value>)",
              "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)",
              "tertiary-fixed-dim": "rgb(var(--c-tertiary-fixed-dim) / <alpha-value>)",
              "tertiary": "rgb(var(--c-tertiary) / <alpha-value>)",
              "surface-dim": "rgb(var(--c-surface-dim) / <alpha-value>)",
              "tertiary-container": "rgb(var(--c-tertiary-container) / <alpha-value>)",
              "on-secondary": "rgb(var(--c-on-secondary) / <alpha-value>)",
              "surface-container-highest": "rgb(var(--c-surface-container-highest) / <alpha-value>)",
              "surface-bright": "rgb(var(--c-surface-bright) / <alpha-value>)",
              "on-tertiary-container": "rgb(var(--c-on-tertiary-container) / <alpha-value>)",
              "secondary-container": "rgb(var(--c-secondary-container) / <alpha-value>)",
              "outline-variant": "rgb(var(--c-outline-variant) / <alpha-value>)",
              "surface-container-high": "rgb(var(--c-surface-container-high) / <alpha-value>)",
              "on-tertiary-fixed-variant": "rgb(var(--c-on-tertiary-fixed-variant) / <alpha-value>)",
              "accent-1": "rgb(var(--c-accent-1) / <alpha-value>)",
              "accent-2": "rgb(var(--c-accent-2) / <alpha-value>)",
              "accent-3": "rgb(var(--c-accent-3) / <alpha-value>)"

      },
      "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
      },
      "spacing": {
              "margin-desktop": "64px",
              "margin-mobile": "20px",
              "stack-sm": "12px",
              "unit": "8px",
              "gutter": "16px",
              "stack-md": "24px",
              "stack-lg": "48px"
      },
      "fontFamily": {
              "label-sm": ["Plus Jakarta Sans"],
              "headline-md": ["Epilogue"],
              "body-md": ["Plus Jakarta Sans"],
              "body-lg": ["Plus Jakarta Sans"],
              "headline-lg": ["Epilogue"],
              "display-accent": ["Spline Sans"]
      },
      "fontSize": {
              "label-sm": ["13px", {"lineHeight": "1.2", "fontWeight": "600"}],
              "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "700"}],
              "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
              "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
              "headline-lg": ["36px", {"lineHeight": "1.2", "fontWeight": "800"}],
              "display-accent": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}]
      }
    },
  },
}
