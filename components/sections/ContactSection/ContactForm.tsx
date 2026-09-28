"use client";

import { submitEnquiry, type FormState } from "@/app/contact/actions";
import { contactContent } from "@/content/contact";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/ui/Field";
import { PhoneField } from "@/components/ui/PhoneField";
import { useActionState, useEffect, useRef } from "react";

const initial: FormState = { status: "idle" };

export function ContactForm({ startedAt }: { startedAt: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error" && state.message) summaryRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div>
        <h3 ref={successRef} tabIndex={-1} className="t-display-m outline-none">
          {contactContent.success.heading}
        </h3>
        <p className="t-body mt-6">{contactContent.success.body}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} noValidate>
      {state.status === "error" && state.message ? (
        <div ref={summaryRef} tabIndex={-1} className="t-small mb-6 text-signal outline-none" role="alert">
          <p>{state.message}</p>
          {state.fieldErrors ? (
            <ul className="mt-2 space-y-1">
              {Object.entries(state.fieldErrors).map(([key, message]) => (
                <li key={key}>
                  <a href={`#field-${key}`}>{message}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-5">
        <TextField id="field-name" name="name" label={contactContent.fields.name} required autoComplete="name" error={errors?.name} />
        <TextField id="field-email" name="email" type="email" label={contactContent.fields.email} required autoComplete="email" error={errors?.email} />
        <Field id="field-phone" label={contactContent.fields.phone}>
          <PhoneField />
        </Field>
        <Field id="field-message" label={contactContent.fields.message} required error={errors?.message}>
          <textarea
            id="field-message"
            name="message"
            required
            rows={5}
            className="field__input"
            aria-invalid={!!errors?.message}
            aria-describedby={errors?.message ? "field-message-error" : undefined}
          />
        </Field>
        <div className="field field--light" data-invalid={errors?.consent ? "true" : undefined}>
          <label className="flex min-h-11 items-start gap-3 t-body" htmlFor="field-consent">
            <span className="consent">
              <input
                id="field-consent"
                type="checkbox"
                name="consent"
                value="on"
                required
                className="check"
                aria-invalid={!!errors?.consent}
                aria-describedby={errors?.consent ? "field-consent-error" : undefined}
              />
              <svg className="check__mark" viewBox="0 0 22 22" aria-hidden="true">
                <path pathLength={1} d="M4.6 12.3 C6.1 13.5 6.8 15.4 8.6 15.2 C10.1 13.1 12.2 9.4 14.1 7.6 C15.4 6.3 16.4 5.4 17.4 6.1" />
              </svg>
            </span>
            <span className="flex-1">
              I have read the <a className="underline underline-offset-4" href="/privacy">Privacy notice</a>.
            </span>
            <span className="field__req">Required</span>
          </label>
          {errors?.consent ? (
            <p className="field__msg" id="field-consent-error" role="alert">
              <i aria-hidden="true" />
              {errors.consent}
            </p>
          ) : null}
        </div>
      </div>

      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">
          Leave this field empty
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" defaultValue={startedAt} />

      <Button type="submit" disabled={pending} className="mt-8 w-full">
        {pending ? contactContent.sending : contactContent.submit}
      </Button>
    </form>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <Field id={id} label={label} required={required} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="field__input"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </Field>
  );
}
