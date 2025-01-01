import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  innerRef?: React.RefObject<HTMLInputElement>;
};

export function Input({ ...rest }: InputProps) {
  return (
    <input
      ref={rest.innerRef}
      className={`w-full p-2 mb-4 rounded-md text-black ${rest.className}`}
      placeholder="Search App"
      {...rest}
    />
  );
}
