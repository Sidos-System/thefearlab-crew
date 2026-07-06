import { ChangeEvent } from "react";
import Input from "@/components/ui/Input";

type TextInputProps = {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  placeholder,
  type = "text",
  value,
  onChange,
}: TextInputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
