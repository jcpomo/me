"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  titleEn: string;
  titleDe: string;
  email: string;
  phone: string;
  location: string;
  summaryEn: string;
  summaryDe: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  photoUrl: string | null;
}

export default function AdminProfilePage() {
  const t = useTranslations("admin");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (res.ok) {
      setMessage(t("saved"));
    }
    setSaving(false);
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    fetch("/api/upload", { method: "POST", body: formData })
      .then((r) => r.json())
      .then((data) => {
        if (data.photoUrl && profile) {
          setProfile({ ...profile, photoUrl: data.photoUrl });
          setMessage("Photo updated!");
        }
      });
  }

  if (!profile) {
    return <p className="text-muted">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">{t("profile")}</h1>

      {message && (
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200 mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Photo
          </label>
          <div className="flex items-center gap-4">
            {profile.photoUrl && (
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoUpload}
              className="text-sm"
            />
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              First Name
            </label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Title EN/DE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Title (EN)
            </label>
            <input
              type="text"
              value={profile.titleEn}
              onChange={(e) =>
                setProfile({ ...profile, titleEn: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Title (DE)
            </label>
            <input
              type="text"
              value={profile.titleDe}
              onChange={(e) =>
                setProfile({ ...profile, titleDe: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Location
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Summary EN/DE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Summary (EN)
            </label>
            <textarea
              rows={6}
              value={profile.summaryEn}
              onChange={(e) =>
                setProfile({ ...profile, summaryEn: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Summary (DE)
            </label>
            <textarea
              rows={6}
              value={profile.summaryDe}
              onChange={(e) =>
                setProfile({ ...profile, summaryDe: e.target.value })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Social links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={profile.linkedinUrl || ""}
              onChange={(e) =>
                setProfile({ ...profile, linkedinUrl: e.target.value || null })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={profile.githubUrl || ""}
              onChange={(e) =>
                setProfile({ ...profile, githubUrl: e.target.value || null })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Website URL
            </label>
            <input
              type="url"
              value={profile.websiteUrl || ""}
              onChange={(e) =>
                setProfile({ ...profile, websiteUrl: e.target.value || null })
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-light transition-colors font-medium disabled:opacity-50"
        >
          {saving ? "..." : t("save")}
        </button>
      </form>
    </div>
  );
}
