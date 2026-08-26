"use client";

import { useCallback, useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import SmoothScroll from "@/components/smooth-scroll";
import { useLanguage } from "@/components/LanguageProvider";
import { PROJECTS, SITE_CONTENT, type Project, pick } from "@/content/portfolio";

export default function Home() {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const closeModal = useCallback(() => setSelected(null), []);
  const copyEmail = async () => {
    await navigator.clipboard.writeText(SITE_CONTENT.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <SmoothScroll>
      <SectionNav />
      <header className="site-header">
        <a className="site-mark" href="#hero" aria-label="陈墨涵">
          CMH<span>.</span>
        </a>
        <div className="site-header__right">
          <a href={`mailto:${SITE_CONTENT.email}`}>{SITE_CONTENT.email}</a>
          <LanguagePicker />
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero__copy">
            <p className="eyebrow">PORTFOLIO / {SITE_CONTENT.portfolioYear}</p>
            <h1>{pick(SITE_CONTENT.name, lang)}</h1>
            <p className="hero__role">{pick(SITE_CONTENT.role, lang)}</p>
            <a className="hero__email" href={`mailto:${SITE_CONTENT.email}`}>
              {SITE_CONTENT.email} <span>↗</span>
            </a>
            <p className="hero__hint">
              <span />
              {pick(SITE_CONTENT.hint, lang)}
            </p>
          </div>
          <div className="hero__keyboard">
            <FrozenKeyboard />
          </div>
          <div className="hero__index" aria-hidden>01</div>
        </section>

        <section className="projects-section" id="projects">
          <div className="project-list">
            {PROJECTS.map((project) => (
              <Reveal
                className="project-row"
                key={project.id}
                delay={80}
              >
                <div className="project-copy">
                  <div className="project-copy__topline">
                    <span>{project.num}</span>
                    <span>{pick(project.period, lang)}</span>
                  </div>
                  <button type="button" className="project-title" onClick={() => setSelected(project)}>
                    {pick(project.title, lang)}
                  </button>
                  <p className="project-role">
                    {pick(project.role, lang)}
                    {project.secondaryRole && <small> / {pick(project.secondaryRole, lang)}</small>}
                  </p>
                  <p className="project-type">{pick(project.type, lang)}</p>
                  <p className="project-summary">{pick(project.summary, lang)}</p>
                  {project.achievement && (
                    <p className="project-achievement">
                      <span
                        style={{
                          fontSize: "1em",
                          fontWeight: 850,
                          lineHeight: "inherit",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {t("projects.result")}
                      </span>
                      {pick(project.achievement, lang)}
                    </p>
                  )}
                  <button className="text-link" type="button" onClick={() => setSelected(project)}>
                    {t("projects.open")} <span>↗</span>
                  </button>
                </div>

                <button
                  className="project-cover"
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-label={`${t("projects.open")}：${pick(project.title, lang)}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.cover}
                    alt=""
                    style={{ objectPosition: project.coverPosition ?? "center" }}
                  />
                  <span className="project-cover__veil" />
                  <span className="project-cover__open">{t("projects.open")} ↗</span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <Reveal>
            <p className="eyebrow">CONTACT</p>
            <h2>{pick(SITE_CONTENT.contactTitle, lang)}</h2>
            <a href={`mailto:${SITE_CONTENT.email}`} className="contact__email">{SITE_CONTENT.email}</a>
            <button type="button" className="copy-email" onClick={copyEmail}>
              {copied ? t("contact.copied") : t("contact.copy")}
            </button>
          </Reveal>
        </section>
      </main>

      <footer>
        <span>© 2026 陈墨涵</span>
        <a href="https://github.com/Txemalon/3d-portfolio" target="_blank" rel="noreferrer">
          {pick(SITE_CONTENT.footerCredit, lang)} ↗
        </a>
      </footer>

      <ProjectModal project={selected} onClose={closeModal} />
    </SmoothScroll>
  );
}
