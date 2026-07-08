import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: 12, md: 14, lg: 18 };

export function RatingStars({
  rating,
  size = "sm",
  showValue,
  className,
}: RatingStarsProps) {
  const starSize = sizeMap[size];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fillPercent =
          i < fullStars ? 100 : i === fullStars && hasHalf ? 50 : 0;
        return (
          <span key={i} className="relative" style={{ width: starSize, height: starSize }}>
            <Star
              size={starSize}
              className="absolute inset-0 text-muted-foreground/20"
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                size={starSize}
                className="text-amber-400"
                fill="currentColor"
              />
            </span>
          </span>
        );
      })}
      {showValue && (
        <span className="ml-1 text-xs font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
