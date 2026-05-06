import BackButton from "./back-button";
import { Separator } from "./ui/separator";

interface Props {
  title: string;
  description?: string;
}

function Heading({ title, description }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm font-medium text-muted-foreground">
            {description}
          </p>
        </div>
        <BackButton />
      </div>
      <Separator className="mt-2 mb-6" />
    </>
  );
}

export default Heading;
