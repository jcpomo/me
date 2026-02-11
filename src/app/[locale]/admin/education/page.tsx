"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface EducationData {
  id: string;
  institutionEn: string;
  institutionDe: string;
  degreeEn: string;
  degreeDe: string;
  fieldOfStudyEn: string;
  fieldOfStudyDe: string;
  locationEn: string;
  locationDe: string;
  startDate: string;
  endDate: string | null;
  descriptionEn: string | null;
  descriptionDe: string | null;
  sortOrder: number;
}

const emptyForm = {
  institutionEn: "", institutionDe: "", degreeEn: "", degreeDe: "",
  fieldOfStudyEn: "", fieldOfStudyDe: "", locationEn: "", locationDe: "",
  startDate: "", endDate: null as string | null,
  descriptionEn: "", descriptionDe: "", sortOrder: 0,
};

export default function AdminEducationPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<EducationData[]>([]);
  const [editing, setEditing] = useState<EducationData | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const data = await (await fetch("/api/education")).json();
    setItems(data);
  }

  function startEdit(item: EducationData) {
    setEditing(item);
    setForm({
      institutionEn: item.institutionEn, institutionDe: item.institutionDe,
      degreeEn: item.degreeEn, degreeDe: item.degreeDe,
      fieldOfStudyEn: item.fieldOfStudyEn, fieldOfStudyDe: item.fieldOfStudyDe,
      locationEn: item.locationEn, locationDe: item.locationDe,
      startDate: item.startDate.split("T")[0],
      endDate: item.endDate ? item.endDate.split("T")[0] : null,
      descriptionEn: item.descriptionEn || "", descriptionDe: item.descriptionDe || "",
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/education/${editing.id}` : "/api/education";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { setMessage(t("saved")); setShowForm(false); setEditing(null); loadData(); }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    await fetch(`/api/education/${id}`, { method: "DELETE" });
    loadData();
  }

  const Field = ({ label, value, onChange, type = "text", required = false, rows }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; rows?: number;
  }) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} required={required}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("education")}</h1>
        <button onClick={() => { setEditing(null); setForm({...emptyForm, sortOrder: items.length}); setShowForm(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">{t("add")}</button>
      </div>

      {message && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200 mb-4">{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-border mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Institution (EN)" value={form.institutionEn} onChange={(v) => setForm({...form, institutionEn: v})} required />
            <Field label="Institution (DE)" value={form.institutionDe} onChange={(v) => setForm({...form, institutionDe: v})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Degree (EN)" value={form.degreeEn} onChange={(v) => setForm({...form, degreeEn: v})} required />
            <Field label="Degree (DE)" value={form.degreeDe} onChange={(v) => setForm({...form, degreeDe: v})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Field of Study (EN)" value={form.fieldOfStudyEn} onChange={(v) => setForm({...form, fieldOfStudyEn: v})} required />
            <Field label="Field of Study (DE)" value={form.fieldOfStudyDe} onChange={(v) => setForm({...form, fieldOfStudyDe: v})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Location (EN)" value={form.locationEn} onChange={(v) => setForm({...form, locationEn: v})} required />
            <Field label="Location (DE)" value={form.locationDe} onChange={(v) => setForm({...form, locationDe: v})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Start Date" value={form.startDate} onChange={(v) => setForm({...form, startDate: v})} type="date" required />
            <Field label="End Date" value={form.endDate || ""} onChange={(v) => setForm({...form, endDate: v || null})} type="date" />
            <Field label="Sort Order" value={String(form.sortOrder)} onChange={(v) => setForm({...form, sortOrder: parseInt(v) || 0})} type="number" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Description (EN)" value={form.descriptionEn || ""} onChange={(v) => setForm({...form, descriptionEn: v})} rows={4} />
            <Field label="Description (DE)" value={form.descriptionDe || ""} onChange={(v) => setForm({...form, descriptionDe: v})} rows={4} />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">{t("save")}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
              className="border border-border px-4 py-2 rounded-lg hover:bg-card transition-colors text-sm">{t("cancel")}</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 border border-border flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{item.degreeEn}</p>
              <p className="text-sm text-muted">{item.institutionEn}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-primary hover:text-primary-light text-sm font-medium">{t("edit")}</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">{t("delete")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
