import { EmojiRecord, EmojiButtonOptions, RecentEmoji } from './types';
export declare function load(options?: EmojiButtonOptions): Array<RecentEmoji>;
export declare function save(emoji: EmojiRecord | RecentEmoji, options: EmojiButtonOptions): void;
