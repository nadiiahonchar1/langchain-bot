"use client";

import styles from "./switchers.module.css";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  isLoading: boolean;
  options: Option[];
  onChange: (value: string) => void;
  loadingText: string;
};

export default function Switcher({
  label,
  value,
  isLoading,
  options,
  onChange,
  loadingText,
}: Props) {
  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="general">{label}</label>
      <div className={styles.selectWrapper}>
        <select
          id="general"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          className={`${styles.loading} ${isLoading ? styles.visible : ""}`}
        >
          {loadingText}...
        </span>
      </div>
    </div>
  );
}
