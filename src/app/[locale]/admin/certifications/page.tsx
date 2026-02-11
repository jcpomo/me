"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface CertData {
  id: string;
  nameEn: string;
  nameDe: string;
  issuer: string | null;
  credentialUrl: string | null;
  sortOrder: number;
}

const emptyForm = {
  nameEn: "", nameDe: "", issuer: "", credentialUrl: "", sortOrder: 0,
};

export default function AdminCertificationsPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<CertData[]>([]);
  const [editing, setEditing] = useState<CertData | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const data = await (await fetch("/api/certifications")).json();
    setItems(data);
  }

  function startEdit(item: CertData) {
    setEditing(item);
    setForm({
      nameEn: item.nameEn, nameDe: item.nameDe,
      issuer: item.issuer || "", credentialUrl: item.credentialUrl || "",
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/certifications/${editing.id}` : "/api/certifications";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { setMessage(t("saved")); setShowForm(false); setEditing(null); loadData(); }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    await fetch(`/api/certifications/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("certifications")}</h1>
        <button onClick={() => { setEditing(null); setForm({...emptyForm, sortOrder: items.length}); setShowForm(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">{t("add")}</button>
      </div>

      {message && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200 mb-4">{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-border mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name (EN)</label>
              <input type="text" value={form.nameEn} onChange={(e) => setForm({...form, nameEn: e.target.value})} required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name (DE)</label>
              <input type="text" value={form.nameDe} onChange={(e) => setForm({...form, nameDe: e.target.value})} required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Issuer</label>
              <input type="text" value={form.issuer} onChange={(e) => setForm({...form, issuer: e.target.value})}
                placeholder="e.g. Udemy" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Credential URL</label>
              <input type="url" value={form.credentialUrl} onChange={(e) => setForm({...form, credentialUrl: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({...form, sortOrder: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">{t("save")}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
              className="border border-border px-4 py-2 rounded-lg hover:bg-card transition-colors text-sm">{t("cancel")}</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-3 border border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.nameEn}</p>
              {item.issuer && <p className="text-xs text-muted">{item.issuer}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="text-primary hover:text-primary-light text-sm font-medium">{t("edit")}</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-600 text-sm font-medium">{t("delete")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
