interface LoadingSkeletonProps {
  height?: string;
  className?: string;
}

export default function LoadingSkeleton({
  height = "h-32",
  className = "",
}: LoadingSkeletonProps) {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${height} ${className}`}
    />
  );
}





