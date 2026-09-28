type Item = string | { label: string; detail?: string };

export function IncludedList({ items }: { items: Item[] }) {
  const rows = items.map((item) => (typeof item === "string" ? { label: item } : item));

  return (
    <ul className="included" role="list">
      {rows.map((item) => (
        <li key={item.label} className="included__row">
          <span className="included__title">{item.label}</span>
          {item.detail ? <span className="included__detail">{item.detail}</span> : null}
        </li>
      ))}
    </ul>
  );
}
