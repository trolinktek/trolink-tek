# TrolinkTek Multilingual Website Implementation Prompt

Upgrade the existing TrolinkTek website without redesigning the approved header, footer, mega menus, page hierarchy or visual system.

Requirements:

1. Add an accessible dropdown language selector to the global header.
2. Languages: English, French, German, Arabic, Korean, Spanish and Russian.
3. Apply the selected language to every route and dynamically rendered page, including home, product categories, product details, downloads, manual pages, blog, blog articles, about and thank-you.
4. Persist the language selection while visitors navigate between pages.
5. Keep TrolinkTek, product model IDs, email addresses and technical identifiers untranslated.
6. Set the document `lang` attribute for every selection.
7. Use `dir="rtl"` for Arabic and `dir="ltr"` for all other languages.
8. Preserve the approved desktop header spacing and mobile hamburger behavior.
9. The dropdown must support keyboard access, Escape-to-close, outside-click close and visible focus states.
10. Do not add fake localized URLs or invalid hreflang links. Runtime translations stay on the canonical English URL until dedicated, human-reviewed locale routes are created.
11. Verify desktop and mobile rendering, modal behavior, menus, internal navigation and production build after implementation.

