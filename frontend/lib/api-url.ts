const trimmed = process.env.NEXT_PUBLIC_API_URL?.trim();

/** Base URL của API (khớp mặc định trong next.config images.remotePatterns). */
export const apiUrl =
  trimmed && trimmed.length > 0
    ? trimmed.replace(/\/$/, "")
    : "http://localhost:5000";
