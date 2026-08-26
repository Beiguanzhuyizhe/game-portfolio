"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/components/LanguageProvider";
import Carousel from "@/components/Carousel";
import type { Project } from "@/content/portfolio";
import { pick } from "@/content/portfolio";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();
  const lenis = useLenis();

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    dialog.current?.focus();
    lenis?.stop();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previous;
      lenis?.start();
    };
  }, [project, onClose, lenis]);

  return (
    <div
      className={`project-modal ${project ? "is-open" : ""}`}
      aria-hidden={!project}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div
          className="project-modal__dialog"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          tabIndex={-1}
          data-lenis-prevent
        >
          <button className="project-modal__close" type="button" onClick={onClose} aria-label={t("projects.close")}>
            <span aria-hidden>×</span>
          </button>
          <Carousel key={project.id} media={project.media} />
          <div className="project-modal__content">
            <div className="project-modal__meta">
              <span>{project.num}</span>
              <span>{pick(project.period, lang)}</span>
              <span>{pick(project.type, lang)}</span>
            </div>
            <div className="project-modal__heading">
              <div>
                <h2 id="project-dialog-title">{pick(project.title, lang)}</h2>
                <p className="project-modal__role">
                  {pick(project.role, lang)}
                  {project.secondaryRole && <small> / {pick(project.secondaryRole, lang)}</small>}
                </p>
              </div>
              <div className="project-modal__links">
                <a href={project.downloadUrl} target="_blank" rel="noreferrer">
                  {t("projects.download")} ↗
                </a>
              </div>
            </div>

            <div className="detail-grid">
              <section>
                <h3>{t("projects.intro")}</h3>
                <p>{pick(project.details.intro, lang)}</p>
              </section>
              <section>
                <h3>{t("projects.work")}</h3>
                <ul>
                  {project.details.work.map((item) => (
                    <li key={item.zh}>{pick(item, lang)}</li>
                  ))}
                </ul>
              </section>
              {project.details.result && (
                <section>
                  <h3>{t("projects.result")}</h3>
                  <p>{pick(project.details.result, lang)}</p>
                </section>
              )}
              <section>
                <h3>{t("projects.tools")}</h3>
                <div className="tool-list">
                  {project.details.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
