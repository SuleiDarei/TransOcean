import { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  theme?: "light" | "dark";
  chevron?: boolean;
  children: ReactNode;
};

export function Field({ id, label, required, error, theme = "light", chevron, children }: Props) {
  return (
    <div className={`field field--${theme}`} data-invalid={error ? "true" : undefined}>
      <div className="field__head">
        <label htmlFor={id}>{label}</label>
        {required ? <span className="field__req">Required</span> : null}
      </div>
      <div className="field__control">
        {children}
        {chevron ? (
          <svg className="field__chevron" viewBox="0 0 12 8" width="12" height="8" aria-hidden="true" focusable="false">
            <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : null}
      </div>
      {error ? (
        <p className="field__msg" id={`${id}-error`} role="alert">
          <i aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
