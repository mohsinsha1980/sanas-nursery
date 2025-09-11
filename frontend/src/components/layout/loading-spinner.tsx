interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={`flex items-center justify-center h-64 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-orange-500 ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}
