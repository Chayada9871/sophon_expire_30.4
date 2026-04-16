export function formatDate(dateString) {
  if (!dateString) return "-";

  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return String(dateString);

  return d.toLocaleDateString("th-TH");
}

export function formatShortDate(dateString) {
  if (!dateString) return "-";

  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit" });
}

export function formatQtyCompact(value) {
  const num = Number(value ?? 0);
  if (Number.isNaN(num)) return "0";

  return new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2
  }).format(num);
}
