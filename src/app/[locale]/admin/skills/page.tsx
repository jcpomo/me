"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  categoryId: string;
  sortOrder: number;
}

interface Category {
  id: string;
  nameEn: string;
  nameDe: string;
  sortOrder: number;
  skills: Skill[];
}

export default function AdminSkillsPage() {
  const t = useTranslations("admin");
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatNameEn, setNewCatNameEn] = useState("");
  const [newCatNameDe, setNewCatNameDe] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCatId, setNewSkillCatId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const data = await (await fetch("/api/skill-categories")).json();
    setCategories(data);
  }

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatNameEn) return;
    await fetch("/api/skill-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameEn: newCatNameEn, nameDe: newCatNameDe || newCatNameEn, sortOrder: categories.length }),
    });
    setNewCatNameEn(""); setNewCatNameDe("");
    setMessage(t("saved"));
    loadData();
  }

  async function addSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!newSkillName || !newSkillCatId) return;
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSkillName, categoryId: newSkillCatId, proficiency: 80 }),
    });
    setNewSkillName("");
    setMessage(t("saved"));
    loadData();
  }

  async function deleteSkill(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    loadData();
  }

  async function deleteCategory(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    await fetch(`/api/skill-categories/${id}`, { method: "DELETE" });
    loadData();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">{t("skills")}</h1>

      {message && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200 mb-4">{message}</div>}

      {/* Add Category */}
      <form onSubmit={addCategory} className="bg-white rounded-lg p-4 border border-border mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium mb-1">Category Name (EN)</label>
          <input type="text" value={newCatNameEn} onChange={(e) => setNewCatNameEn(e.target.value)}
            placeholder="e.g. Frontend" className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Category Name (DE)</label>
          <input type="text" value={newCatNameDe} onChange={(e) => setNewCatNameDe(e.target.value)}
            placeholder="e.g. Frontend" className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light text-sm font-medium">Add Category</button>
      </form>

      {/* Add Skill */}
      <form onSubmit={addSkill} className="bg-white rounded-lg p-4 border border-border mb-6 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium mb-1">Skill Name</label>
          <input type="text" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g. React" className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Category</label>
          <select value={newSkillCatId} onChange={(e) => setNewSkillCatId(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">Select...</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.nameEn}</option>)}
          </select>
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light text-sm font-medium">Add Skill</button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{cat.nameEn} / {cat.nameDe}</h3>
              <button onClick={() => deleteCategory(cat.id)} className="text-red-500 hover:text-red-600 text-xs">{t("delete")}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span key={skill.id} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                  {skill.name}
                  <button onClick={() => deleteSkill(skill.id)} className="ml-1 text-red-400 hover:text-red-600">&times;</button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
