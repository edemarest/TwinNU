"use client";

import Image from "next/image";
import { useState } from "react";
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

  return (
    <div className="relative flex aspect-square w-full max-w-[720px] items-center justify-center">
      {centerContent ? (
        <div className="relative z-20 flex items-center justify-center">
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

        return (
          <div
            key={layer.outerRadius}
            className="absolute inset-0"
            style={{ zIndex: layer.zIndex ?? 0 }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: layer.outerRadius * 2,
                height: layer.outerRadius * 2,
                borderWidth: layer.outerRadius - layer.innerRadius,
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
              onMouseEnter={() => setHoveredLayer(layerIndex)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              {layer.avatars.map((avatar, index) => {
                const size = layer.avatarSize ?? 40;
                const angle = angleStep * index;
                const rad = (angle * Math.PI) / 180;
                const midRadius =
                  layer.innerRadius +
                  (layer.outerRadius - layer.innerRadius) / 2;
                const radiusOffset = midRadius;
                const tangentX = -Math.sin(rad);
                const tangentY = Math.cos(rad);
                const jitter = shouldPause ? 18 : 0;
                const x = radiusOffset * Math.cos(rad) + tangentX * jitter;
                const y = radiusOffset * Math.sin(rad) + tangentY * jitter;
                return (
                  <div
                    key={`${avatar.src}-${index}`}
                    className={`absolute z-30 transition-transform ${
                      shouldPause
                        ? "duration-300 ease-[cubic-bezier(0.2,1.4,0.4,1)]"
                        : "duration-500 ease-out"
                    }`}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
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
