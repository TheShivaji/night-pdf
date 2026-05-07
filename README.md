# 🌙 Night PDF

> **Convert bright, eye-straining PDFs into dark-themed, night-friendly documents.**

[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)]()

---

## 📖 What is Night PDF?

**Night PDF** is a backend PDF processing tool that takes regular (bright/white-background) PDF files and converts them into **dark-themed documents** — making them easier to read at night or in low-light conditions without straining your eyes.

Whether you're reading research papers late at night or going through documents after hours, Night PDF has you covered. 🌚

---

## ✨ Features
- 🌑 **7 Dark Themes** — Dark, Amoled, Sepia, Midnight, Dracula, Forest, Cool
- 👁️ **Eye Friendly** — Reduces eye strain during night reading
- ⚡ **Backend Processing** — Fast server-side PDF transformation
- 📄 **Multi-page Support** — Converts all pages of the PDF
- 🔧 **Simple API** — Easy to integrate into existing workflows

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TheShivaji/night-pdf.git

# Navigate to the backend directory
cd night-pdf/Backend

# Install dependencies
npm install
```

### Running the Server

```bash
# Start the backend server
npm start

# Or for development with hot-reload
npm run dev
```

---

## 🛠️ Usage

### API Endpoint

**POST** `/convert`

Send a PDF file to the server and receive a dark-themed version in response.

```bash
curl -X POST http://localhost:3000/convert \
  -F "file=@your-document.pdf" \
  -o dark-document.pdf
```

### Example (JavaScript)

```javascript
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('file', fs.createReadStream('./my-document.pdf'));

const response = await axios.post('http://localhost:3000/convert', form, {
  headers: form.getHeaders(),
  responseType: 'arraybuffer'
});

fs.writeFileSync('./dark-my-document.pdf', response.data);
console.log('Dark PDF saved!');
```

---

## 📁 Project Structure

```
night-pdf/
└── Backend/
    ├── index.js          # Entry point / Express server
    ├── routes/           # API route handlers
    ├── controllers/      # PDF processing logic
    ├── utils/            # Helper functions
    └── package.json      # Dependencies
```

---

## 🧠 How It Works

1. **Upload** — User sends a PDF file via the API
2. **Parse** — Backend reads and parses the PDF structure
3. **Transform** — Background colors are inverted/darkened; text colors are adjusted for contrast
4. **Export** — A new dark-themed PDF is generated and returned

---

## 🛣️ Roadmap

- [x] Basic project setup
- [x] PDF upload and parsing
- [x] Dark theme color transformation
- [x] REST API endpoint
- [x] Multi-page PDF support
- [x] 7 custom dark themes
- [ ] Frontend UI (web interface)
- [ ] Docker support
- [ ] OCR support
- [ ] PDF Compress/Merge

---

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**TheShivaji**

- GitHub: [@TheShivaji](https://github.com/TheShivaji)

---

<p align="center">Made with ❤️ and a lot of late nights 🌙</p>
