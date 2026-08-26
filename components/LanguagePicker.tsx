"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguagePicker() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="language-picker" role="group" aria-label={t("picker.language")}>
      <button type="button" onClick={() => setLang("zh")} aria-pressed={lang === "zh"}>
        中
      </button>
      <span aria-hidden>/</span>
      <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>
        EN
      </button>
    </div>
  );
}
