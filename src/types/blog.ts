/**
 * Blog types for Community Blogs feature
 */

export interface Blog {
    id: number;
    title: string;
    link: string;
    category: string;
    authorTwitter: string;
    authorHandle: string;
    createdAt?: string; // ISO date string for future use
    featured?: boolean; // For future featured blogs
    tags?: string[]; // For future tag system
}

export type BlogCategory = string;

export interface BlogFilters {
    category?: string;
    tags?: string[];
    searchQuery?: string;
}
