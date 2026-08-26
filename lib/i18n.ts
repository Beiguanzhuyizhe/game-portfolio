export type Lang = "zh" | "en";

export const LANGUAGES: Lang[] = ["zh", "en"];
export const DEFAULT_LANG: Lang = "zh";

const DICT = {
  "picker.language": { zh: "语言", en: "Language" },
  "nav.home": { zh: "首页", en: "Home" },
  "nav.projects": { zh: "作品", en: "Projects" },
  "nav.contact": { zh: "联系", en: "Contact" },
  "hero.role": { zh: "游戏策划与技术开发", en: "Game Designer & Technical Developer" },
  "hero.hint": { zh: "移动指针，试试键盘上的工具", en: "Move the pointer and explore the tools" },
  "projects.open": { zh: "查看项目", en: "View project" },
  "projects.close": { zh: "关闭项目详情", en: "Close project details" },
  "projects.intro": { zh: "游戏介绍", en: "Game overview" },
  "projects.work": { zh: "具体工作", en: "My work" },
  "projects.result": { zh: "成果", en: "Results" },
  "projects.tools": { zh: "工具与能力", en: "Tools & skills" },
  "projects.download": { zh: "下载可运行文件", en: "Download playable build" },
  "projects.play": { zh: "播放演示视频", en: "Play demo video" },
  "carousel.prev": { zh: "上一张", en: "Previous slide" },
  "carousel.next": { zh: "下一张", en: "Next slide" },
  "contact.title": { zh: "想继续聊聊？", en: "Want to talk?" },
  "contact.copy": { zh: "复制邮箱", en: "Copy email" },
  "contact.copied": { zh: "邮箱已复制", en: "Email copied" },
  "footer.credit": {
    zh: "基于 Txema Albero 的开源 3D Portfolio 改造",
    en: "Adapted from Txema Albero's open-source 3D Portfolio",
  },
} as const;

export type TranslationKey = keyof typeof DICT;

export function translate(path: string, lang: Lang): string {
  const entry = DICT[path as TranslationKey];
  return entry?.[lang] ?? path;
}
