import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Props 타입 정의
interface PasswordInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="flex">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="비밀번호"
      />
      <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
    </div>
  );
};

export default PasswordInput;
