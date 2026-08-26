/**
 * 网站文案与项目内容的唯一编辑入口。
 *
 * `summary` / `achievement` 用于项目列表；`details` 用于“查看项目”弹窗。
 * 图片与视频继续放在 public/media，文件路径可直接用于 Vercel 部署。
 */

export type Lang = "zh" | "en";
export type Localized = Record<Lang, string>;
export type ProjectMedia =
  | { type: "video"; src: string; poster: string }
  | { type: "image"; src: string; alt: Localized };

export type Project = {
  id: string;
  num: string;
  title: Localized;
  type: Localized;
  period: Localized;
  role: Localized;
  secondaryRole?: Localized;
  summary: Localized;
  achievement?: Localized;
  details: { intro: Localized; work: Localized[]; result?: Localized; tools: string[] };
  cover: string;
  coverPosition?: string;
  highlights: string[];
  media: ProjectMedia[];
  videoUrl?: string;
  downloadUrl: string;
};

export const pick = <T>(value: Record<Lang, T>, lang: Lang): T => value[lang];

export const SITE_CONTENT = {
  email: "3180257658@qq.com",
  portfolioYear: "2026",
  name: { zh: "陈墨涵", en: "Christina Chen" },
  role: { zh: "Game Designer & Technical Developer", en: "Game Designer & Technical Developer" },
  hint: { zh: "移动指针，试试键盘上的工具", en: "Move the pointer and explore the tools" },
  contactTitle: { zh: "想继续聊聊？", en: "Want to talk?" },
  footerCredit: {
    zh: "基于 Txema Albero 的开源 3D Portfolio 改造",
    en: "Adapted from Txema Albero's open-source 3D Portfolio",
  },
} satisfies Record<string, string | Localized>;

