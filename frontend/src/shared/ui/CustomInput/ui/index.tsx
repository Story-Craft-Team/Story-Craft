import React, { ChangeEvent } from "react";
import s from "./Input.module.scss";

interface Props {
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputElement["type"];
  value?: string;
  min?: string;
  max?: string;
  defaultValue?: number;
  className?: string;
}

export default function CustomInput({
  onChange,
  placeholder,
  type,
  min,
  max,
  defaultValue,
  className,
}: Props) {
  return (
    <input
      className={className ? className : s.input_style}
      type={type}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
      placeholder={placeholder}
      min={min}
      max={max}
      defaultValue={defaultValue}
    />
  );
}
