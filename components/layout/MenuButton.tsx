export function MenuButton({ open, onClick, controlsId }: { open: boolean; onClick: () => void; controlsId: string }) {
  return (
    <button
      type="button"
      className="menu-btn"
      data-open={open}
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls={controlsId}
    >
      <svg className="menu-btn__glyph menu-btn__glyph--menu" viewBox="0 0 28 16" width="28" height="16" aria-hidden="true" focusable="false">
        <rect className="mb-top" x="0" y="2" width="28" height="2" />
        <rect className="mb-bot" x="12" y="12" width="16" height="2" />
        <rect className="mb-dot" x="0" y="11" width="4" height="4" />
      </svg>
      <svg className="menu-btn__glyph menu-btn__glyph--close" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false">
        <path d="M2 2 L18 18 M18 2 L2 18" />
      </svg>
    </button>
  );
}
