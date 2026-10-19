/**
 * YouTube integration helper.
 * Extracts video IDs, validates URLs, builds privacy-enhanced embeds, and handles fallbacks.
 */

// Supported patterns:
// - https://www.youtube.com/watch?v=VIDEO_ID
// - https://m.youtube.com/watch?v=VIDEO_ID
// - https://youtu.be/VIDEO_ID
// - https://www.youtube.com/embed/VIDEO_ID
// - https://youtube.com/v/VIDEO_ID
// - Raw 11-character video ID
const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

const YOUTUBE_URL_PATTERNS = [
  /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?.*?v=([a-zA-Z0-9_-]{11})/,
  /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /(?:https?:\/\/)?(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
];

export interface YouTubeParseResult {
  valid: boolean;
  videoId?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  watchUrl?: string;
  error?: string;
}

/**
 * Parses any YouTube URL or raw video ID and returns sanitized URLs and video ID.
 */
export function parseYouTubeUrl(input: string | undefined | null): YouTubeParseResult {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: 'No YouTube URL or ID provided.' };
  }

  const trimmed = input.trim();

  // If raw 11-char ID was passed
  if (YOUTUBE_ID_REGEX.test(trimmed)) {
    return buildResult(trimmed);
  }

  // Test against URL regex patterns
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match && match[1] && YOUTUBE_ID_REGEX.test(match[1])) {
      return buildResult(match[1]);
    }
  }

  return {
    valid: false,
    error: 'Unrecognised YouTube URL format. Supported formats: youtube.com/watch?v=..., youtu.be/..., or an 11-character Video ID.',
  };
}

function buildResult(videoId: string): YouTubeParseResult {
  return {
    valid: true,
    videoId,
    // Use official privacy-enhanced mode (youtube-nocookie.com)
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}
