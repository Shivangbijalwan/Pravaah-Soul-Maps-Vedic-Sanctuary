"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Scale, Compass, type LucideIcon } from "lucide-react";


const PALETTE = {
  void: "#0B0907",
  panel: "#15110D",
  panelEdge: "rgba(243,236,226,0.08)",
  ink: "#F3ECE2",
  inkMuted: "#9C9187",
  ember: "#E8632C",
  gold: "#F0B429",
  track: "rgba(243,236,226,0.09)",
} as const;

type Section = "Identity" | "Equilibrium" | "Vocation";

const CHAPTER_ICON: Record<Section, LucideIcon> = {
  Identity: Sparkles,
  Equilibrium: Scale,
  Vocation: Compass,
};

const CARD_WIDTH = 250;
const CARD_HEIGHT = 500;
const GAP = 40;
const STEP = CARD_WIDTH + GAP;
const AMPLITUDE = 56; // how high the middle of the arc lifts, in px
const MAX_ROTATE = 11; // degrees, at the far edges of the arc
const SPEED = 46; // pixels per second

interface StatProfile {
  variant: "stat";
  statLabel: string;
  statValue: number;
}

interface TagsProfile {
  variant: "tags";
  tags: string[];
}

interface PillsProfile {
  variant: "pills";
  strengths: string[];
  growth: string[];
}

type Profile = {
  id: string;
  category: string;
  caption: string;
  section: Section;
  chapter: string;
  badgeTop: string;
  badgeBottom: string;
  title: string;
  body: string;
} & (StatProfile | TagsProfile | PillsProfile);

const PROFILES: Profile[] = [
  {
    id: "priya",
    category: "NUMEROLOGY READING",
    caption: "Priya's Life Path",
    section: "Identity",
    chapter: "01",
    badgeTop: "5",
    badgeBottom: "PATH",
    title: "The Resilient Architect",
    body: "A Life Path 5 rewrites the plan mid-flight and still lands it. Most people call that instability. It's actually your operating system.",
    variant: "stat",
    statLabel: "Adaptive Endurance",
    statValue: 78,
  },
  {
    id: "karan",
    category: "JYOTISH PROFILE",
    caption: "Karan's Career Chart",
    section: "Vocation",
    chapter: "03",
    badgeTop: "♄",
    badgeBottom: "SATURN",
    title: "The Fated Wanderer",
    body: "Mid Sade Sati, Saturn strips away what wasn't built to last. Everyone going through it swears it's the hardest year — and the one they'd never undo.",
    variant: "tags",
    tags: ["Deep Research", "Crisis Navigation", "Occult Study"],
  },
  {
    id: "meera",
    category: "NUMEROLOGY READING",
    caption: "Meera's Destiny Number",
    section: "Identity",
    chapter: "01",
    badgeTop: "7",
    badgeBottom: "DESTINY",
    title: "The Quiet Seeker",
    body: "Destiny Number 7 doesn't trust an answer it hasn't taken apart first. Slower to conclude, almost never wrong once it does.",
    variant: "stat",
    statLabel: "Introspective Depth",
    statValue: 91,
  },
  {
    id: "arjun",
    category: "JYOTISH PROFILE",
    caption: "Arjun's Strengths",
    section: "Equilibrium",
    chapter: "02",
    badgeTop: "☉",
    badgeBottom: "SUN",
    title: "Strengths & Focal Points",
    body: "A tenth-house sun hands you the room before you've said anything. The chart's own warning: it also makes you slow to hand it back.",
    variant: "pills",
    strengths: ["Quiet Authority", "Long Memory", "Structural Thinking"],
    growth: ["Rigidity", "Delayed Trust"],
  },
  {
    id: "ishaan",
    category: "NUMEROLOGY READING",
    caption: "Ishaan's Path Ahead",
    section: "Vocation",
    chapter: "03",
    badgeTop: "1",
    badgeBottom: "PATH",
    title: "Career & Learning Rhythm",
    body: "Ones don't wait for a template — they become the one other people copy later. Loneliest number to run, best one to have built something with.",
    variant: "tags",
    tags: ["Independent Command", "First-Mover Instinct", "Solo Craft"],
  },
  {
    id: "ananya",
    category: "JYOTISH PROFILE",
    caption: "Ananya's Harmony Chart",
    section: "Identity",
    chapter: "01",
    badgeTop: "♀",
    badgeBottom: "VENUS",
    title: "The Harmonic Diplomat",
    body: "Venus sitting close to Jupiter softens every negotiation before it starts. People leave the room feeling understood, and rarely notice why.",
    variant: "stat",
    statLabel: "Relational Warmth",
    statValue: 84,
  },
  {
    id: "rohan",
    category: "NUMEROLOGY READING",
    caption: "Rohan's Personal Year",
    section: "Vocation",
    chapter: "03",
    badgeTop: "3",
    badgeBottom: "YEAR",
    title: "The Open Window",
    body: "A Personal Year 3 only comes around every nine — the one that rewards whoever's bold enough to be seen. Most people miss it. This one's already open.",
    variant: "stat",
    statLabel: "Creative Momentum",
    statValue: 88,
  },
  {
    id: "simran",
    category: "NUMEROLOGY READING",
    caption: "Simran's Soul Urge",
    section: "Identity",
    chapter: "01",
    badgeTop: "9",
    badgeBottom: "SOUL",
    title: "The Idealist",
    body: "A Soul Urge 9 wants to fix the whole room, not just its own corner of it. The exhaustion is real. So is how far it reaches.",
    variant: "tags",
    tags: ["Global Perspective", "Compassion Fatigue Risk", "Natural Leadership"],
  },
  {
    id: "dev",
    category: "JYOTISH PROFILE",
    caption: "Dev's Moon Chart",
    section: "Equilibrium",
    chapter: "02",
    badgeTop: "☾",
    badgeBottom: "MOON",
    title: "Strengths & Focal Points",
    body: "An Ashlesha moon reads the room before the room has spoken — a gift that looks like suspicion until you learn to trust it.",
    variant: "pills",
    strengths: ["Sharp Perception", "Strategic Patience", "Emotional Camouflage"],
    growth: ["Trust Issues", "Overthinking"],
  },
];

