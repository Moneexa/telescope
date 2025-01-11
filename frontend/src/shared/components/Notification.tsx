import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, MessageCircleWarningIcon } from "lucide-react";

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
      {variant === "default" && <Info className="h-4 w-4" />}
      {variant === "destructive" && (
        <MessageCircleWarningIcon className="h-4 w-4" />
      )}
      <AlertTitle>Heads Up</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
}
