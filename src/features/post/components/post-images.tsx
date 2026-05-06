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

interface PostImagesProps {
  images: string[];
}

function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) return null;

  const ImageWrapper = ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "cursor-pointer overflow-hidden hover:opacity-90 transition-opacity w-full h-full",
            className,
          )}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-none w-full h-full p-0 border-none bg-black/50 shadow-none flex flex-col items-center justify-center z-100">
        <DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>{alt}</DialogTitle>
          </VisuallyHidden.Root>
        </DialogHeader>

        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain select-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-muted/20 mt-3">
      {images.length === 1 && (
        <div className="w-full overflow-hidden">
          <ImageWrapper
            src={images[0]}
            alt="post image"
            className="aspect-auto max-h-125"
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
