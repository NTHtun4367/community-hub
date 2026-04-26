import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface SubmitButtonProps {
  isPending: boolean;
  label: string;
}

function SubmitButton({ isPending, label }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? <Loader className="animate-spin" /> : label}
    </Button>
  );
}

export default SubmitButton;
