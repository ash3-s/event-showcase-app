"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { PostAPIHandler } from "../_utils/api";

interface TierPopupProps {
    onTierChosen: () => void;
}

export default function TierPopup({ onTierChosen }: TierPopupProps) {
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(false);

    if (!isLoaded) return null;

    const currentTier = user?.publicMetadata?.tier as string | undefined;
    if (currentTier) return null;

    const tiers = ["free", "silver", "gold", "platinum"];

    const chooseTier = async (tier: string) => {
        setLoading(true);
        const payload = { tier };
        const response = await PostAPIHandler("/api/set-tier", payload);
        if (!response || !response.ok) {
            console.error("Failed to set tier");
            throw new Error("Failed to set tier");
        }
        setLoading(false);
        onTierChosen();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl p-8 max-w-md w-full shadow-xl animate-fadeInUp">
                <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-600">
                    Choose Your Plan
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {tiers.map((t) => (
                        <button
                            key={t}
                            disabled={loading}
                            onClick={() => chooseTier(t)}
                            className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 active:scale-100 transition disabled:opacity-50 shadow-md"
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
