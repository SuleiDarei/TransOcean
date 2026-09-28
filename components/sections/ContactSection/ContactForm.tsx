"use client";

import { submitEnquiry, type FormState } from "@/app/contact/actions";
import { contactContent } from "@/content/contact";
import { services } from "@/content/services";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/ui/Field";
import { PhoneField } from "@/components/ui/PhoneField";
import { useActionState, useEffect, useRef, useState } from "react";

const initial: FormState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  // Set on the client after mount so the timing check measures the visitor's fill time,
  // not the build time of the prerendered page.
  const [startedAt, setStartedAt] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

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
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="field-name" name="name" label={contactContent.fields.name} required autoComplete="name" error={errors?.name} />
          <TextField id="field-company" name="company" label={contactContent.fields.company} autoComplete="organization" />
        </div>
        <TextField id="field-email" name="email" type="email" label={contactContent.fields.email} required autoComplete="email" error={errors?.email} />
        <Field id="field-phone" label={contactContent.fields.phone}>
          <PhoneField />
        </Field>
        <TextField id="field-vessel" name="vessel" label={contactContent.fields.vessel} autoComplete="off" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="field-port" label={contactContent.fields.port} chevron>
            <select id="field-port" name="port" className="field__input" defaultValue="">
              <option value="">Select a port</option>
              {contactContent.ports.map((port) => (
                <option key={port} value={port}>
                  {port}
                </option>
              ))}
            </select>
          </Field>
          <TextField id="field-arrival" name="arrival" type="date" label={contactContent.fields.arrival} autoComplete="off" />
        </div>
        <fieldset className="field field--light">
          <legend className="field__head w-full">
            <span className="field__legend">{contactContent.fields.services}</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <CheckOption key={service.slug} id={`field-service-${service.slug}`} name="services" value={service.name}>
                <span className="flex-1">{service.name}</span>
              </CheckOption>
            ))}
          </div>
        </fieldset>
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
          <CheckOption
            id="field-consent"
            name="consent"
            value="on"
            required
            invalid={!!errors?.consent}
            describedBy={errors?.consent ? "field-consent-error" : undefined}
          >
            <span className="flex-1">
              I have read the <a className="underline underline-offset-4" href="/privacy">Privacy notice</a>.
            </span>
            <span className="field__req">Required</span>
          </CheckOption>
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
      <input type="hidden" name="startedAt" value={startedAt} readOnly />

      <Button type="submit" variant="primary" disabled={pending} className="mt-8 w-full">
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

function CheckOption({
  id,
  name,
  value,
  required,
  invalid,
  describedBy,
  children,
}: {
  id: string;
  name: string;
  value: string;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-h-11 items-start gap-3 t-body" htmlFor={id}>
      <span className="consent">
        <input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          required={required}
          className="check"
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
        <svg className="check__mark" viewBox="0 0 22 22" aria-hidden="true">
          <path pathLength={1} d="M4.6 12.3 C6.1 13.5 6.8 15.4 8.6 15.2 C10.1 13.1 12.2 9.4 14.1 7.6 C15.4 6.3 16.4 5.4 17.4 6.1" />
        </svg>
      </span>
      {children}
    </label>
  );
}
