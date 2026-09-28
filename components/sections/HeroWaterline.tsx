"use client";

import { homepage } from "@/content/homepage";
import { getMedia } from "@/content/media";
import { Button } from "@/components/primitives/Button";
import { phProps } from "@/lib/phProps";
import { usePortraitHero } from "@/lib/hooks/usePortraitHero";
import { animate, m, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const landscapeSources = [{ src: "/media/hero/gm-01.mp4", type: "video/mp4" }];
const portraitSources = [{ src: "/media/hero/gm-02.mp4", type: "video/mp4" }];

function easeDraw(t: number) {
  const x1 = 0.65;
  const y1 = 0;
  const x2 = 0.35;
  const y2 = 1;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sampleY = (u: number) => ((ay * u + by) * u + cy) * u;
  const sampleDX = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
  let u = t;
  for (let i = 0; i < 5; i++) {
    const dx = sampleDX(u);
    if (Math.abs(dx) < 1e-5) break;
    u -= (sampleX(u) - t) / dx;
  }
  return sampleY(Math.min(1, Math.max(0, u)));
}

export function HeroWaterline() {
  const reduced = useReducedMotion() === true;
  const portrait = usePortraitHero();
  const poster = getMedia(portrait ? "GM-02S" : "GM-01S");
  const sources = portrait ? portraitSources : landscapeSources;
  const lines = homepage.hero.lines;
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ended = useRef(false);
  const intersecting = useRef(true);
  const load = useMotionValue(reduced ? 1 : 0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const rest = portrait ? 44 : 47;

  const wl = useTransform([load, scrollYProgress], ([opened, prog]) => {
    const fromLoad = 100 + (rest - 100) * Number(opened);
    const scrollT = easeDraw(Math.min(1, Number(prog) / 0.55));
    return `${fromLoad * (1 - scrollT)}svh`;
  });
  const lift = useTransform(load, [0, 1], ["6%", "0%"]);
  const veil = useTransform(scrollYProgress, [0.62, 1], [0, 1]);
  const head = useTransform(scrollYProgress, [0.78, 1], [1, 0]);
  const depth = useTransform(scrollYProgress, [0.45, 1], ["0px", "-56px"]);
  const sub = useTransform([load, scrollYProgress], ([opened, prog]) => {
    const fadeIn = Math.min(1, Math.max(0, (Number(opened) - 0.7) / 0.3));
    const fadeOut = 1 - Math.min(1, Number(prog) / 0.25);
    return fadeIn * fadeOut;
  });
  const subY = useTransform(scrollYProgress, [0, 0.25], ["0px", "-24px"]);

  useEffect(() => {
    if (reduced) {
      load.set(1);
      return;
    }
    const controls = animate(load, 1, { duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [load, reduced]);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;

    const sync = () => {
      if (ended.current || document.hidden || !intersecting.current) video.pause();
      else video.play().catch(() => undefined);
    };
    const onEnded = () => {
      ended.current = true;
      video.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );

    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", sync);
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = frame.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - 0.5) * 10;
      const y = ((event.clientY - box.top) / box.height - 0.5) * 6;
      frame.style.setProperty("--nudge-x", `${x.toFixed(2)}px`);
      frame.style.setProperty("--nudge-y", `${y.toFixed(2)}px`);
    };

    io.observe(frame);
    frame.addEventListener("pointermove", onMove);
    return () => {
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", sync);
      frame.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, [portrait, reduced]);

  const frameStyle = reduced
    ? undefined
    : ({
        "--wl": wl,
        "--lift": lift,
        "--veil": veil,
        "--head": head,
        "--depth": depth,
        "--sub": sub,
        "--suby": subY,
      } as React.CSSProperties);

  const title = (
    <>
      <span className="wl__line">{lines[0]}</span>
      <span className="wl__line">{lines[1]}</span>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={portrait ? "wl wl--portrait" : "wl"}
      data-still={reduced ? "true" : undefined}
      aria-label="Introduction"
    >
      <m.div ref={frameRef} className="wl__sticky" style={frameStyle}>
        <div className="wl__sea">
          <div className="wl__sea-inner">
            <Image
              src={poster.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="wl__media"
            />
            {reduced ? null : (
              <video
                key={sources[0].src}
                ref={videoRef}
                className="wl__media"
                autoPlay
                muted
                playsInline
                preload="metadata"
                poster={poster.src}
                aria-hidden="true"
              >
                {sources.map((source) => (
                  <source key={source.src} src={source.src} type={source.type} />
                ))}
              </video>
            )}
            {portrait ? <div className="wl__tint" aria-hidden="true" /> : null}
          </div>
        </div>
        <div className="wl__veil" aria-hidden="true" />
        <div className="wl__ink">
          <h1 className="wl__title" {...phProps(homepage.hero.meta)}>
            {title}
          </h1>
        </div>
        <div className="wl__lime" aria-hidden="true">
          <div className="wl__lime-inner">
            <p className="wl__title wl__title--lime">{title}</p>
          </div>
        </div>
        <div className="wl__aside">
          <p className="wl__lead" {...phProps(homepage.hero.meta)}>
            {homepage.hero.subline}
          </p>
          {portrait ? null : (
            <Button href="/contact">{homepage.hero.cta}</Button>
          )}
        </div>
        {portrait ? (
          <div className="wl__dock">
            <Button href="/contact" surface="dark" className="w-full">
              {homepage.hero.cta}
            </Button>
          </div>
        ) : null}
      </m.div>
    </section>
  );
}
