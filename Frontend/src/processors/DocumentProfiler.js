// Smart Document Profiles & OCR Detector
export const DOCUMENT_PROFILES = {
  research: { id: 'research', name: 'Research Papers', threshold: 48, strength: 100, mathProtection: true },
  programming: { id: 'programming', name: 'Programming Books', threshold: 52, strength: 100, syntaxProtection: true },
  engineering: { id: 'engineering', name: 'Engineering Manuals', threshold: 50, strength: 100, diagramProtection: true },
  study: { id: 'study', name: 'Study Notes', threshold: 45, strength: 95, highlightProtection: true },
  slides: { id: 'slides', name: 'Presentation Slides', threshold: 40, strength: 90, imageProtection: true },
  scanned: { id: 'scanned', name: 'Scanned Documents', threshold: 55, strength: 100, ocrProtection: true },
  mixed: { id: 'mixed', name: 'Mixed Documents', threshold: 50, strength: 100, autoFallback: true }
};

export class DocumentProfiler {
  static analyzeDocumentMetadata(numPages, outline, fileName = '') {
    const nameLower = fileName.toLowerCase();
    if (nameLower.includes('slide') || nameLower.includes('ppt') || nameLower.includes('lecture')) {
      return DOCUMENT_PROFILES.slides;
    }
    if (nameLower.includes('code') || nameLower.includes('dev') || nameLower.includes('js') || nameLower.includes('py') || nameLower.includes('prog')) {
      return DOCUMENT_PROFILES.programming;
    }
    if (nameLower.includes('paper') || nameLower.includes('arxiv') || nameLower.includes('ieee') || nameLower.includes('acm') || nameLower.includes('journal')) {
      return DOCUMENT_PROFILES.research;
    }
    if (nameLower.includes('manual') || nameLower.includes('spec') || nameLower.includes('circuit')) {
      return DOCUMENT_PROFILES.engineering;
    }
    if (outline && outline.length > 5) {
      // Books or formal docs
      return DOCUMENT_PROFILES.programming;
    }
    return DOCUMENT_PROFILES.mixed;
  }

  static detectPdfContentType(textContent, numPages) {
    if (!textContent || !textContent.items || textContent.items.length === 0) {
      return 'image-only'; // Scanned without OCR
    }
    const charCount = textContent.items.reduce((acc, item) => acc + (item.str ? item.str.length : 0), 0);
    if (charCount < 50) {
      return 'ocr-scanned'; // Sparse OCR text
    }
    return 'native-digital';
  }
}
