import * as React from "react";

declare module "react-scroll" {
  export const scroller: {
    scrollTo(
      id: string,
      options?: {
        smooth?: boolean | string;
        duration?: number;
        offset?: number;
      },
    ): void;
  };

  export const Link: React.ComponentType<{
    to: string;
    spy?: boolean;
    smooth?: boolean | string;
    duration?: number;
    offset?: number;
    onSetActive?: (to: string) => void;
    className?: string;
    children?: React.ReactNode;
  }>;
}
