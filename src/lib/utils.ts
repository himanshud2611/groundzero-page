/**
 * Extract @handle from a Twitter/X or LinkedIn profile URL
 * @param profileLink - Full profile URL (e.g., "https://x.com/username")
 * @returns The handle with @ prefix (e.g., "@username") or "@unknown" if parsing fails
 */
export const extractHandle = (profileLink: string): string => {
    try {
        const url = new URL(profileLink);
        const pathname = url.pathname;
        const handle = pathname.split('/').filter(Boolean)[0];
        return handle ? `@${handle}` : '@unknown';
    } catch {
        return '@unknown';
    }
};
