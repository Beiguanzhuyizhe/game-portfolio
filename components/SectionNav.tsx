"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/components/LanguageProvider";

const IDS = ["hero", "projects", "contact"] as const;

export default function SectionNav() {
  const [active, setActive] = useState<(typeof IDS)[number]>("hero");
  const { t } = useLanguage();
  const lenis = useLenis();
  const labels = {
    hero: t("nav.home"),
    projects: t("nav.projects"),
    contact: t("nav.contact"),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id as (typeof IDS)[number] | undefined;
        if (id) setActive(id);
      },
      { threshold: [0.2, 0.45, 0.7] },
    );
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-nav" aria-label="Sections">
      {IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => {
            const target = document.getElementById(id);
            if (!target) return;
            if (lenis) lenis.scrollTo(target, { offset: id === "hero" ? 0 : -40 });
            else target.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label={labels[id]}
          aria-current={active === id ? "true" : undefined}
        >
          <span>{labels[id]}</span>
          <i />
        </button>
      ))}
    </nav>
  );
}
