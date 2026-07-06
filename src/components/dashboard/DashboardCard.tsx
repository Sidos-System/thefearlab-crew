import StatCard from "@/components/ui/StatCard";

type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  icon: React.ReactNode;
};

export default function DashboardCard(props: DashboardCardProps) {
  return <StatCard {...props} />;
}
