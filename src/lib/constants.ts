// Application-wide constants

// Colors
export const COLORS = {
  primary: '#bf635c',
  secondary: '#e79c7f',
  accent: '#fcf7d9',
  background: '#1a1a1a',
} as const;

// Timing constants (in milliseconds)
export const TIMINGS = {
  NEWSLETTER_POPUP_DELAY: 5000, // 5 seconds
  NEWSLETTER_DISMISS_DURATION: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// Social media links
export const SOCIAL_LINKS = {
  YOUTUBE: 'https://www.youtube.com/@Ground_ZeroYT',
  TWITTER: 'https://x.com/groundzero_twt',
  LINKEDIN: 'https://www.linkedin.com/company/groundzero-research',
  SUBSTACK: 'https://groundzero1.substack.com',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  NEWSLETTER_DISMISSED: 'newsletter_dismissed',
} as const;

// YouTube playlist IDs
export const YOUTUBE_PLAYLISTS = {
  PODCASTS: 'PLxp4SLpS92cKJfTjEtQAjdUjqsdZXj9Fv',
  SIGNALS: 'PL-vuWWQkFkr_T4FQ5bM9HJKtE9PN3mWFo',
} as const;

// API endpoints
export const API_ROUTES = {
  YOUTUBE: '/api/youtube',
  BLOG_SUBMISSIONS: '/api/blog-submissions/submit',
} as const;
