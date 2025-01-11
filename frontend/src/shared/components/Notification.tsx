import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function Notification({
  variant,
  color,
  msg,
}: {
  variant?: "destructive" | "default";
  color?: string;
  msg: string;
}) {
  return (
    <Alert color={color} variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads Up</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
}
