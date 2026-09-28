"use client";

import { countries, countryFlag, defaultCountry, type Country } from "@/lib/phone/countries";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export function PhoneField() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Country>(defaultCountry);
  const rootRef = useRef<HTMLDivElement>(null);
  const prefixRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return countries;
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(needle) ||
        country.dial.includes(needle.replace(/^\+/, "")) ||
        country.iso.toLowerCase().includes(needle),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        prefixRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(country: Country) {
    setSelected(country);
    setOpen(false);
    setQuery("");
    prefixRef.current?.focus();
  }

  return (
    <div ref={rootRef} className="phone">
      <input type="hidden" name="dial" value={selected.dial} />
      <button
        ref={prefixRef}
        type="button"
        className="phone__prefix"
        aria-label={`Country code, ${selected.name} +${selected.dial}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="phone__flag" aria-hidden="true">
          {countryFlag(selected.iso)}
        </span>
        <span className="nums" aria-hidden="true">
          +{selected.dial}
        </span>
      </button>
      <input id="field-phone" name="phone" type="tel" autoComplete="tel-national" className="field__input phone__number" placeholder="XXXX XXXX" />
      {open ? (
        <div id={menuId} className="phone__menu">
          <input
            className="phone__search"
            value={query}
            placeholder="Search country"
            aria-label="Search country"
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
          />
          {/* A plain list of buttons: Tab moves between options, Enter or Space picks one. */}
          <ul className="phone__list" aria-label="Country code">
            {matches.map((country) => (
              <li key={country.iso}>
                <button
                  type="button"
                  aria-pressed={country.iso === selected.iso}
                  className="phone__option"
                  onClick={() => choose(country)}
                >
                  <span aria-hidden="true">{countryFlag(country.iso)}</span>
                  <span>{country.name}</span>
                  <span className="nums">+{country.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
