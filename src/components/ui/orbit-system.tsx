"use client";

import Image from "next/image";
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
  return (
    <div className="relative flex h-[720px] w-[720px] items-center justify-center">
      {centerContent ? (
        <div className="relative z-20 flex items-center justify-center">
          {centerContent}
        </div>
      ) : null}
      {layers.map((layer) => {
        const angleStep = 360 / layer.avatars.length;
        const duration = Math.abs(layer.speed ?? 90);
        const spinClass =
          layer.speed && layer.speed < 0 ? "orbit-spin-reverse" : "orbit-spin";
        const counterClass =
          layer.speed && layer.speed < 0
            ? "avatar-counter-reverse"
            : "avatar-counter";

        return (
          <div
            key={layer.outerRadius}
            className="absolute inset-0"
            style={{ zIndex: layer.zIndex ?? 0 }}
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: layer.innerRadius * 2,
                height: layer.innerRadius * 2,
                boxShadow: `0 0 0 ${
                  layer.outerRadius - layer.innerRadius
                }px ${layer.bandColor ?? "rgba(255,255,255,0.25)"}`,
              }}
            />

            <div
              className={`${spinClass} relative z-30`}
              style={{ animationDuration: `${duration}s` }}
            >
              {layer.avatars.map((avatar, index) => {
                const size = layer.avatarSize ?? 40;
                const angle = angleStep * index;
                const rad = (angle * Math.PI) / 180;
                const midRadius =
                  layer.innerRadius +
                  (layer.outerRadius - layer.innerRadius) / 2;
                const radiusOffset = midRadius - size / 2;
                const x = radiusOffset * Math.cos(rad);
                const y = radiusOffset * Math.sin(rad);
                return (
                  <div
                    key={`${avatar.src}-${index}`}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div
                      className={`${counterClass} relative z-40 glass-chip flex items-center justify-center rounded-full border border-white/12 bg-black/35 shadow-glow-secondary`}
                      style={{
                        animationDuration: `${duration}s`,
                        width: size,
                        height: size,
                        borderWidth: 1.5,
                      }}
                    >
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        width={size - 8}
                        height={size - 8}
                        className="rounded-full object-cover"
                      />
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
