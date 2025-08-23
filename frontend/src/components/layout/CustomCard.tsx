import { Card, CardContent } from "@/components/ui/card";
import classes from "./custom-card.module.css";

export default function CustomCard({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <Card className={`${className ? `${classes.bl_card} ${className}` :`${classes.bl_card}`}`}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
