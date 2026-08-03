"use client";

import Image from "next/image";
import {
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  frontImage: string;
  backImage?: string;
  alt: string;
};

type NormalizedImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

const normalizedImageCache = new Map<
  string,
  Promise<string>
>();

function normalizeCardImage(
  src: string,
): Promise<string> {
  const cachedImage =
    normalizedImageCache.get(src);

  if (cachedImage) {
    return cachedImage;
  }

  const normalizedImage = new Promise<string>(
    (resolve) => {
      const image = new window.Image();

      if (
        src.startsWith("http://") ||
        src.startsWith("https://")
      ) {
        image.crossOrigin = "anonymous";
      }

      image.onload = () => {
        try {
          const sourceCanvas =
            document.createElement("canvas");

          sourceCanvas.width = image.naturalWidth;
          sourceCanvas.height = image.naturalHeight;

          const sourceContext =
            sourceCanvas.getContext("2d", {
              willReadFrequently: true,
            });

          if (!sourceContext) {
            resolve(src);
            return;
          }

          sourceContext.drawImage(image, 0, 0);

          const imageData =
            sourceContext.getImageData(
              0,
              0,
              sourceCanvas.width,
              sourceCanvas.height,
            );

          const { data, width, height } =
            imageData;

          let minX = width;
          let minY = height;
          let maxX = -1;
          let maxY = -1;

          const alphaThreshold = 8;

          for (let y = 0; y < height; y += 1) {
            for (let x = 0; x < width; x += 1) {
              const alpha =
                data[(y * width + x) * 4 + 3];

              if (alpha > alphaThreshold) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }

          if (maxX < minX || maxY < minY) {
            resolve(src);
            return;
          }

          const visibleWidth =
            maxX - minX + 1;

          const visibleHeight =
            maxY - minY + 1;

          const paddingX = Math.round(
            visibleWidth * 0.012,
          );

          const paddingY = Math.round(
            visibleHeight * 0.012,
          );

          const cropX = Math.max(
            0,
            minX - paddingX,
          );

          const cropY = Math.max(
            0,
            minY - paddingY,
          );

          const cropWidth = Math.min(
            width - cropX,
            visibleWidth + paddingX * 2,
          );

          const cropHeight = Math.min(
            height - cropY,
            visibleHeight + paddingY * 2,
          );

          const targetCanvas =
            document.createElement("canvas");

          targetCanvas.width = cropWidth;
          targetCanvas.height = cropHeight;

          const targetContext =
            targetCanvas.getContext("2d");

          if (!targetContext) {
            resolve(src);
            return;
          }

          targetContext.drawImage(
            sourceCanvas,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight,
          );

          resolve(
            targetCanvas.toDataURL("image/png"),
          );
        } catch {
          resolve(src);
        }
      };

      image.onerror = () => {
        resolve(src);
      };

      image.src = src;
    },
  );

  normalizedImageCache.set(
    src,
    normalizedImage,
  );

  return normalizedImage;
}

function NormalizedImage({
  src,
  alt,
  priority = false,
}: NormalizedImageProps) {
  const [normalizedSource, setNormalizedSource] =
    useState(src);

  const [isReady, setIsReady] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsReady(false);

    normalizeCardImage(src).then(
      (normalizedImage) => {
        if (cancelled) {
          return;
        }

        setNormalizedSource(normalizedImage);
        setIsReady(true);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <Image
      src={normalizedSource}
      alt={alt}
      fill
      priority={priority}
      unoptimized={normalizedSource.startsWith(
        "data:",
      )}
      sizes="(max-width: 640px) 250px, 320px"
      className={[
        "object-contain",
        "transition-opacity duration-200",
        isReady
          ? "opacity-100"
          : "opacity-0",
      ].join(" ")}
      draggable={false}
    />
  );
}

export default function ImageZoom({
  frontImage,
  backImage,
  alt,
}: Props) {
  const [showBack, setShowBack] =
    useState(false);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [modalImage, setModalImage] =
    useState(frontImage);

  const [modalAlt, setModalAlt] =
    useState(alt);

  const zoomImageRef =
    useRef<HTMLDivElement>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const pointerPositionRef = useRef({
    x: 50,
    y: 50,
  });

  const currentBack =
    backImage ?? "/series/2142.jpg";

  const currentImage = showBack
    ? currentBack
    : frontImage;

  const currentAlt = showBack
    ? `${alt} bagside`
    : alt;

  useEffect(() => {
    setShowBack(false);
    setIsModalOpen(false);
  }, [frontImage, currentBack]);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );
      }
    };
  }, []);

  function openModal() {
    setModalImage(currentImage);
    setModalAlt(currentAlt);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleCardSide() {
    setShowBack(
      (currentValue) => !currentValue,
    );
  }

  function updateZoomPosition() {
    const zoomImage =
      zoomImageRef.current;

    if (!zoomImage) {
      animationFrameRef.current = null;
      return;
    }

    const { x, y } =
      pointerPositionRef.current;

    zoomImage.style.transformOrigin =
      `${x}% ${y}%`;

    animationFrameRef.current = null;
  }

  function handleZoomMove(
    event: MouseEvent<HTMLDivElement>,
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    pointerPositionRef.current = {
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    };

    if (
      animationFrameRef.current === null
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          updateZoomPosition,
        );
    }
  }

  function handleZoomEnter() {
    const zoomImage =
      zoomImageRef.current;

    if (!zoomImage) {
      return;
    }

    zoomImage.style.transform =
      "scale(1.8)";
  }

  function handleZoomLeave() {
    if (
      animationFrameRef.current !== null
    ) {
      cancelAnimationFrame(
        animationFrameRef.current,
      );

      animationFrameRef.current = null;
    }

    pointerPositionRef.current = {
      x: 50,
      y: 50,
    };

    const zoomImage =
      zoomImageRef.current;

    if (!zoomImage) {
      return;
    }

    zoomImage.style.transform =
      "scale(1)";

    zoomImage.style.transformOrigin =
      "50% 50%";
  }

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div
          className="flex w-full justify-center"
          style={{
            perspective: "1800px",
          }}
        >
          <div
            className={[
              "relative select-none",
              "h-[350px] w-[250px]",
              "sm:h-[450px] sm:w-[320px]",
            ].join(" ")}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Forside */}
            <button
              type="button"
              onClick={openModal}
              aria-label={`Åbn stort billede af ${alt}`}
              className={[
                "absolute inset-0",
                "cursor-zoom-in",
                "appearance-none border-0 bg-transparent p-0",
                "drop-shadow-xl",
                "transition-transform duration-700",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                "focus-visible:outline-none",
                "focus-visible:ring-4",
                "focus-visible:ring-gray-300",
              ].join(" ")}
              style={{
                transform: showBack
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility:
                  "hidden",
                pointerEvents: showBack
                  ? "none"
                  : "auto",
              }}
            >
              <span className="relative block h-full w-full overflow-hidden rounded-[16px]">
                <NormalizedImage
                  src={frontImage}
                  alt={alt}
                  priority
                />
              </span>
            </button>

            {/* Bagside */}
            <button
              type="button"
              onClick={openModal}
              aria-label={`Åbn stort billede af ${alt} bagside`}
              className={[
                "absolute inset-0",
                "cursor-zoom-in",
                "appearance-none border-0 bg-transparent p-0",
                "drop-shadow-xl",
                "transition-transform duration-700",
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                "focus-visible:outline-none",
                "focus-visible:ring-4",
                "focus-visible:ring-gray-300",
              ].join(" ")}
              style={{
                transform: showBack
                  ? "rotateY(0deg)"
                  : "rotateY(-180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility:
                  "hidden",
                pointerEvents: showBack
                  ? "auto"
                  : "none",
              }}
            >
              <span className="relative block h-full w-full overflow-hidden rounded-[16px]">
                <NormalizedImage
                  src={currentBack}
                  alt={`${alt} bagside`}
                />
              </span>
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Klik på kortet for at forstørre
        </p>

        <button
          type="button"
          onClick={toggleCardSide}
          className={[
            "mt-3 rounded-full",
            "border border-gray-300",
            "bg-white px-5 py-2",
            "text-sm font-medium",
            "transition hover:bg-gray-100",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-gray-400",
          ].join(" ")}
        >
          ↻{" "}
          {showBack
            ? "Vis forside"
            : "Vend kort"}
        </button>
      </div>

      {/* Zoomvisning */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Forstørret visning af ${modalAlt}`}
          className={[
            "fixed inset-0 z-[100]",
            "flex items-center justify-center",
            "bg-black/80 p-4",
            "backdrop-blur-sm",
            "sm:p-8",
          ].join(" ")}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="Luk forstørret visning"
            className={[
              "absolute right-4 top-4 z-20",
              "flex h-12 w-12 items-center justify-center",
              "rounded-full bg-white",
              "text-2xl text-black",
              "shadow-lg transition",
              "hover:scale-105 hover:bg-gray-100",
              "sm:right-8 sm:top-8",
            ].join(" ")}
          >
            ×
          </button>

          <div className="flex max-h-full max-w-full flex-col items-center">
            <div
              className={[
                "relative overflow-hidden",
                "h-[68vh] w-[48vh]",
                "max-h-[760px] max-w-[545px]",
                "cursor-zoom-in",
                "rounded-[22px]",
                "drop-shadow-2xl",
              ].join(" ")}
              onMouseMove={handleZoomMove}
              onMouseEnter={handleZoomEnter}
              onMouseLeave={handleZoomLeave}
            >
              <div
                ref={zoomImageRef}
                className={[
                  "absolute inset-0",
                  "will-change-transform",
                  "transition-transform duration-200",
                  "ease-out",
                ].join(" ")}
                style={{
                  transform: "scale(1)",
                  transformOrigin: "50% 50%",
                }}
              >
                <NormalizedImage
                  src={modalImage}
                  alt={modalAlt}
                  priority
                />
              </div>
            </div>

            <p className="mt-4 text-sm text-white/80">
              Før musen over kortet for at zoome
            </p>
          </div>
        </div>
      )}
    </>
  );
}