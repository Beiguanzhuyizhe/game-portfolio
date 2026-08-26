"use client";

import { useRef, useState } from "react";
import { SKILLS_FLAT, type SkillIcon } from "@/lib/skills";

let audioContext: AudioContext | null = null;
const soundBuffers: (AudioBuffer | null)[] = [null, null];
let soundPromise: Promise<void> | null = null;

function loadSounds(ctx: AudioContext) {
  if (soundPromise) return soundPromise;
  soundPromise = Promise.all(
    ["/sounds/switch_press.mp3", "/sounds/switch_release.mp3"].map((url, index) =>
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .then((buffer) => {
          soundBuffers[index] = buffer;
        })
        .catch(() => undefined),
    ),
  ).then(() => undefined);
  return soundPromise;
}

function playKeySound(enabled: boolean) {
  if (!enabled) return;
  try {
    audioContext ??= new AudioContext();
    const ctx = audioContext;
    if (ctx.state === "suspended") void ctx.resume();
    void loadSounds(ctx).then(() => {
      const available = soundBuffers.filter((buffer): buffer is AudioBuffer => Boolean(buffer));
      if (!available.length) return;
      const source = ctx.createBufferSource();
      source.buffer = available[Math.floor(Math.random() * available.length)];
      source.playbackRate.value = 0.97 + Math.random() * 0.06;
      const gain = ctx.createGain();
      gain.gain.value = 0.52;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    });
  } catch {
    // Decorative audio must not interfere with the keyboard interaction.
  }
}

function SkillMark({ icon }: { icon: SkillIcon }) {
  if (icon.path) {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label={icon.label}>
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
    );
  }
  return (
    <span className="keyboard-key__symbol" style={{ color: `#${icon.hex}` }}>
      {icon.symbol}
    </span>
  );
}

export default function FrozenKeyboard() {
  const board = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<SkillIcon | null>(null);
  const [sound, setSound] = useState(true);

  const trackKeyUnderPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    board.current?.style.setProperty("--board-rx", `${54 - y * 6}deg`);
    board.current?.style.setProperty("--board-rz", `${-8 + x * 5}deg`);

    // Native :hover can stop at the transformed board in some Chromium
    // compositing paths even though the visible key is at this point. Use
    // the browser's full hit stack, which still reports the correct key.
    const key = document
      .elementsFromPoint(event.clientX, event.clientY)
      .map((element) => element.closest<HTMLElement>(".keyboard-key"))
      .find((element): element is HTMLElement => Boolean(element));
    const next = key
      ? SKILLS_FLAT[Number(key.dataset.skillIndex)] ?? null
      : null;

    if (next?.slug === hovered?.slug) return;
    if (next) playKeySound(sound);
    setHovered(next);
  };

  const resetPointerState = () => {
    setHovered(null);
    board.current?.style.removeProperty("--board-rx");
    board.current?.style.removeProperty("--board-rz");
  };

  return (
    <div
      className="keyboard-wrap"
      onPointerMove={trackKeyUnderPointer}
      onPointerLeave={resetPointerState}
    >
      <div className="keyboard-stage">
        <div className="keyboard-board" ref={board}>
          <div className="keyboard-board__edge" aria-hidden />
          <div className="keyboard-grid">
            {SKILLS_FLAT.map((icon, index) => (
              <button
                type="button"
                className={`keyboard-key ${
                  hovered?.slug === icon.slug ? "is-active" : ""
                }`}
                key={icon.slug}
                data-skill-index={index}
                style={{ ["--key-delay" as string]: `${index * 22}ms` }}
                onFocus={() => setHovered(icon)}
                onBlur={() => setHovered(null)}
                onPointerDown={() => playKeySound(sound)}
                aria-label={`${icon.label}: ${icon.detail}`}
              >
                <span className="keyboard-key__top">
                  <SkillMark icon={icon} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <aside className={`skill-extrusion ${hovered ? "is-visible" : ""}`} aria-live="polite" aria-hidden={!hovered}>
        <div className={`skill-extrusion__title ${hovered && hovered.title.length > 10 ? "is-long" : ""}`} key={hovered?.slug}>
          {hovered?.title ?? ""}
        </div>
        <p>{hovered?.detail ?? ""}</p>
      </aside>
      <div className="keyboard-controls">
        <button
          className="sound-toggle"
          type="button"
          onClick={() => setSound((value) => !value)}
          aria-pressed={sound}
          aria-label={sound ? "Mute keyboard sound" : "Enable keyboard sound"}
        >
          {sound ? "SOUND ON" : "SOUND OFF"}
        </button>
      </div>
    </div>
  );
}
