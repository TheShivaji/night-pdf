import fs from "fs";
import path from "path";
import sharp from "sharp";
import pdf from "pdf-poppler";
import { PDFDocument } from "pdf-lib";
import { promises } from "dns";

export const uploadPDF = async (req, res) => {
    const theme = req.query.theme || "normal";
    console.log("Processing theme:", theme);

    try {
        const uploadsDir = path.resolve("uploads").replace(/\\/g, '/')
        const pdfPath = `${uploadsDir}/input_${Date.now()}.pdf`;

        // 0. Directory banao + PDF save karo
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
        fs.writeFileSync(pdfPath, req.file.buffer);

        // 1. Total pages nikalo
        const info = await pdf.info(pdfPath)
        const totalPages = info.pages
        console.log("Total pages:", totalPages)

        // 2. Har page convert karo + theme apply karo
        const darkImageBuffers = []

        await Promise.all(Array.from({ length: totalPages }, async (_, i) => {
            // PDF to PNG
            const opts = {
                density: 400,
                format: "png",
                out_dir: uploadsDir,
                out_prefix: path.basename(pdfPath, '.pdf'),
                page: i + 1
            };
            await pdf.convert(pdfPath, opts);

            const pageNum = String(i + 1).padStart(2, "0")
            const imagePath = path.join(uploadsDir, `${opts.out_prefix}-${pageNum}.png`)

            if (!fs.existsSync(imagePath)) {
                throw new Error(`Page ${i + 1} conversion failed`)
            }

            console.log(`Theme apply kar raha hoon page ${i + 1}/${totalPages}`)

            // Metadata lo
            const metadata = await sharp(imagePath).metadata()

            // Text layer banao
            const textLayer = await sharp(imagePath)
                .resize(metadata.width, metadata.height, {
                    kernel: sharp.kernel.lanczos3
                })
                .negate({ alpha: false })
                .threshold(180)
                .blur(0.3)
                .sharpen(70, 1)
                .ensureAlpha()
                .unflatten()
                .toBuffer()

            // Theme apply karo
            let finalBuffer;

            switch (theme) {
                case "dark":
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#1a1a1a" }
                    }).composite([{ input: textLayer, blend: 'screen' }]).png().toBuffer()
                    break;

                case "amoled":
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#000000" }
                    }).composite([{ input: textLayer, blend: 'screen' }]).png().toBuffer()
                    break;

                case "sepia":
                    const sepiaText = await sharp(textLayer).tint("#704214").toBuffer()
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#f4ecd8" }
                    }).composite([{ input: sepiaText, blend: 'multiply' }]).png().toBuffer()
                    break;

                case "midnight":
                    const midnightText = await sharp(textLayer).tint("#e2e8f0").toBuffer()
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#101827" }
                    }).composite([{ input: midnightText, blend: 'screen' }]).png().toBuffer()
                    break;

                case "dracula":
                    const draculaText = await sharp(textLayer).tint("#bd93f9").toBuffer()
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#282a36" }
                    }).composite([{ input: draculaText, blend: 'screen' }]).png().toBuffer()
                    break;

                case "forest":
                    const forestText = await sharp(textLayer).tint("#a7f3d0").toBuffer()
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#166534" }
                    }).composite([{ input: forestText, blend: 'screen' }]).png().toBuffer()
                    break;

                case "cool":
                    const coolText = await sharp(textLayer).tint("#10a37f").toBuffer()
                    finalBuffer = await sharp({
                        create: { width: metadata.width, height: metadata.height, channels: 3, background: "#343541" }
                    }).composite([{ input: coolText, blend: 'screen' }]).png().toBuffer()
                    break;

                case "normal":
                default:
                    finalBuffer = await sharp(imagePath).png().toBuffer()
                    break;
            }

            darkImageBuffers.push({
                buffer: finalBuffer,
                width: metadata.width,
                height: metadata.height
            })

            // Temp image delete karo
            fs.unlinkSync(imagePath)
        }
        ))

        console.log("Sab pages dark ho gaye!", darkImageBuffers.length)

    // 3. Sab images ko ek PDF mein daalo
    const newPdf = await PDFDocument.create()

        for (const { buffer, width, height } of darkImageBuffers) {
            const img = await newPdf.embedPng(buffer)
            const page = newPdf.addPage([width, height])
            page.drawImage(img, { x: 0, y: 0, width, height })
        }

        const pdfBytes = await newPdf.save()

        // 4. Original PDF delete karo
        fs.unlink(pdfPath, (err) => err && console.error(err))

        // 5. PDF response bhejo
        res.set("Content-Type", "application/pdf")
        res.set("Content-Disposition", "attachment; filename=dark-output.pdf")
        return res.send(Buffer.from(pdfBytes))

    } catch (error) {
        console.error("Error in uploadPDF controller:", error);
        res.status(500).json({
            message: "Error processing PDF",
            error: error.message
        });
    }
};