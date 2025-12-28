import { useEffect, useState } from "react";

const emptyCard = () => ({
  badge: "",
  description: "",
  price: "",
  duration: "",
  note: "",
  ctaText: "Get Both Now",
});

const normalizeHeroForEdit = (hero) => ({
  ...hero,
  title: hero?.title || "",
  subtitle: hero?.subtitle || "",
  imageUrl: hero?.imageUrl || "",
  cards:
    Array.isArray(hero?.cards) && hero.cards.length
      ? [
          { ...emptyCard(), ...(hero.cards[0] || {}) },
          { ...emptyCard(), ...(hero.cards[1] || {}) },
        ]
      : [emptyCard(), emptyCard()],
});

export default function EditHeroModal({
  open,
  hero,
  saving,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => normalizeHeroForEdit(hero));

  // when hero changes (open a different hero), reset form
  useEffect(() => {
    if (open) {
      setForm(normalizeHeroForEdit(hero));
    }
  }, [open, hero]);

  if (!open) return null;

  const updateCardField = (index, field, value) => {
    setForm((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, cards };
    });
  };

  const handleSubmit = () => {
    if (!form.title || !form.imageUrl) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* modal */}
      <div className="relative bg-white w-[95%] max-w-3xl rounded-xl shadow-xl border border-gray-200 p-5 md:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Hero</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter hero title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter subtitle"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://example.com/hero-image.jpg"
            />
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-800">Pricing Cards</h3>

            {[0, 1].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-700 mb-3">Card {i + 1}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={form.cards?.[i]?.badge || ""}
                      onChange={(e) => updateCardField(i, "badge", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="NFL STREAM + Other Games"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={form.cards?.[i]?.description || ""}
                      onChange={(e) =>
                        updateCardField(i, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Stream NFL Season + Other Games"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.cards?.[i]?.price || ""}
                      onChange={(e) => updateCardField(i, "price", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="24.66"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={form.cards?.[i]?.duration || ""}
                      onChange={(e) =>
                        updateCardField(i, "duration", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Monthly/30days"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note
                    </label>
                    <input
                      type="text"
                      value={form.cards?.[i]?.note || ""}
                      onChange={(e) => updateCardField(i, "note", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="No Auto change No Auto renew"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Button Text (optional)
                    </label>
                    <input
                      type="text"
                      value={form.cards?.[i]?.ctaText || "Get Both Now"}
                      onChange={(e) =>
                        updateCardField(i, "ctaText", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Get Both Now"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSubmit}
              disabled={saving || !form.title || !form.imageUrl}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Hero"}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
