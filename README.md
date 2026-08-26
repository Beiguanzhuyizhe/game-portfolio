# 陈墨涵 · 游戏作品集

面向游戏策划与技术开发岗位的中英双语个人作品集。网站包含可交互的 3D 技能键盘、项目详情弹窗、图片轮播、网页内嵌视频、平滑滚动和响应式布局。

## 项目内容

1. 《卡斯特症候群》
2. 《不可知域》
3. 《暴走黄昏街》
4. 《金鱼之梦》

## 日常维护入口

- 首页、项目简介和详情文案：`content/portfolio.ts`
- 文案编辑说明：`content/README.md`
- 封面、轮播图片和网页视频：`public/media/`
- 媒体替换与压缩说明：`MEDIA_GUIDE.md`

不要把原始高码率视频放进 `public/`。`public/media/**/video/demo.mp4` 只保存可直接用于网页和 Vercel 的 H.264/AAC 优化版本。

## 本地运行

```bash
npm ci
npm run dev
```

部署前检查：

```bash
npm run build
```

## Vercel 工作流

首次连接本地目录与已经存在的 Vercel 项目：

```bash
npx vercel login
npx vercel link
```

日常更新先创建预览，确认无误后再发布正式版本：

```bash
npx vercel
npx vercel --prod
```

如果连接 GitHub，建议在功能分支上检查 Preview Deployment，确认后再合并到 `main`。

## 主要技术

- Next.js 16 / React 19 / TypeScript
- React Three Fiber / Three.js
- Tailwind CSS 4 与自定义 CSS 3D
- Lenis 平滑滚动
- Simple Icons 技能图标

## 开源来源与许可

本项目基于 [Txema Albero 的 3D Portfolio](https://github.com/Txemalon/3d-portfolio) 改造，并保留原项目的 [MIT License](LICENSE) 与版权声明。
