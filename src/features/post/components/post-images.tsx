"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";

interface PostImagesProps {
  images: string[];
}

function ImageWrapper({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "relative cursor-pointer overflow-hidden hover:opacity-90 transition-opacity w-full h-full",
            className,
          )}
        >
          <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-none w-full h-full p-0 border-none bg-black/50 shadow-none flex flex-col items-center justify-center z-100">
        <DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>{alt}</DialogTitle>
          </VisuallyHidden.Root>
        </DialogHeader>

        <div className="relative min-h-0 min-w-0 h-[min(80vh,900px)] w-[min(92vw,1200px)]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            unoptimized
            className="object-contain select-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/20 mt-3">
      {images.length === 1 && (
        <div className="relative aspect-video w-full overflow-hidden">
          <ImageWrapper
            src={images[0]}
            alt="post image"
          />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-1 aspect-video">
          <ImageWrapper src={images[0]} alt="image 1" />
          <ImageWrapper src={images[1]} alt="image 2" />
        </div>
      )}

      {images.length === 3 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-video">
          <ImageWrapper src={images[0]} alt="image 1" className="row-span-2" />
          <ImageWrapper src={images[1]} alt="image 2" />
          <ImageWrapper src={images[2]} alt="image 3" />
        </div>
      )}

      {images.length >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-video">
          {images.slice(0, 4).map((img, i) => (
            <ImageWrapper key={i} src={img} alt={`image ${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostImages;
