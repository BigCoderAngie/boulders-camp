# Boulders Camp — Wolwedans (Website Prototype)

Creo Media Stage 2 practical challenge: a responsive website prototype for Wolwedans Boulders Camp, designed to take visitors from discovery to a direct enquiry.

**Live site:** boulders-camp.netlify.app


## Run locally
No build step. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Structure
- `index.html` — page markup
- `styles.css` — styles; colours, fonts and radii are CSS variables in one block for reuse across Wolwedans properties
- `content.js` — all content (experiences, day moments, map places, itinerary blocks, journal notes), structured to map to CMS content types
- `app.js` — interactions: experience filters, "A day at Boulders" scroll story, interactive map, stay planner, enquiry dialog
- `assets/` — public Boulders Camp imagery from wolwedans.com, resized for web

## Notes
Built with HTML, CSS and vanilla JavaScript. The enquiry and newsletter forms are prototypes: nothing is sent or stored.
