import { Separator } from "./ui/separator";

interface Props {
  title: string;
  description: string;
}

function Heading({ title, description }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Separator />
    </div>
  );
}

export default Heading;
