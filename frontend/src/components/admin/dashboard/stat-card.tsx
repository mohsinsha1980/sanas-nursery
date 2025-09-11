import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  link?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  link,
}: StatCardProps) {
  return (
    <Card className="p-6 bg-white hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("text-", "bg-")
            .replace("-600", "-100")} shadow-sm`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      {link && (
        <Link href={link}>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 p-0 h-auto text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            View Details <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      )}
    </Card>
  );
}
