export function localized<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: string
): string {
  const key = `${field}${locale === "de" ? "De" : "En"}`;
  return (item[key] as string) ?? (item[`${field}En`] as string) ?? "";
}

export function formatDateRange(
  startDate: Date,
  endDate: Date | null,
  locale: string
): string {
  const formatter = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "short",
  });
  const start = formatter.format(new Date(startDate));
  if (!endDate) {
    return `${start} - ${locale === "de" ? "Heute" : "Present"}`;
  }
  const end = formatter.format(new Date(endDate));
  return `${start} - ${end}`;
}
