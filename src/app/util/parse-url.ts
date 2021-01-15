import {YouTubeURLParser} from '@iktakahiro/youtube-url-parser';

export function parseURL(url: string): string | null {
  return new YouTubeURLParser(url).getId();
}
