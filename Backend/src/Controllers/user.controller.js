import fs from "fs";
import path from "path";
import sharp from "sharp";
import pdf from "pdf-poppler";

export const uploadPDF = async (req, res) => {
    const theme = req.query.theme || "normal"; // Default to normal
    console.log("Processing theme:", theme);

    try {
        const uploadsDir = "uploads";
        const pdfPath = path.join(uploadsDir, `input_${Date.now()}.pdf`); // Unique name

        // 0. Ensure directory exists and save PDF
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
        fs.writeFileSync(pdfPath, req.file.buffer);

        const opts = {
            density: 300,
            format: "png",
            out_dir: uploadsDir,
            out_prefix: path.basename(pdfPath, '.pdf'),
            page: 1
        };

        // 1. Convert PDF to PNG
        await pdf.convert(pdfPath, opts);
        const imagePath = path.join(uploadsDir, `${opts.out_prefix}-01.png`);

        

        // Check if image exists
        if (!fs.existsSync(imagePath)) {
            throw new Error("PDF to Image conversion failed.");
        }

        // 2. Common logic to create transparent text layer
        const metadata = await sharp(imagePath).metadata();
        
        // This pipeline makes text white and background transparent
        const textLayerPipeline = sharp(imagePath)
            .negate({ alpha: false }) // Invert: background black, text white
            .threshold(128) // Make it pure black and white
            .ensureAlpha() // Add alpha channel
            .unflatten(); // Use black as transparency (works because foreground is white)

        const textLayerBuffer = await textLayerPipeline.toBuffer();

        let backgroundColor;
        let finalImagePipeline;

        // --- THEME DEFINITIONS ---

        switch (theme) {
            case "dark":
                backgroundColor = "#1a1a1a"; // Dark Gray Background
                // Text remains white
                finalImagePipeline = sharp({
                    create: {
                        width: metadata.width,
                        height: metadata.height,
                        channels: 3,
                        background: backgroundColor
                    }
                }).composite([{ input: textLayerBuffer, blend: 'screen' }]); 
                // 'screen' blend mode works best for white text on dark bg
                break;

            case "amoled":
                backgroundColor = "#000000"; // Pure Black Background
                finalImagePipeline = sharp({
                    create: { width: metadata.width, height: metadata.height, channels: 3, background: backgroundColor }
                }).composite([{ input: textLayerBuffer, blend: 'screen' }]);
                break;

            case "sepia":
                // For sepia, we tint the text AND use a colored background
                backgroundColor = "#f4ecd8"; // Light cream background
                const sepiaText = await sharp(textLayerBuffer).tint("#704214").toBuffer();
                finalImagePipeline = sharp({
                    create: { width: metadata.width, height: metadata.height, channels: 3, background: backgroundColor }
                }).composite([{ input: sepiaText, blend: 'multiply' }]); 
                // 'multiply' is better for dark text on light background
                break;

            case "midnight":
                backgroundColor = "#101827"; // Deep Blue-Black Background
                const midnightText = await sharp(textLayerBuffer).tint("#e2e8f0").toBuffer(); // Light gray text
                finalImagePipeline = sharp({
                    create: { width: metadata.width, height: metadata.height, channels: 3, background: backgroundColor }
                }).composite([{ input: midnightText, blend: 'screen' }]);
                break;

            case "dracula":
                backgroundColor = "#282a36"; // Dracula background
                const draculaText = await sharp(textLayerBuffer).tint("#bd93f9").toBuffer(); // Purple text
                finalImagePipeline = sharp({
                    create: { width: metadata.width, height: metadata.height, channels: 3, background: backgroundColor }
                }).composite([{ input: draculaText, blend: 'screen' }]);
                break;

            case "forest":
                backgroundColor = "#166534"; // Dark Green Background
                const forestText = await sharp(textLayerBuffer).tint("#a7f3d0").toBuffer(); // Pale green text
                finalImagePipeline = sharp({
                    create: { width: metadata.width, height: metadata.height, channels: 3, background: backgroundColor }
                }).composite([{ input: forestText, blend: 'screen' }]);
                break;

            case "cool":
                backgroundColor = "#343541"; // ChatGPT dark background
                const coolText = await sharp(textLayerBuffer).tint("#10a37f").toBuffer(); // ChatGPT green text
                finalImagePipeline = sharp({
                    create: { width: metadata.width, height: metadata.height, channels: 3, background: backgroundColor }
                }).composite([{ input: coolText, blend: 'screen' }]);
                break;

            case "normal":
            default:
                finalImagePipeline = sharp(imagePath); // No transformation
                break;
        }

        // 3. Generate final image buffer
        const processedImageBuffer = await finalImagePipeline.png().toBuffer();

        // 4. Cleanup temporary files asynchronously
        fs.unlink(pdfPath, (err) => err && console.error("Error deleting PDF:", err));
        fs.unlink(imagePath, (err) => err && console.error("Error deleting image:", err));

        // 5. Send response
        res.set("Content-Type", "image/png");
        fs.writeFileSync("output.png", processedImageBuffer);
        return res.send(processedImageBuffer);

    } catch (error) {
        console.error("Error in uploadPDF controller:", error);
        res.status(500).json({
            message: "Error processing PDF",
            error: error.message
        });
    }
};