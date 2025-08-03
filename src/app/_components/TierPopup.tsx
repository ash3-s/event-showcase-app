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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white text-black rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Choose Your Tier</h2>
                <div className="grid  grid-cols-2 gap-3 border-black">
                    {tiers.map((t) => (
                        <button
                            key={t}
                            disabled={loading}
                            onClick={() => chooseTier(t)}
                            className="py-2 px-4 border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