function PhoneCard({ profile }: { profile: Profile }) {
  const Icon = CHAPTER_ICON[profile.section] ?? Sparkles;

  return (
    <>
      <div
        style={{
          position: "relative",
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          borderRadius: 34,
          background: "linear-gradient(180deg,#221C16,#0E0B08)",
          border: "1px solid rgba(243,236,226,0.12)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.02)",
          padding: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 20,
            borderRadius: 12,
            background: "#000",
            zIndex: 3,
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 26,
            overflow: "hidden",
            background: PALETTE.panel,
            border: `1px solid ${PALETTE.panelEdge}`,
            padding: "34px 18px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon size={13} color={PALETTE.ember} strokeWidth={2.2} />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.08em",
                  color: PALETTE.ember,
                  textTransform: "uppercase",
                }}
              >
                Ch.{profile.chapter} · {profile.section}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(243,236,226,0.05)",
                border: `1px solid ${PALETTE.panelEdge}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 15,
                  color: PALETTE.ink,
                  lineHeight: 1,
                }}
              >
                {profile.badgeTop}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 6.5,
                  letterSpacing: "0.06em",
                  color: PALETTE.inkMuted,
                  marginTop: 2,
                }}
              >
                {profile.badgeBottom}
              </span>
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: 21,
              lineHeight: 1.15,
              color: PALETTE.ink,
              margin: "14px 0 10px",
            }}
          >
            {profile.title}
          </h3>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 12.5,
              lineHeight: 1.55,
              color: PALETTE.inkMuted,
              margin: 0,
            }}
          >
            {profile.body}
          </p>

          <div style={{ flex: 1 }} />

          {profile.variant === "stat" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11.5,
                    color: PALETTE.ink,
                  }}
                >
                  {profile.statLabel}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11.5,
                    color: PALETTE.gold,
                  }}
                >
                  {profile.statValue}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 4,
                  background: PALETTE.track,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${profile.statValue}%`,
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${PALETTE.ember}, ${PALETTE.gold})`,
                  }}
                />
              </div>
            </div>
          )}

          {profile.variant === "tags" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10.5,
                    color: PALETTE.ink,
                    padding: "5px 10px",
                    borderRadius: 20,
                    background: "rgba(243,236,226,0.06)",
                    border: `1px solid ${PALETTE.panelEdge}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {profile.variant === "pills" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.04em",
                    color: PALETTE.gold,
                    marginBottom: 5,
                  }}
                >
                  Core strengths
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {profile.strengths.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 10,
                        color: PALETTE.ink,
                        padding: "4px 8px",
                        borderRadius: 20,
                        background: "rgba(240,180,41,0.08)",
                        border: "1px solid rgba(240,180,41,0.2)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.04em",
                    color: "#D9856B",
                    marginBottom: 5,
                  }}
                >
                  Growth edges
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {profile.growth.map((g) => (
                    <span
                      key={g}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 10,
                        color: PALETTE.ink,
                        padding: "4px 8px",
                        borderRadius: 20,
                        background: "rgba(232,99,44,0.08)",
                        border: "1px solid rgba(232,99,44,0.2)",
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14, textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: PALETTE.inkMuted,
            textTransform: "uppercase",
          }}
        >
          {profile.category}
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 14,
            color: PALETTE.ink,
            marginTop: 2,
          }}
        >
          {profile.caption}
        </div>
      </div>
    </>
  );
}

