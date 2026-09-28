import { ph } from "./placeholder";

const pending = "Legal text pending client counsel. PLACEHOLDER.";

export const legal = {
  banner: "Legal text pending client counsel.",
  privacy: {
    title: "Privacy",
    sections: [
      { heading: "Who we are", body: pending },
      { heading: "What we collect", body: pending },
      { heading: "Why we collect it", body: pending },
      { heading: "How long we keep it", body: pending },
      { heading: "Your rights", body: pending },
      { heading: "Contact", body: pending },
    ],
  },
  terms: {
    title: "Terms",
    sections: [
      { heading: "Use of this website", body: pending },
      { heading: "Content", body: pending },
      { heading: "Liability", body: pending },
      { heading: "Governing law", body: pending },
      { heading: "Contact", body: pending },
    ],
  },
  meta: ph("Legal pages await client counsel. TODO(CLIENT)"),
};
