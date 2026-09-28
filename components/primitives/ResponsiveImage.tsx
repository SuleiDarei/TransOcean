import { getMedia } from "@/content/media";
import { cn } from "@/lib/cn";
import Image from "next/image";

export function ResponsiveImage({
  id,
  sizes,
  priority = false,
  className,
  decorative = false,
}: {
  id: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  decorative?: boolean;
}) {
  const asset = getMedia(id);
  return (
    <Image
      src={asset.src}
      alt={decorative ? "" : asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      className={cn("h-full w-full object-cover", className)}
      style={{ objectPosition: `${asset.focal.x * 100}% ${asset.focal.y * 100}%` }}
    />
  );
}
