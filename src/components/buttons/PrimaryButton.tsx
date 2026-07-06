import Button from "@/components/ui/Button";

type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function PrimaryButton({
  text,
  onClick,
}: PrimaryButtonProps) {
  return (
    <Button
      className="w-full"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
