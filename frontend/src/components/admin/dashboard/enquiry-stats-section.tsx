import {
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  PhoneIcon,
} from "lucide-react";
import StatCard from "./stat-card";

interface EnquiryStatsSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: {
    total: number;
    pending: number;
    contacted: number;
    resolved: number;
    closed: number;
  };
  baseLink: string;
}

export default function EnquiryStatsSection({
  title,
  icon: Icon,
  stats,
  baseLink,
}: EnquiryStatsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-orange-600 flex-shrink-0" />
        <h2 className="text-xl font-semibold text-gray-900 leading-6 !mb-0">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enquiries"
          value={stats.total}
          icon={FileTextIcon}
          color="text-gray-600"
          link={baseLink}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={ClockIcon}
          color="text-yellow-600"
          link={`${baseLink}?status=pending`}
        />
        <StatCard
          title="Contacted"
          value={stats.contacted}
          icon={PhoneIcon}
          color="text-blue-600"
          link={`${baseLink}?status=contacted`}
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={CheckCircleIcon}
          color="text-green-600"
          link={`${baseLink}?status=resolved`}
        />
      </div>
    </div>
  );
}
