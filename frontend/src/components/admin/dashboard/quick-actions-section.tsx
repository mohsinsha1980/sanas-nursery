import { Card } from "@/components/ui/card";
import { ShoppingCartIcon, MessageSquareIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  borderColor: string;
  iconColor: string;
}

const quickActions: QuickAction[] = [
  {
    title: "Manage Order Enquiries",
    description: "View and manage order enquiries",
    icon: ShoppingCartIcon,
    link: "/admin/order-enquiries",
    borderColor: "border-l-orange-500",
    iconColor: "text-orange-600",
  },
  {
    title: "Manage Contact Enquiries",
    description: "View and manage general enquiries",
    icon: MessageSquareIcon,
    link: "/admin/contact-enquiries",
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-600",
  },
  {
    title: "Manage Plant Products",
    description: "Add and manage plants",
    icon: UsersIcon,
    link: "/admin/plants",
    borderColor: "border-l-green-500",
    iconColor: "text-green-600",
  },
];

export default function QuickActionsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.link}>
            <Card
              className={`p-6 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${action.borderColor} border border-gray-200 hover:border-gray-300`}
            >
              <div className="flex items-center gap-3">
                <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
