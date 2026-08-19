# DevJokes
FUTM-SWE 221: Individual Software Development Project I, Random Joke Generator. A jokes web app where users can browse jokes by category (Programming, Pun, General, Dark), toggle a safe mode filter, and save their favourite jokes.

---

## Overview

**DevJokes** is a lightweight, responsive single-page web application (SPA) that delivers tech, programming, and general humor directly from the public [JokeAPI](https://www.jokeapi.dev).

Built with modular Vanilla JavaScript (ES Modules), modern CSS design tokens, and clean semantic HTML, DevJokes features a **Deep Blue** dark design inspired by minimalist Vercel aesthetics.

---

## Features

- **Random Joke Delivery**: Instantly fetch single-line or two-part setup/delivery jokes.
- **6 Category Pickers**: Filter jokes across `Programming`, `Misc`, `Dark`, `Pun`, `Spooky`, and `Christmas`.
- **Safe Mode Filter**: Header toggle to automatically exclude NSFW, explicit, or sensitive content.
- **Responsive & Mobile-First**: Fixed bottom navigation bar and clean card UI for desktop & mobile viewports.
- **Lucide Icons**: Clean, consistent vector icon set throughout the user interface.
- **Zero Dependencies**: Pure HTML, CSS, and native ES modules—no build tools or bundlers required.

---

## Project Structure

```
DevJokes/
├── index.html            # Main HTML entry point (Header, App Shell, Nav)
├── css/
│   ├── style.css         # Design tokens, reset, header, and navigation
│   ├── feed.css          # Joke card layout, loaders, and action buttons
│   └── categories.css    # Category selection grid & interactive cards
├── js/
│   ├── main.js           # Main bootstrapper & event listeners
│   ├── router.js         # Client-side hash router (#/feed, #/categories)
│   ├── api.js            # JokeAPI fetch wrapper (getJoke, getCategories)
│   ├── state.js          # Reactive state management (activeCategory, safeMode)
│   └── views/
│       ├── feed.js       # Joke card view & dynamic renderer
│       └── categories.js # Category picker view & category switcher
└── README.md
```

---

## Getting Started

Since **DevJokes** uses native ES Modules (`import`/`export`), it should be served via any standard HTTP web server.

### Option 1: Live Server (VS Code Extension)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **Open with Live Server** (or click **Go Live** in the status bar).
4. Your browser will automatically open to preview the app.

### Option 2: Python HTTP Server
```bash
python3 -m http.server 8080
```

### Option 3: Node.js `npx serve`
```bash
npx serve .
```

After starting your chosen server, navigate to `http://localhost:8080` (or the port specified by your server).

---

## API Reference

This application integrates with **JokeAPI v2**:
- **Endpoint**: `https://v2.jokeapi.dev/joke/{category}`
- **Documentation**: [https://www.jokeapi.dev](https://www.jokeapi.dev)
