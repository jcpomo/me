"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface ExperienceData {
  id: string;
  companyName: string;
  positionEn: string;
  positionDe: string;
  locationEn: string;
  locationDe: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  descriptionEn: string;
  descriptionDe: string;
  sortOrder: number;
}

const emptyForm: Omit<ExperienceData, "id"> = {
  companyName: "",
  positionEn: "",
  positionDe: "",
  locationEn: "",
  locationDe: "",
  startDate: "",
  endDate: null,
  isCurrent: false,
  descriptionEn: "",
  descriptionDe: "",
  sortOrder: 0,
};

export default function AdminExperiencePage() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<ExperienceData[]>([]);
  const [editing, setEditing] = useState<ExperienceData | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetch("/api/experience");
    const data = await res.json();
    setItems(data);
  }

  function startEdit(item: ExperienceData) {
    setEditing(item);
    setForm({
      companyName: item.companyName,
      positionEn: item.positionEn,
      positionDe: item.positionDe,
      locationEn: item.locationEn,
      locationDe: item.locationDe,
      startDate: item.startDate.split("T")[0],
      endDate: item.endDate ? item.endDate.split("T")[0] : null,
      isCurrent: item.isCurrent,
      descriptionEn: item.descriptionEn,
      descriptionDe: item.descriptionDe,
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
  }

  function startNew() {
    setEditing(null);
    setForm({ ...emptyForm, sortOrder: items.length });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const url = editing ? `/api/experience/${editing.id}` : "/api/experience";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage(t("saved"));
      setShowForm(false);
      setEditing(null);
      loadData();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("experience")}</h1>
        <button
          onClick={startNew}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium"
        >
          {t("add")}
        </button>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200 mb-4">
          {message}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 border border-border mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Position (EN)</label>
              <input
                type="text"
                value={form.positionEn}
                onChange={(e) => setForm({ ...form, positionEn: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position (DE)</label>
              <input
                type="text"
                value={form.positionDe}
                onChange={(e) => setForm({ ...form, positionDe: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location (EN)</label>
              <input
                type="text"
                value={form.locationEn}
                onChange={(e) => setForm({ ...form, locationEn: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location (DE)</label>
              <input
                type="text"
                value={form.locationDe}
                onChange={(e) => setForm({ ...form, locationDe: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={form.endDate || ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value || null })}
                disabled={form.isCurrent}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isCurrent}
                  onChange={(e) => setForm({ ...form, isCurrent: e.target.checked, endDate: e.target.checked ? null : form.endDate })}
                  className="rounded"
                />
                <span className="text-sm">Current position</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (EN)</label>
              <textarea
                rows={4}
                value={form.descriptionEn}
                onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (DE)</label>
              <textarea
                rows={4}
                value={form.descriptionDe}
                onChange={(e) => setForm({ ...form, descriptionDe: e.target.value })}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium"
            >
              {t("save")}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditing(null); }}
              className="border border-border px-4 py-2 rounded-lg hover:bg-card transition-colors text-sm"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 border border-border flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-foreground">{item.positionEn}</p>
              <p className="text-sm text-muted">{item.companyName} &middot; {item.startDate.split("T")[0]}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(item)}
                className="text-primary hover:text-primary-light text-sm font-medium"
              >
                {t("edit")}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
