import { put, del } from "@vercel/blob";
import crypto from "crypto";
import path from "path";

/**
 * Uploads a file to Vercel Blob and returns the public URL.
 *
 * The returned URL is what gets stored in `Resume.filePath` in the database.
 * This replaces the previous local-filesystem approach (saves to uploads/ folder),
 * making uploads durable across deployments and serverless restarts.
 *
 * Requires the BLOB_READ_WRITE_TOKEN environment variable (set on Vercel dashboard).
 */
export async function saveFile(buffer: Buffer, originalFilename: string): Promise<string> {
    const ext = path.extname(originalFilename);
    const hash = crypto.randomBytes(16).toString("hex");
    const blobFilename = `resumes/${hash}${ext}`;

    const blob = await put(blobFilename, buffer, {
        access: "public",         // URL is publicly readable so resumes can be shared
        contentType: getMimeType(ext),
        addRandomSuffix: false,   // We already add our own hash for uniqueness
    });

    // blob.url is the permanent Vercel Blob CDN URL — safe to store in DB
    return blob.url;
}

/**
 * Fetches a file from Vercel Blob by URL and returns its content as a Buffer.
 *
 * Used when you need to re-process or re-download the resume file.
 */
export async function getFile(fileUrl: string): Promise<Buffer> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch file from Blob storage: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

/**
 * Deletes a file from Vercel Blob by URL.
 *
 * Call this when a Resume record is deleted to avoid orphaned blobs.
 */
export async function deleteFile(fileUrl: string): Promise<void> {
    await del(fileUrl);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getMimeType(ext: string): string {
    switch (ext.toLowerCase()) {
        case ".pdf":
            return "application/pdf";
        case ".docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case ".doc":
            return "application/msword";
        default:
            return "application/octet-stream";
    }
}
