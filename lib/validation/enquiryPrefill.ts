import { contactContent } from "@/content/contact";
import { services } from "@/content/services";

export function enquiryPrefill(params: URLSearchParams) {
  const port = params.get("port") ?? "";
  const arrival = params.get("arrival") ?? "";
  const service = services.find((item) => item.slug === params.get("service"));
  const date = /^\d{4}-\d{2}-\d{2}$/.test(arrival) ? new Date(`${arrival}T00:00:00Z`) : null;
  return {
    vessel: (params.get("vessel") ?? "").slice(0, 200),
    port: contactContent.ports.includes(port) ? port : "",
    arrival: date && !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === arrival ? arrival : "",
    service: service?.name ?? "",
  };
}
