import { EmojiRecord, EmojiButtonOptions, RecentEmoji } from './types';

const LOCAL_STORAGE_KEY = 'emojiPicker.recent';

export function load(options?: EmojiButtonOptions): Array<RecentEmoji> {
  if (options?.fetchRecent) {
    return options.fetchRecent();
  }
  const recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  const recents = recentJson ? JSON.parse(recentJson) : [];
  return recents.filter(recent => !!recent.emoji);
}

export function save(
  emoji: EmojiRecord | RecentEmoji,
  options: EmojiButtonOptions
): void {
  const recents = load(options);

  const recent = {
    emoji: emoji.emoji,
    name: emoji.name,
    key: (emoji as RecentEmoji).key || emoji.name,
    custom: emoji.custom,
    timestamp: Date.now()
  };

  if (options.saveRecent) {
    options.saveRecent(recent, options);
    return;
  }

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      [
        recent,
        ...recents.filter((r: RecentEmoji) => !!r.emoji && r.key !== recent.key)
      ].slice(0, options.recentsCount)
    )
  );
}
