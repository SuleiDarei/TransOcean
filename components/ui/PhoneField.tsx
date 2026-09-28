"use client";

import { countries, countryFlag, defaultCountry, type Country } from "@/lib/phone/countries";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export function PhoneField() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Country>(defaultCountry);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchId = useId();

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
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="phone">
      <input type="hidden" name="dial" value={selected.dial} />
      <button
        type="button"
        className="phone__prefix"
        aria-expanded={open}
        aria-controls={searchId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="phone__flag" aria-hidden="true">
          {countryFlag(selected.iso)}
        </span>
        <span className="nums">+{selected.dial}</span>
      </button>
      <input id="field-phone" name="phone" type="tel" autoComplete="tel-national" className="field__input phone__number" placeholder="XXXX XXXX" />
      {open ? (
        <div className="phone__menu">
          <input
            id={searchId}
            className="phone__search"
            value={query}
            placeholder="Search country"
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul className="phone__list" role="listbox" aria-label="Country code">
            {matches.map((country) => (
              <li key={country.iso}>
                <button
                  type="button"
                  role="option"
                  aria-selected={country.iso === selected.iso}
                  className="phone__option"
                  onClick={() => {
                    setSelected(country);
                    setOpen(false);
                    setQuery("");
                  }}
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
