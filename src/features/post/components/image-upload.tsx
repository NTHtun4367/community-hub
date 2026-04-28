import { UploadRouter } from "@/app/api/uploadthing/core";
import { cn } from "@/lib/utils";
import { generateReactHelpers } from "@uploadthing/react";
import { Trash2, ImagePlus, Loader2 } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

const { useUploadThing } = generateReactHelpers<UploadRouter>();

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

function ImageUpload({ value, onChange, max = 4 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Sync refs with props to avoid closure staleness during async uploads
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);

  const { startUpload, isUploading } = useUploadThing("postImage", {
    onClientUploadComplete: (res) => {
      const urls = res.map((file) => file.ufsUrl);
      if (urls.length) {
        const newValue = [...valueRef.current, ...urls].slice(0, max);
        onChangeRef.current(newValue);
        toast.success("Images uploaded successfully.");
      }
    },
    onUploadError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const currentCount = value.length;
    const allowedCount = max - currentCount;

    if (allowedCount <= 0) {
      toast.error(`Maximum ${max} images allowed.`);
      return;
    }

    const files = Array.from(fileList).slice(0, allowedCount);
    await startUpload(files);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (isUploading) return;
    await handleFiles(event.dataTransfer.files);
  };

  const remaining = max - value.length;

  return (
    <div className="space-y-4 w-full">
      {/* Dropzone Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!isUploading && remaining > 0) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() =>
          !isUploading && remaining > 0 && fileInputRef.current?.click()
        }
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-all cursor-pointer",
          dragActive
            ? "border-primary bg-primary/5 shadow-inner"
            : "border-muted-foreground/20 bg-secondary/30 hover:bg-secondary/50",
          (isUploading || remaining <= 0) && "opacity-60 cursor-not-allowed",
        )}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          {isUploading ? (
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          ) : (
            <ImagePlus className="h-10 w-10 text-muted-foreground" />
          )}
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isUploading
                ? "Uploading your files..."
                : "Click or drag images here"}
            </p>
            <p className="text-xs text-muted-foreground">
              {remaining > 0
                ? `You can add ${remaining} more ${remaining === 1 ? "image" : "images"} (Max 4MB each)`
                : "Limit reached"}
            </p>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={isUploading || remaining <= 0}
      />

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {value.map((url, i) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted shadow-sm"
            >
              <img
                src={url}
                alt={`Upload ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((img) => img !== url));
                }}
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-white shadow-md hover:bg-destructive/90 transition-transform active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
