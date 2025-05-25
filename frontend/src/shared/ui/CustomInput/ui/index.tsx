import React, { ChangeEvent } from "react";
import s from "./Input.module.scss";

interface Props {
	onChange: (value: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: HTMLInputElement["type"];
	value?: string;
}

export default function CustomInput({ onChange, placeholder, type }: Props) {
	return (
		<input
			className={ s.input_style }
			type={type}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
			placeholder={placeholder}
		/>
	);
}
