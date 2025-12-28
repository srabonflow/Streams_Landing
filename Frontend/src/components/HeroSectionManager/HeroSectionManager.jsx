import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import EditHeroModal from "../EditHeroModal/EditHeroModal";

const emptyCard = () => ({
  badge: "",
  description: "",
  price: "",
  duration: "",
  note: "",
  ctaText: "Get Both Now",
});

const emptyHero = () => ({
  title: "",
  subtitle: "",
  imageUrl: "",
  cards: [emptyCard(), emptyCard()],
});

const HeroSectionManager = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [newHero, setNewHero] = useState(emptyHero());
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //Load heroes on mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/hero/landing");
        setHeroSections(res.data || []);
      } catch (e) {
        console.log(e);
        setErrMsg(e?.response?.data?.message || "Failed to load hero sections");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Add new hero
  const handleAddHero = async () => {
    setErrMsg("");

    if (!newHero.title || !newHero.imageUrl) {
      setErrMsg("Title and Image URL are required.");
      return;
    }

    try {
      setSaving(true);

      const payload = { ...newHero };

      const res = await api.post("/hero/landing", payload);
      const created = res.data;

      setHeroSections((prev) => [created, ...prev]);
      setNewHero(emptyHero());
      setIsAdding(false);
    } catch (e) {
      console.log(e);
      setErrMsg(e?.response?.data?.message || "Failed to add hero section");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHero = async (id) => {
    setErrMsg("");
    try {
      await api.delete(`/hero/landing/${id}`);
      setHeroSections((prev) =>
        prev.filter((h) => h._id !== id && h.id !== id)
      );
    } catch (e) {
      console.log(e);
      setErrMsg(e?.response?.data?.message || "Failed to delete hero");
    }
  };

  const updateNewHeroCardField = (index, field, value) => {
    setNewHero((prev) => {
      const cards = [...(prev.cards || [emptyCard(), emptyCard()])];

      while (cards.length < 2) cards.push(emptyCard());

      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, cards };
    });
  };

  const handleUpdateHero = async (updated) => {
  setErrMsg("");
  try {
    setSaving(true);

    const id = updated._id || updated.id;
    const res = await api.put(`/hero/landing/${id}`, updated);
    const savedHero = res.data;

    setHeroSections((prev) =>
      prev.map((h) => (h._id === savedHero._id ? savedHero : h))
    );

    closeEdit();
  } catch (e) {
    console.log(e);
    setErrMsg(e?.response?.data?.message || "Failed to update hero");
  } finally {
    setSaving(false);
  }
};

  const openEdit = (hero) => {
    setSelectedHero(hero);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedHero(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Hero Section Manager
              </h1>
              <p className="text-gray-600">
                Manage hero sections for landing page
              </p>
            </div>

            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow w-full sm:w-auto"
            >
              + Add Hero Section
            </button>
          </div>
        </div>

        {/* Error */}
        {errMsg && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700 text-sm">
            {errMsg}
          </div>
        )}

        {/* Add Form */}
        {isAdding && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Add New Hero
              </h2>
              <button
                onClick={() => setIsAdding(false)}
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
                    value={newHero.title}
                    onChange={(e) =>
                      setNewHero({ ...newHero, title: e.target.value })
                    }
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
                    value={newHero.subtitle}
                    onChange={(e) =>
                      setNewHero({ ...newHero, subtitle: e.target.value })
                    }
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
                  value={newHero.imageUrl}
                  onChange={(e) =>
                    setNewHero({ ...newHero, imageUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="https://example.com/hero-image.jpg"
                />
              </div>

              {/* Cards Inputs */}
              {/* Cards Inputs */}
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-gray-800">
                  Pricing Cards
                </h3>

                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-semibold text-gray-700 mb-3">
                      Card {i + 1}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Badge Text
                        </label>
                        <input
                          type="text"
                          value={newHero.cards?.[i]?.badge || ""}
                          onChange={(e) =>
                            updateNewHeroCardField(i, "badge", e.target.value)
                          }
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
                          value={newHero.cards?.[i]?.description || ""}
                          onChange={(e) =>
                            updateNewHeroCardField(
                              i,
                              "description",
                              e.target.value
                            )
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
                          value={newHero.cards?.[i]?.price || ""}
                          onChange={(e) =>
                            updateNewHeroCardField(i, "price", e.target.value)
                          }
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
                          value={newHero.cards?.[i]?.duration || ""}
                          onChange={(e) =>
                            updateNewHeroCardField(
                              i,
                              "duration",
                              e.target.value
                            )
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
                          value={newHero.cards?.[i]?.note || ""}
                          onChange={(e) =>
                            updateNewHeroCardField(i, "note", e.target.value)
                          }
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
                          value={newHero.cards?.[i]?.ctaText || "Get Both Now"}
                          onChange={(e) =>
                            updateNewHeroCardField(i, "ctaText", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Get Both Now"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleAddHero}
                  disabled={saving || !newHero.title || !newHero.imageUrl}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Hero Section"}
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Note: The first hero will be Active by default.
              </p>
            </div>
          </div>
        )}

        {isEditOpen && (
          <EditHeroModal
            open={isEditOpen}
            hero={selectedHero}
            saving={saving}
            onClose={closeEdit}
            onSave={handleUpdateHero}
          />
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              All Hero Sections ({heroSections.length})
            </h2>
            {loading && (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
          </div>

          {heroSections.length === 0 ? (
            <div className="text-center py-12 px-4 text-gray-500">
              No hero sections yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase">
                      Preview
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase">
                      Title & Details
                    </th>

                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase">
                      View
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {heroSections.map((hero) => {
                    return (
                      <tr key={hero?._id} className="hover:bg-gray-50">
                        {/* Preview */}
                        <td className="py-3 px-4">
                          <div className="relative w-24 h-16 bg-gray-100 rounded overflow-hidden border border-gray-300">
                            <img
                              src={hero.imageUrl}
                              alt={hero.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Title & Details */}
                        <td className="py-3 px-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {hero.title}
                            </h3>
                            {hero.subtitle && (
                              <p className="text-sm text-gray-600 line-clamp-1">
                                {hero.subtitle}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <a
                            href={`${import.meta.env.VITE_DOMAIN}/${hero.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                          >
                            Preview
                          </a>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEdit(hero)}
                              className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDeleteHero(hero?._id)}
                              className="px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSectionManager;
