import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

/**
 * Saves a file locally and returns the relative file path.
 * In the future, this can be swapped to Supabase Storage, Cloudflare R2, or AWS S3.
 */
export async function saveFile(buffer: Buffer, originalFilename: string): Promise<string> {
    // Ensure the uploads directory exists
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Generate a unique filename to prevent collisions
    const ext = path.extname(originalFilename);
    const hash = crypto.randomBytes(16).toString("hex");
    const filename = `${hash}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Save the file
    await fs.writeFile(filePath, buffer);

    // Return a relative path that we can store in the database
    // For local storage, we just store the filename/relative path
    return `uploads/${filename}`;
}

/**
 * Reads a file from storage.
 * Will be updated alongside saveFile when moving to cloud storage.
 */
export async function getFile(filePath: string): Promise<Buffer> {
    const fullPath = path.join(process.cwd(), filePath);
    return await fs.readFile(fullPath);
}
