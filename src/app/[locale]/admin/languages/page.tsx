"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface LanguageData {
  id: string;
  nameEn: string;
  nameDe: string;
  levelEn: string;
  levelDe: string;
  cefrLevel: string | null;
  sortOrder: number;
}

const emptyForm = {
  nameEn: "", nameDe: "", levelEn: "", levelDe: "", cefrLevel: "", sortOrder: 0,
};

export default function AdminLanguagesPage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<LanguageData[]>([]);
  const [editing, setEditing] = useState<LanguageData | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const data = await (await fetch("/api/languages")).json();
    setItems(data);
  }

  function startEdit(item: LanguageData) {
    setEditing(item);
    setForm({
      nameEn: item.nameEn, nameDe: item.nameDe,
      levelEn: item.levelEn, levelDe: item.levelDe,
      cefrLevel: item.cefrLevel || "", sortOrder: item.sortOrder,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/languages/${editing.id}` : "/api/languages";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { setMessage(t("saved")); setShowForm(false); setEditing(null); loadData(); }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    await fetch(`/api/languages/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("languages")}</h1>
        <button onClick={() => { setEditing(null); setForm({...emptyForm, sortOrder: items.length}); setShowForm(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium">{t("add")}</button>
      </div>

      {message && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200 mb-4">{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-border mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Language (EN)</label>
              <input type="text" value={form.nameEn} onChange={(e) => setForm({...form, nameEn: e.target.value})} required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language (DE)</label>
              <input type="text" value={form.nameDe} onChange={(e) => setForm({...form, nameDe: e.target.value})} required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Level (EN)</label>
              <input type="text" value={form.levelEn} onChange={(e) => setForm({...form, levelEn: e.target.value})} required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level (DE)</label>
              <input type="text" value={form.levelDe} onChange={(e) => setForm({...form, levelDe: e.target.value})} required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CEFR Level</label>
              <input type="text" value={form.cefrLevel} onChange={(e) => setForm({...form, cefrLevel: e.target.value})}
                placeholder="C2, C1, B2..." className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
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
              <p className="font-medium text-foreground">{item.nameEn} / {item.nameDe}</p>
              <p className="text-sm text-muted">{item.levelEn} {item.cefrLevel ? `(${item.cefrLevel})` : ""}</p>
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