export default function InfiniteHoroscopeCarousel() {
  const COPIES = 2;
  const total = PROFILES.length * COPIES;
  const track: Profile[] = Array.from(
    { length: total },
    (_, i) => PROFILES[i % PROFILES.length]
  );

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerWidthRef = useRef(1200);
  const scrollRef = useRef(0);
  const hoveredRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = viewportRef.current;
    if (el) containerWidthRef.current = el.clientWidth;

    let ro: ResizeObserver | undefined;
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        containerWidthRef.current = entries[0].contentRect.width;
      });
      ro.observe(el);
    }

    const totalTrack = STEP * total;

    function updatePositions() {
      const centerX = containerWidthRef.current / 2;
      const effectiveScroll =
        ((scrollRef.current % totalTrack) + totalTrack) % totalTrack;

      for (let i = 0; i < total; i++) {
        const baseX = i * STEP;
        let x = baseX - effectiveScroll;
        if (x < -STEP) x += totalTrack;
        if (x > totalTrack - STEP) x -= totalTrack;

        const cardCenter = x + CARD_WIDTH / 2;
        let normX = centerX > 0 ? (cardCenter - centerX) / centerX : 0;
        if (normX > 1) normX = 1;
        if (normX < -1) normX = -1;

        const yOffset = -AMPLITUDE * (1 - normX * normX);
        const rotateDeg = normX * MAX_ROTATE;
        const scale = 1 - 0.05 * (normX * normX);
        const opacity = 1 - 0.12 * Math.abs(normX);

        const node = cardRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${x}px, ${yOffset}px, 0) rotate(${rotateDeg}deg) scale(${scale})`;
          node.style.opacity = String(opacity);
        }
      }
    }

    function tick(t: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = t;
      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      if (!hoveredRef.current && !reducedMotionRef.current) {
        scrollRef.current += SPEED * dt;
      }
      updatePositions();
      rafRef.current = requestAnimationFrame(tick);
    }

    updatePositions();
    const readyTimer = window.setTimeout(() => setReady(true), 0);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(readyTimer);
      if (ro) ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: PALETTE.void,
        padding: "72px 0 64px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@450;500;600&family=Manrope:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .horo-cta:hover { filter: brightness(1.08); transform: translateY(-1px); }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "-16%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 140%)",
          height: 460,
          background:
            "#0B0907",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 640,
          margin: "0 auto 56px",
          padding: "0 24px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: "clamp(26px, 4.4vw, 40px)",
            lineHeight: 1.15,
            color: PALETTE.ink,
            margin: "0 0 14px",
          }}
        >
          Every chart reads a different story
        </h2>
    
      </div>

      <div
        ref={viewportRef}
        onMouseEnter={() => (hoveredRef.current = true)}
        onMouseLeave={() => (hoveredRef.current = false)}
        style={{
          position: "relative",
          width: "100%",
          height: CARD_HEIGHT + 100 + AMPLITUDE,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 100,
            background: `linear-gradient(90deg, ${PALETTE.void}, transparent)`,
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 100,
            background: "#0C0A09",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />

        {track.map((profile, i) => (
          <div
            key={`${profile.id}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: AMPLITUDE,
              left: 0,
              width: CARD_WIDTH,
              transformOrigin: "50% 100%",
              willChange: "transform",
            }}
          >
            <PhoneCard profile={profile} />
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 44 }}>
        <button
          type="button" 
          className="horo-cta"
          style={{
          
            fontFamily: "'Manrope', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#1A1208",
            background: `linear-gradient(90deg, ${PALETTE.ember}, ${PALETTE.gold})`,
            border: "none",
            borderRadius: 30,
            padding: "13px 28px",
            cursor: "pointer",
            transition: "filter 0.2s ease, transform 0.2s ease",
            
          }}
        >
          Sign in for your free reading
          
        </button>
      </div>
    </section>
  );
}