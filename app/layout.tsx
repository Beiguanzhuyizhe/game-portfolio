import type { Metadata, Viewport } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import FrozenBackground from "@/components/FrozenBackground";
import ScrollProgress from "@/components/ScrollProgress";
import LanguageProvider, { LANG_BOOT_SCRIPT } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "陈墨涵 — 游戏策划与技术开发",
  description: "陈墨涵的游戏项目作品集：关卡设计、机制设计与技术开发。",
  authors: [{ name: "陈墨涵" }],
  openGraph: {
    title: "陈墨涵 — 游戏策划与技术开发",
    description: "精选游戏项目与可玩版本。",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#dff3ff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <FrozenBackground />
          <ScrollProgress />
          {children}
          <CustomCursor />
        </LanguageProvider>
      </body>
    </html>
  );
}
