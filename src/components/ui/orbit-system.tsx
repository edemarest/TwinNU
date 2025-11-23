"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type OrbitLayer = {
  innerRadius: number;
  outerRadius: number;
  avatars: { src: string; alt: string }[];
  speed?: number;
  avatarSize?: number;
  bandColor?: string;
  zIndex?: number;
};

type OrbitSystemProps = {
  layers: OrbitLayer[];
  centerContent?: ReactNode;
};

export function OrbitSystem({ layers, centerContent }: OrbitSystemProps) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileScale, setMobileScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);
  const lastWidthRef = useRef(0);
  const enterTimeoutRef = useRef<number | null>(null);
  const releaseTimeoutRef = useRef<number | null>(null);
  const baseDiameter = Math.max(...layers.map((layer) => layer.outerRadius * 2));
  const FREEZE_DELAY = 90;
  const RELEASE_DELAY = 180;

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return;
    }
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      lastWidthRef.current = 0;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    if (typeof window === "undefined" || !("ResizeObserver" in window)) {
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width } = entry.contentRect;
      if (!width || width === lastWidthRef.current) return;
      lastWidthRef.current = width;
      const nextScale = Math.min(width / baseDiameter, 1);
      setMobileScale(nextScale || 1);
    });

    observerRef.current = observer;
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (observerRef.current === observer) {
        observerRef.current = null;
      }
    };
  }, [baseDiameter, isMobile]);

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const handleLayerEnter = (layerIndex: number) => {
    if (hoveredLayer === layerIndex) return;
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
    if (enterTimeoutRef.current) {
      window.clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }

    if (hoveredLayer !== null) {
      setHoveredLayer(layerIndex);
      return;
    }

    enterTimeoutRef.current = window.setTimeout(() => {
      setHoveredLayer(layerIndex);
      enterTimeoutRef.current = null;
    }, FREEZE_DELAY);
  };

  const handleLayerLeave = () => {
    if (enterTimeoutRef.current) {
      window.clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }
    releaseTimeoutRef.current = window.setTimeout(() => {
      setHoveredLayer(null);
      releaseTimeoutRef.current = null;
    }, RELEASE_DELAY);
  };

  const renderScale = isMobile ? mobileScale : 1;

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-square w-full max-w-[720px] items-center justify-center"
    >
      {centerContent ? (
        <div
          className="relative z-20 flex items-center justify-center"
          style={{ transform: `scale(${renderScale})` }}
        >
          {centerContent}
        </div>
      ) : null}
      {layers.map((layer, layerIndex) => {
        const angleStep = 360 / layer.avatars.length;
        const duration = Math.abs(layer.speed ?? 90);
        const counterClass =
          layer.speed && layer.speed < 0
            ? "avatar-counter-reverse"
            : "avatar-counter";
        const spinClass =
          layer.speed && layer.speed < 0 ? "orbit-spin-reverse" : "orbit-spin";
        const shouldPause = hoveredLayer !== null;
        const scaledInnerRadius = layer.innerRadius * renderScale;
        const scaledOuterRadius = layer.outerRadius * renderScale;
        const bandWidth = scaledOuterRadius - scaledInnerRadius;

        return (
          <div
            key={layer.outerRadius}
            className="absolute inset-0"
            style={{ zIndex: layer.zIndex ?? 0 }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: scaledOuterRadius * 2,
                height: scaledOuterRadius * 2,
                borderWidth: bandWidth,
                borderStyle: "solid",
                borderColor: layer.bandColor ?? "rgba(255,255,255,0.25)",
              }}
            />

            <div
              className={`${spinClass} relative z-20`}
              style={{
                animationDuration: `${duration}s`,
                animationPlayState: shouldPause ? "paused" : "running",
              }}
              onMouseEnter={() => handleLayerEnter(layerIndex)}
              onMouseLeave={handleLayerLeave}
            >
              {layer.avatars.map((avatar, index) => {
                const size = (layer.avatarSize ?? 40) * renderScale;
                const angle = angleStep * index;
                const rad = (angle * Math.PI) / 180;
                const midRadius =
                  scaledInnerRadius +
                  (scaledOuterRadius - scaledInnerRadius) / 2;
                const radiusOffset = midRadius;
                const tangentX = -Math.sin(rad);
                const tangentY = Math.cos(rad);
                const jitter = shouldPause ? 18 * renderScale : 0;
                const x = radiusOffset * Math.cos(rad) + tangentX * jitter;
                const y = radiusOffset * Math.sin(rad) + tangentY * jitter;
                const freezeDuration = shouldPause ? 420 : 260;
                return (
                  <div
                    key={`${avatar.src}-${index}`}
                    className="absolute z-30 will-change-transform"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      transition: `transform ${freezeDuration}ms cubic-bezier(0.2, 0.95, 0.35, 1)`,
                    }}
                  >
                    <div
                      className={`${counterClass} pointer-events-auto`}
                      style={{
                        animationDuration: `${duration}s`,
                        animationPlayState: shouldPause ? "paused" : "running",
                      }}
                    >
                      <div
                        className="relative flex items-center justify-center rounded-full bg-white/25 backdrop-blur-md shadow-[0_4px_14px_rgba(15,23,42,0.2)]"
                        style={{
                          width: size,
                          height: size,
                          border: "0.5px solid rgba(255,255,255,0.9)",
                        }}
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          width={size - 6}
                          height={size - 6}
                          className="rounded-full object-cover opacity-90"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
