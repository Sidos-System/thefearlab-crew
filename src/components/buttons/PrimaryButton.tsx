type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function PrimaryButton({
  text,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-red-700 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-red-800 hover:scale-[1.02] active:scale-95"
    >
      {text}
    </button>
  );
}