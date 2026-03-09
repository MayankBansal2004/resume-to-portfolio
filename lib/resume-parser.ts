import PDFParser from "pdf2json";
import mammoth from "mammoth";

/**
 * Extracts raw text from a PDF buffer.
 */
async function parsePDF(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        // @ts-expect-error - pdf2json lacks accurate type definitions
        const pdfParser = new PDFParser(null, 1);

        pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", () => {
            const text = pdfParser.getRawTextContent();
            resolve(text);
        });

        pdfParser.parseBuffer(buffer);
    });
}

/**
 * Extracts raw text from a DOCX buffer.
 */
async function parseDOCX(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
}

/**
 * Detects file type and extracts text from a document buffer.
 */
export async function extractTextFromBuffer(buffer: Buffer, filename: string): Promise<string> {
    const ext = filename.split(".").pop()?.toLowerCase();

    if (ext === "pdf") {
        return await parsePDF(buffer);
    } else if (ext === "docx" || ext === "doc") {
        // Note: mammoth works best with docx. Old .doc files might fail depending on the format.
        return await parseDOCX(buffer);
    } else {
        throw new Error("Unsupported file format. Please upload a PDF or DOCX file.");
    }
}
