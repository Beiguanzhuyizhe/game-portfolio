import {
  siCplusplus,
  siGit,
  siPython,
  siSubversion,
  siUnity,
  siUnrealengine,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
  label: string;
  detail: string;
  symbol?: string;
};

const skill = (
  icon: { title: string; slug: string; path: string; hex: string },
  label: string,
  detail: string,
): SkillIcon => ({ ...icon, label, detail });

const custom = (
  slug: string,
  title: string,
  hex: string,
  symbol: string,
  label: string,
  detail: string,
): SkillIcon => ({ slug, title, hex, path: "", symbol, label, detail });

export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [
    skill({ ...siUnity, hex: "111827" }, "Unity", "Unity / C#"),
    skill(siUnrealengine, "Unreal Engine", "UE4.27 / UE5 蓝图"),
    custom("csharp", "C#", "512BD4", "C#", "C#", "Gameplay scripting"),
  ],
  [
    skill(siCplusplus, "C++", "Programming"),
    skill(siPython, "Python", "Tools & prototyping"),
    skill(siGit, "Git", "Version control"),
  ],
  [
    skill(siSubversion, "SVN", "Team collaboration"),
    custom("adobephotoshop", "Adobe Photoshop", "31A8FF", "Ps", "Photoshop", "Visual production"),
    custom("capcut", "CapCut", "111111", "✂", "剪映 / CapCut", "Video editing"),
  ],
] as const;

export const SKILLS_FLAT = SKILLS_GRID.flat();
