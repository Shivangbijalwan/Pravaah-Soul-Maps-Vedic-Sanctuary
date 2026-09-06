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

// Responsive values based on viewport width
function getResponsiveValues(containerWidth: number) {
  let cardWidth: number;
  let cardHeight: number;
  let gap: number;
  let amplitude: number;
  let maxRotate: number;
  let speed: number;
  let headingSize: string;
  let cardPadding: number;
  let titleFontSize: number;
  let bodyFontSize: number;
  let badgeFontSize: number;

  if (containerWidth < 480) {
    // Mobile (extra small)
    cardWidth = Math.min(200, containerWidth - 40);
    cardHeight = 420;
    gap = 20;
    amplitude = 32;
    maxRotate = 8;
    speed = 30;
    headingSize = "clamp(20px, 5vw, 28px)";
    cardPadding = 12;
    titleFontSize = 16;
    bodyFontSize = 10.5;
    badgeFontSize = 8;
  } else if (containerWidth < 768) {
    // Mobile (small)
    cardWidth = Math.min(220, containerWidth - 30);
    cardHeight = 450;
    gap = 24;
    amplitude = 40;
    maxRotate = 9;
    speed = 35;
    headingSize = "clamp(22px, 4.5vw, 32px)";
    cardPadding = 13;
    titleFontSize = 18;
    bodyFontSize = 11;
    badgeFontSize = 9;
  } else if (containerWidth < 1024) {
    // Tablet
    cardWidth = Math.min(240, containerWidth - 60);
    cardHeight = 470;
    gap = 30;
    amplitude = 48;
    maxRotate = 10;
    speed = 40;
    headingSize = "clamp(26px, 4.2vw, 36px)";
    cardPadding = 14;
    titleFontSize = 19;
    bodyFontSize = 11.5;
    badgeFontSize = 9.5;
  } else {
    // Desktop
    cardWidth = 250;
    cardHeight = 500;
    gap = 40;
    amplitude = 56;
    maxRotate = 11;
    speed = 46;
    headingSize = "clamp(26px, 4.4vw, 40px)";
    cardPadding = 10;
    titleFontSize = 21;
    bodyFontSize = 12.5;
    badgeFontSize = 10.5;
  }

  return {
    cardWidth,
    cardHeight,
    gap,
    amplitude,
    maxRotate,
    speed,
    headingSize,
    cardPadding,
    titleFontSize,
    bodyFontSize,
    badgeFontSize,
  };
}

