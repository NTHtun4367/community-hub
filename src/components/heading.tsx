import { Separator } from "./ui/separator";

interface Props {
  title: string;
  description?: string;
}

function Heading({ title, description }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm font-medium text-muted-foreground">{description}</p>
      <Separator className="mt-2 mb-6" />
    </div>
  );
}

export default Heading;
