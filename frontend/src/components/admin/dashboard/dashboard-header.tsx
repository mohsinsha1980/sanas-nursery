interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title = "Dashboard",
  subtitle = "Overview of your nursery management system",
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 px-0">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
