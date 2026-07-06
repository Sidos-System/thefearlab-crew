import CardBase from "@/components/ui/Card";

type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <CardBase>
      {children}
    </CardBase>
  );
}
