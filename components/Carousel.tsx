"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { ProjectMedia } from "@/content/portfolio";
import { pick } from "@/content/portfolio";

export default function Carousel({ media }: { media: ProjectMedia[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (paused || !pageVisible || media.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % media.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [media.length, pageVisible, paused]);

  const go = (delta: number) => {
    setIndex((current) => (current + delta + media.length) % media.length);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
    >
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {media.map((item, itemIndex) => (
          <div className="carousel__slide" key={item.type + item.src}>
            {item.type === "video" ? (
              <video
                className="project-video"
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
                aria-label={t("projects.play")}
                onPlay={() => setPaused(true)}
                onPause={() => setPaused(false)}
                onEnded={() => setPaused(false)}
              >
                <source src={item.src} type="video/mp4" />
                {t("projects.play")}
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={pick(item.alt, lang)} loading={itemIndex ? "lazy" : "eager"} />
            )}
          </div>
        ))}
      </div>

      {media.length > 1 && (
        <>
          <button className="carousel__arrow carousel__arrow--prev" type="button" onClick={() => go(-1)} aria-label={t("carousel.prev")}>
            ←
          </button>
          <button className="carousel__arrow carousel__arrow--next" type="button" onClick={() => go(1)} aria-label={t("carousel.next")}>
            →
          </button>
          <div className="carousel__dots">
            {media.map((item, dotIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`${dotIndex + 1} / ${media.length}`}
                aria-current={dotIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
