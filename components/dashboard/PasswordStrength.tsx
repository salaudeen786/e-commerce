"use client";

import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const percent = (score / 4) * 100;

  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-emerald-500"];
  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

  return (
    <div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-300", colors[score])}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1.5 space-y-1">
        <p className="text-xs text-muted-foreground">
          Strength: <span className={cn("font-medium", score >= 3 ? "text-emerald-600" : score >= 2 ? "text-amber-600" : "text-red-600")}>{labels[score]}</span>
        </p>
        <ul className="space-y-0.5">
          {Object.entries({ "8+ characters": checks.length, "Uppercase letter": checks.uppercase, "Number": checks.number, "Special character": checks.special }).map(([label, pass]) => (
            <li key={label} className={cn("text-xs", pass ? "text-emerald-600" : "text-muted-foreground")}>
              {pass ? "✓" : "○"} {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