export const PROJECTS: Project[] = [
  {
    id: "cast-syndrome",
    num: "01",
    title: { zh: "卡斯特症候群", en: "Cast Syndrome" },
    type: { zh: "2D 平台跳跃 · 空间解谜", en: "2D Platformer · Spatial Puzzle" },
    period: { zh: "2025.11 — 2026.05", en: "Nov 2025 — May 2026" },
    role: { zh: "主策", en: "Lead Designer" },
    secondaryRole: { zh: "程序", en: "Programmer" },
    summary: {
      zh: "玩家化身传奇怪盗“卡斯持”，利用取景框机制改变空间逻辑，在霓虹都市中完成潜入与解谜，寻找“零号底片”及镜头之外的真相。",
      en: "Play as the phantom thief Cast and reshape spatial logic with a viewfinder mechanic, infiltrating a neon city to uncover the truth beyond the frame.",
    },
    achievement: {
      zh: "网易雷火 × 上海交大学创高校游戏设计大赛一等奖、最具创意奖；2026 光子游戏大赛高校赛道金奖。",
      en: "First Prize and Most Creative Award at the NetEase ThunderFire × SJTU game design competition; Gold Award in the university track of the 2026 Photon Game Competition.",
    },
    details: {
      intro: {
        zh: "玩家化身传奇怪盗“卡斯持”，利用取景框机制改变空间逻辑，在霓虹都市中完成潜入与解谜，寻找“零号底片”及镜头之外的真相。",
        en: "Play as the phantom thief Cast and reshape spatial logic with a viewfinder mechanic, infiltrating a neon city to uncover the truth beyond the frame.",
      },
      work: [
        { zh: "负责全部关卡设计与引擎内配置，并完成需求拆解、任务分配、测试投放和玩家反馈收集。", en: "Designed and configured every level, broke down requirements, assigned tasks, ran playtests, and collected player feedback." },
        { zh: "编写角色状态机、部分关卡组件以及音乐音效控制脚本。", en: "Implemented the character state machine, selected level components, and music and audio control scripts." },
      ],
      result: {
        zh: "网易雷火 × 上海交大学创高校游戏设计大赛一等奖、最具创意奖；2026 光子游戏大赛高校赛道金奖。",
        en: "First Prize and Most Creative Award at the NetEase ThunderFire × SJTU game design competition; Gold Award in the university track of the 2026 Photon Game Competition.",
      },
      tools: ["Unity", "C#", "关卡设计", "团队协作", "测试迭代"],
    },
    cover: "/media/cast-syndrome/images/cover.jpg",
    highlights: ["unity", "csharp", "git", "capcut"],
    media: [
      { type: "video", src: "/media/cast-syndrome/video/demo.mp4", poster: "/media/cast-syndrome/images/cover.jpg" },
      { type: "image", src: "/media/cast-syndrome/images/01.jpg", alt: { zh: "卡斯特症候群实机截图 1", en: "Cast Syndrome gameplay screenshot 1" } },
      { type: "image", src: "/media/cast-syndrome/images/02.jpg", alt: { zh: "卡斯特症候群实机截图 2", en: "Cast Syndrome gameplay screenshot 2" } },
      { type: "image", src: "/media/cast-syndrome/images/03.jpg", alt: { zh: "卡斯特症候群实机截图 3", en: "Cast Syndrome gameplay screenshot 3" } },
      { type: "image", src: "/media/cast-syndrome/images/04.jpg", alt: { zh: "卡斯特症候群实机截图 4", en: "Cast Syndrome gameplay screenshot 4" } },
    ],
    downloadUrl: "https://pan.baidu.com/s/1_GBElEh4lAicLqWZFLULqA?pwd=ptrg",
  },
  {
    id: "veiled-domain",
    num: "02",
    title: { zh: "不可知域", en: "Veiled Domain" },
    type: { zh: "2D 平台跳跃 · 解谜", en: "2D Platformer · Puzzle" },
    period: { zh: "2026.07", en: "Jul 2026" },
    role: { zh: "主策", en: "Lead Designer" },
    summary: {
      zh: "2026 网易 MINI GAME 决赛作品。五人团队围绕主题“藏”，从透视与遮挡角度构建解谜机制，并在 48 小时内完成可玩版本。",
      en: "A 2026 NetEase MINI GAME finalist created by a five-person team in 48 hours, interpreting the theme “Hidden” through perspective and occlusion puzzles.",
    },
    achievement: { zh: "线下试玩获得积极反馈，获现场人气投票第三名。", en: "Received positive offline playtest feedback and placed third in the audience vote." },
    details: {
      intro: {
        zh: "2026 网易 MINI GAME 决赛作品。五人团队围绕主题“藏”，从透视与遮挡角度构建解谜机制，并在 48 小时内完成可玩版本。",
        en: "A 2026 NetEase MINI GAME finalist created by a five-person team in 48 hours, interpreting the theme “Hidden” through perspective and occlusion puzzles.",
      },
      work: [
        { zh: "协调五人团队完成 48 小时限时开发，设计并搭建全部关卡流程。", en: "Coordinated a five-person team through a 48-hour sprint and designed and built the complete level flow." },
        { zh: "借助 Bezi 协作完成机制原型开发。", en: "Collaborated in Bezi to prototype the core mechanic." },
      ],
      result: { zh: "线下试玩获得积极反馈，获现场人气投票第三名。", en: "Received positive offline playtest feedback and placed third in the audience vote." },
      tools: ["Bezi", "关卡设计", "机制设计", "Game Jam", "团队协作"],
    },
    cover: "/media/veiled-domain/images/cover.jpg",
    highlights: ["unity", "git", "adobephotoshop"],
    media: [
      { type: "video", src: "/media/veiled-domain/video/demo.mp4", poster: "/media/veiled-domain/images/cover.jpg" },
      { type: "image", src: "/media/veiled-domain/images/01.jpg", alt: { zh: "不可知域实机截图 1", en: "Veiled Domain gameplay screenshot 1" } },
      { type: "image", src: "/media/veiled-domain/images/02.jpg", alt: { zh: "不可知域实机截图 2", en: "Veiled Domain gameplay screenshot 2" } },
      { type: "image", src: "/media/veiled-domain/images/03.jpg", alt: { zh: "不可知域实机截图 3", en: "Veiled Domain gameplay screenshot 3" } },
      { type: "image", src: "/media/veiled-domain/images/04.jpg", alt: { zh: "不可知域实机截图 4", en: "Veiled Domain gameplay screenshot 4" } },
      { type: "image", src: "/media/veiled-domain/images/05.jpg", alt: { zh: "不可知域实机截图 5", en: "Veiled Domain gameplay screenshot 5" } },
    ],
    downloadUrl: "https://pan.baidu.com/s/1dqjAEjyPubRUlZ_gemjOaQ?pwd=z33p",
  },
  {
    id: "dusk-rush",
    num: "03",
    title: { zh: "暴走黄昏街", en: "Dusk Rush" },
    type: { zh: "回合制 Roguelite 卡牌构筑 · 地牢探索", en: "Turn-based Roguelite Deckbuilder · Dungeon Crawler" },
    period: { zh: "2026.06 — 至今", en: "Jun 2026 — Present" },
    role: { zh: "策划", en: "Game Designer" },
    summary: { zh: "以“竖屏第三人称类爬行者游戏”为目标进行设计的回合制 Roguelite 卡牌构筑与地牢探索项目。", en: "A turn-based roguelite deckbuilder and dungeon exploration project designed around a portrait-oriented third-person crawler format." },
    achievement: { zh: "游戏 Demo 于 2026 ChinaJoy 展会路演试玩并获得广泛好评。", en: "The demo was showcased for hands-on play at ChinaJoy 2026 and received broadly positive feedback." },
    details: {
      intro: { zh: "以“竖屏第三人称类爬行者游戏”为目标进行设计的回合制 Roguelite 卡牌构筑与地牢探索项目。", en: "A turn-based roguelite deckbuilder and dungeon exploration project designed around a portrait-oriented third-person crawler format." },
      work: [{ zh: "设计程序化生成机制和规格、关卡最小单元以及卡牌数值。", en: "Designed the procedural generation rules and specifications, minimum level units, and card balance values." }],
      result: { zh: "游戏 Demo 于 2026 ChinaJoy 展会路演试玩并获得广泛好评。", en: "The demo was showcased for hands-on play at ChinaJoy 2026 and received broadly positive feedback." },
      tools: ["Unity", "数值设计", "程序化生成", "关卡设计", "卡牌设计"],
    },
    cover: "/media/dusk-rush/images/cover.jpg",
    highlights: ["unity", "csharp", "git", "subversion"],
    media: [
      { type: "video", src: "/media/dusk-rush/video/demo.mp4", poster: "/media/dusk-rush/images/cover.jpg" },
      { type: "image", src: "/media/dusk-rush/images/01.jpg", alt: { zh: "暴走黄昏街实机截图 1", en: "Dusk Rush gameplay screenshot 1" } },
      { type: "image", src: "/media/dusk-rush/images/02.jpg", alt: { zh: "暴走黄昏街实机截图 2", en: "Dusk Rush gameplay screenshot 2" } },
      { type: "image", src: "/media/dusk-rush/images/03.jpg", alt: { zh: "暴走黄昏街实机截图 3", en: "Dusk Rush gameplay screenshot 3" } },
      { type: "image", src: "/media/dusk-rush/images/04.jpg", alt: { zh: "暴走黄昏街实机截图 4", en: "Dusk Rush gameplay screenshot 4" } },
      { type: "image", src: "/media/dusk-rush/images/05.jpg", alt: { zh: "暴走黄昏街实机截图 5", en: "Dusk Rush gameplay screenshot 5" } },
    ],
    downloadUrl: "https://pan.baidu.com/s/1p1bihYmt_eQg_YwkJ1aBgA?pwd=34wi",
  },
  {
    id: "goldfish-dream",
    num: "04",
    title: { zh: "金鱼之梦", en: "Goldfish Dream" },
    type: { zh: "3D RPG · 叙事解谜", en: "3D RPG · Narrative Puzzle" },
    period: { zh: "2025.10 — 2025.11", en: "Oct 2025 — Nov 2025" },
    role: { zh: "主策", en: "Lead Designer" },
    secondaryRole: { zh: "程序", en: "Programmer" },
    summary: { zh: "第一届米哈游策划大赛作品。三人团队在 21 天内完成的 3D RPG 叙事解谜游戏，以光影机制串联不同场景与关卡。", en: "A 3D narrative puzzle RPG made by a three-person team in 21 days for the first HoYoverse Game Design Competition, connecting its levels through light-and-shadow mechanics." },
    achievement: { zh: "线上、线下试玩获得玩家积极反馈，验证叙事设计的有效性。", en: "Positive online and offline playtest feedback supported the effectiveness of the narrative design." },
    details: {
      intro: { zh: "第一届米哈游策划大赛作品。三人团队在 21 天内完成的 3D RPG 叙事解谜游戏，以光影机制串联不同场景与关卡。", en: "A 3D narrative puzzle RPG made by a three-person team in 21 days for the first HoYoverse Game Design Competition, connecting its levels through light-and-shadow mechanics." },
      work: [
        { zh: "负责全流程设计与需求拆解，协调三人团队完成 21 天开发。", en: "Owned the full game flow and requirement breakdown while coordinating a three-person team across a 21-day development cycle." },
        { zh: "编写部分关卡组件脚本，并完成可游玩 Demo 与演示视频。", en: "Implemented selected level component scripts and delivered a playable demo and presentation video." },
      ],
      result: { zh: "线上、线下试玩获得玩家积极反馈，验证叙事设计的有效性。", en: "Positive online and offline playtest feedback supported the effectiveness of the narrative design." },
      tools: ["Unity", "C#", "叙事设计", "关卡设计", "团队协作"],
    },
    cover: "/media/goldfish-dream/images/cover.jpg",
    highlights: ["unity", "csharp", "git", "capcut"],
    media: [
      { type: "video", src: "/media/goldfish-dream/video/demo.mp4", poster: "/media/goldfish-dream/images/cover.jpg" },
      { type: "image", src: "/media/goldfish-dream/images/01.jpg", alt: { zh: "金鱼之梦实机截图 1", en: "Goldfish Dream gameplay screenshot 1" } },
      { type: "image", src: "/media/goldfish-dream/images/02.jpg", alt: { zh: "金鱼之梦实机截图 2", en: "Goldfish Dream gameplay screenshot 2" } },
      { type: "image", src: "/media/goldfish-dream/images/03.jpg", alt: { zh: "金鱼之梦实机截图 3", en: "Goldfish Dream gameplay screenshot 3" } },
      { type: "image", src: "/media/goldfish-dream/images/04.jpg", alt: { zh: "金鱼之梦实机截图 4", en: "Goldfish Dream gameplay screenshot 4" } },
    ],
    downloadUrl: "https://pan.baidu.com/s/17SGJ6rXPetnJuHy9sCV5bg?pwd=qx57",
  },
];
