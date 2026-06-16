# 🌙 Night PDF

> **Convert bright, eye-straining PDFs into dark-themed, night-friendly documents — 100% in your browser.**

[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/Framework-React-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📖 What is Night PDF?

**Night PDF** is an eye-friendly PDF reader and converter. While the project originally started as a backend API, it has been upgraded to a **100% client-side web application**. 

Now, you can upload, read, and convert bright, high-glare PDFs into gorgeous dark-themed documents directly inside your browser. No files are uploaded to any server, ensuring complete privacy, zero network delay, and lightning-fast previews!

---

## ✨ Features

- 🌑 **8 Eye-Friendly Themes** — Dark Mode, Amoled Black, Sepia Reader, Midnight Blue, Dracula Purple, Forest Green, Cool Slate, and Original.
- 👁️ **Smart Color Preservation** — An advanced HSL-based conversion mode that inverts bright backgrounds but preserves the hue and contrast of colored text, graphs, diagrams, and illustrations so they remain readable in dark mode.
- ⚡ **Real-Time Interactive Reader** — Read pages immediately with zoom, page-flipping, and theme previews without waiting for full document conversion.
- 🛡️ **100% Private & Secure** — All processing happens locally in your browser using Web APIs. Your files never leave your computer.
- 🔧 **Customizable Quality** — Choose output resolution from Normal (1x scale for small sizes) to Ultra Crisp (3x scale) to fit your reading and printing needs.

---

## 🚀 Getting Started (Client-Side Web App)

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm or yarn

### Run the App Locally
1. Clone the repository and navigate to the `Frontend` directory:
   ```bash
   cd pdf/Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (usually `http://localhost:5173/` or `http://localhost:5174/`) in your browser.

### Build for Production
To bundle the static application for free deployment on GitHub Pages, Vercel, or Netlify:
```bash
npm run build
```
The output files will be created in the `Frontend/dist/` directory.

---

## 🛠️ Original Backend API (Optional Alternative)

If you need a backend REST API endpoint for server-to-server PDF conversion:

### Running the Backend Server
1. Navigate to the `Backend` directory:
   ```bash
   cd pdf/Backend
   ```
2. Install backend dependencies (requires system installation of `poppler` binaries):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### API Endpoint
**POST** `http://localhost:3000/api/user/upload`

Upload a PDF file and request a theme parameter (e.g. `?theme=dark`):
```bash
curl -X POST http://localhost:3000/api/user/upload?theme=dark \
  -F "pdf=@your-document.pdf" \
  -o dark-document.pdf
```

---

## 📁 Project Structure

```
night-pdf/
├── Frontend/           # Brand new client-side React App (Vite)
│   ├── src/
│   │   ├── utils/
│   │   │   ├── themeEngine.js   # Custom HSL canvas pixel processor
│   │   │   └── pdfProcessor.js  # pdfjs-dist & pdf-lib assembler
│   │   ├── App.jsx              # Main UI layout and interaction
│   │   └── index.css            # Custom glassmorphic CSS styling
│   └── package.json
└── Backend/            # Express server for alternative API processing
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