function PhoneCard({
  profile,
  cardWidth,
  cardHeight,
  cardPadding,
  titleFontSize,
  bodyFontSize,
  badgeFontSize,
}: {
  profile: Profile;
  cardWidth: number;
  cardHeight: number;
  cardPadding: number;
  titleFontSize: number;
  bodyFontSize: number;
  badgeFontSize: number;
}) {
  const Icon = CHAPTER_ICON[profile.section] ?? Sparkles;
  const borderRadius = Math.max(24, cardWidth * 0.15);
  const notchHeight = Math.max(16, cardHeight * 0.04);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          borderRadius,
          background: "linear-gradient(180deg,#221C16,#0E0B08)",
          border: "1px solid rgba(243,236,226,0.12)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.02)",
          padding: 10,
        }}
      >
        {/* Phone notch */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.max(60, cardWidth * 0.35),
            height: notchHeight,
            borderRadius: 10,
            background: "#000",
            zIndex: 3,
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: borderRadius - 10,
            overflow: "hidden",
            background: PALETTE.panel,
            border: `1px solid ${PALETTE.panelEdge}`,
            padding: `${cardPadding + 4}px ${cardPadding}px ${cardPadding}px`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon
                size={Math.max(11, badgeFontSize)}
                color={PALETTE.ember}
                strokeWidth={2.2}
              />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: badgeFontSize,
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
                width: Math.max(32, cardWidth * 0.15),
                height: Math.max(32, cardWidth * 0.15),
                borderRadius: 10,
                background: "rgba(243,236,226,0.05)",
                border: `1px solid ${PALETTE.panelEdge}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: badgeFontSize + 2,
                  color: PALETTE.ink,
                  lineHeight: 1,
                }}
              >
                {profile.badgeTop}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: badgeFontSize - 2,
                  letterSpacing: "0.06em",
                  color: PALETTE.inkMuted,
                  marginTop: 1,
                }}
              >
                {profile.badgeBottom}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: titleFontSize,
              lineHeight: 1.15,
              color: PALETTE.ink,
              margin: `${cardPadding}px 0 8px`,
            }}
          >
            {profile.title}
          </h3>

          {/* Body text */}
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: bodyFontSize,
              lineHeight: 1.5,
              color: PALETTE.inkMuted,
              margin: 0,
              marginBottom: 12,
            }}
          >
            {profile.body}
          </p>

          <div style={{ flex: 1 }} />

          {/* Stat variant */}
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
                    fontSize: bodyFontSize - 1,
                    color: PALETTE.ink,
                  }}
                >
                  {profile.statLabel}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: bodyFontSize - 1,
                    color: PALETTE.gold,
                  }}
                >
                  {profile.statValue}%
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  borderRadius: 3,
                  background: PALETTE.track,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${profile.statValue}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: `linear-gradient(90deg, ${PALETTE.ember}, ${PALETTE.gold})`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Tags variant */}
          {profile.variant === "tags" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: bodyFontSize - 1.5,
                    color: PALETTE.ink,
                    padding: "4px 8px",
                    borderRadius: 16,
                    background: "rgba(243,236,226,0.06)",
                    border: `1px solid ${PALETTE.panelEdge}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Pills variant */}
          {profile.variant === "pills" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: bodyFontSize - 2,
                    letterSpacing: "0.04em",
                    color: PALETTE.gold,
                    marginBottom: 4,
                  }}
                >
                  Core strengths
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {profile.strengths.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: bodyFontSize - 2,
                        color: PALETTE.ink,
                        padding: "3px 6px",
                        borderRadius: 16,
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
                    fontSize: bodyFontSize - 2,
                    letterSpacing: "0.04em",
                    color: "#D9856B",
                    marginBottom: 4,
                  }}
                >
                  Growth edges
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {profile.growth.map((g) => (
                    <span
                      key={g}
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: bodyFontSize - 2,
                        color: PALETTE.ink,
                        padding: "3px 6px",
                        borderRadius: 16,
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

      {/* Card label */}
      <div style={{ marginTop: Math.max(10, cardPadding * 2), textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: badgeFontSize - 1,
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
            fontSize: bodyFontSize,
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
  const responsiveValuesRef = useRef(getResponsiveValues(1200));
  const scrollRef = useRef(0);
  const hoveredRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = viewportRef.current;
    if (el) {
      containerWidthRef.current = el.clientWidth;
      responsiveValuesRef.current = getResponsiveValues(containerWidthRef.current);
      setIsMobile(containerWidthRef.current < 768);
    }

    let ro: ResizeObserver | undefined;
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        containerWidthRef.current = entries[0].contentRect.width;
        responsiveValuesRef.current = getResponsiveValues(containerWidthRef.current);
        setIsMobile(containerWidthRef.current < 768);
      });
      ro.observe(el);
    }

    const vals = responsiveValuesRef.current;
    const STEP = vals.cardWidth + vals.gap;
    const totalTrack = STEP * total;

    function updatePositions() {
      const vals = responsiveValuesRef.current;
      const STEP = vals.cardWidth + vals.gap;
      const totalTrack = STEP * total;
      const centerX = containerWidthRef.current / 2;
      const effectiveScroll =
        ((scrollRef.current % totalTrack) + totalTrack) % totalTrack;

      for (let i = 0; i < total; i++) {
        const baseX = i * STEP;
        let x = baseX - effectiveScroll;
        if (x < -STEP) x += totalTrack;
        if (x > totalTrack - STEP) x -= totalTrack;

        const cardCenter = x + vals.cardWidth / 2;
        let normX = centerX > 0 ? (cardCenter - centerX) / centerX : 0;
        if (normX > 1) normX = 1;
        if (normX < -1) normX = -1;

        const yOffset = -vals.amplitude * (1 - normX * normX);
        const rotateDeg = normX * vals.maxRotate;
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
        scrollRef.current += responsiveValuesRef.current.speed * dt;
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

  const vals = responsiveValuesRef.current;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: PALETTE.void,
        padding: "clamp(40px, 8vw, 72px) 0 clamp(40px, 8vw, 64px)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@450;500;600&family=Manrope:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        
        * {
          -webkit-touch-callout: none;
        }
        
        .horo-cta {
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        
        .horo-cta:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        
        .horo-cta:active {
          transform: translateY(0);
        }
        
        @media (max-width: 767px) {
          .horo-cta {
            font-size: 12px;
            padding: 10px 20px;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "-16%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 140%)",
          height: "clamp(300px, 60vw, 460px)",
          background: "#0B0907",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 640,
          margin: "0 auto clamp(30px, 5vw, 56px)",
          padding: "0 clamp(16px, 5vw, 24px)",
          textAlign: "center",
          boxSizing: "border-box",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: vals.headingSize,
            lineHeight: 1.15,
            color: PALETTE.ink,
            margin: "0 0 clamp(10px, 2vw, 14px)",
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
          height: Math.max(
            vals.cardHeight + 100 + vals.amplitude,
            (typeof window !== "undefined" ? window.innerHeight : 800) * 0.6
          ),
          opacity: ready ? 1 : 0,
          transition: "opacity 0.4s ease",
          flex: isMobile ? "0 1 auto" : "1 1 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "clamp(40px, 10%, 100px)",
            background: `linear-gradient(90deg, ${PALETTE.void}, transparent)`,
            zIndex: 4,
            pointerEvents: "none",
          }}
        />

        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "clamp(40px, 10%, 100px)",
            background: `linear-gradient(90deg, transparent, ${PALETTE.void})`,
            zIndex: 4,
            pointerEvents: "none",
          }}
        />

        {/* Carousel track */}
        {track.map((profile, i) => (
          <div
            key={`${profile.id}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: vals.amplitude,
              left: 0,
              width: vals.cardWidth,
              transformOrigin: "50% 100%",
              willChange: "transform",
            }}
          >
            <PhoneCard
              profile={profile}
              cardWidth={vals.cardWidth}
              cardHeight={vals.cardHeight}
              cardPadding={vals.cardPadding}
              titleFontSize={vals.titleFontSize}
              bodyFontSize={vals.bodyFontSize}
              badgeFontSize={vals.badgeFontSize}
            />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div
        style={{
          textAlign: "center",
          marginTop: "clamp(30px, 5vw, 44px)",
          paddingBottom: "clamp(20px, 3vw, 32px)",
          zIndex: 1,
        }}
      >
        <button
          type="button"
          className="horo-cta"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(12px, 2.5vw, 14px)",
            fontWeight: 600,
            color: "#1A1208",
            background: `linear-gradient(90deg, ${PALETTE.ember}, ${PALETTE.gold})`,
            border: "none",
            borderRadius: 30,
            padding: "clamp(10px, 2vw, 13px) clamp(20px, 4vw, 28px)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Sign in for your free reading
        </button>
      </div>
    </section>
  );
}