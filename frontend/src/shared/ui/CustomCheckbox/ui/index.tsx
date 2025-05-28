import { ReactNode } from "react";
import styles from "./CustomCheckbox.module.scss";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  icon?: ReactNode;
}

const CustomCheckbox = ({ checked, onChange, label, icon }: CustomCheckboxProps) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkboxInput}
      />
      <span className={`${styles.checkboxBox} ${checked ? styles.active : ""}`}>
        {checked && <span className={styles.icon}>{icon}</span>}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
