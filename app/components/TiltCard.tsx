"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const MAX_TILT_DEGREES = 3;

export default function TiltCard({ children, className = "" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function canTilt(event: ReactPointerEvent<HTMLDivElement>) {
    return (
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!canTilt(event)) {
      return;
    }

    const card = cardRef.current;

    if (!card) {
      return;
    }

    pointerPositionRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const bounds = card.getBoundingClientRect();
      const horizontalPosition =
        (pointerPositionRef.current.x - bounds.left) / bounds.width - 0.5;
      const verticalPosition =
        (pointerPositionRef.current.y - bounds.top) / bounds.height - 0.5;
      const rotateX = -verticalPosition * MAX_TILT_DEGREES * 2;
      const rotateY = horizontalPosition * MAX_TILT_DEGREES * 2;

      card.style.setProperty("--card-tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--card-tilt-y", `${rotateY.toFixed(2)}deg`);
      animationFrameRef.current = null;
    });
  }

  function resetTilt() {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    cardRef.current?.style.setProperty("--card-tilt-x", "0deg");
    cardRef.current?.style.setProperty("--card-tilt-y", "0deg");
  }

  return (
    <div
      ref={cardRef}
      className={`catalog-card-tilt ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      {children}
    </div>
  );
}
