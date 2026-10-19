import { describe, it, expect } from 'vitest';
import { parseYouTubeUrl } from '../src/lib/youtube';

describe('YouTube Integration & Parser', () => {
  it('parses standard desktop watch URLs', () => {
    const input = 'https://www.youtube.com/watch?v=w-qgqgqC1qE';
    const result = parseYouTubeUrl(input);
    expect(result.valid).toBe(true);
    expect(result.videoId).toBe('w-qgqgqC1qE');
    expect(result.embedUrl).toContain('https://www.youtube-nocookie.com/embed/w-qgqgqC1qE');
    expect(result.thumbnailUrl).toBe('https://img.youtube.com/vi/w-qgqgqC1qE/hqdefault.jpg');
  });

  it('parses youtu.be short URLs', () => {
    const input = 'https://youtu.be/8N_W5j8tD8o';
    const result = parseYouTubeUrl(input);
    expect(result.valid).toBe(true);
    expect(result.videoId).toBe('8N_W5j8tD8o');
  });

  it('parses embed URLs', () => {
    const input = 'https://www.youtube.com/embed/f5U_w2wXp3Y';
    const result = parseYouTubeUrl(input);
    expect(result.valid).toBe(true);
    expect(result.videoId).toBe('f5U_w2wXp3Y');
  });

  it('parses raw 11-character video IDs directly', () => {
    const input = 'k1Y6N_wL3Xg';
    const result = parseYouTubeUrl(input);
    expect(result.valid).toBe(true);
    expect(result.videoId).toBe('k1Y6N_wL3Xg');
  });

  it('gracefully rejects invalid or malformed links', () => {
    expect(parseYouTubeUrl('').valid).toBe(false);
    expect(parseYouTubeUrl(null).valid).toBe(false);
    expect(parseYouTubeUrl('https://example.com/not-youtube').valid).toBe(false);
    expect(parseYouTubeUrl('short-id').valid).toBe(false);
  });
});
