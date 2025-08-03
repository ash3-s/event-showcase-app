"use client";

import { useUser, RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TierCard from "@/app/_components/TierCard";
import { PostAPIHandler } from "../_utils/api";

const TIERS = [
    { id: "free", name: "Free", price: 0, description: "Basic access" },
    { id: "silver", name: "Silver", price: 9, description: "Everything Free + bonus events" },
    { id: "gold", name: "Gold", price: 19, description: "Silver + premium events" },
    { id: "platinum", name: "Platinum", price: 49, description: "All events + VIP support" },
];

export default function UpgradePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [currentTier, setCurrentTier] = useState<string | undefined>(undefined);
    const [loadingTier, setLoadingTier] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded || !user) return;
        (async () => {
            await user.reload();
            setCurrentTier(user.publicMetadata.tier as string | undefined);
        })();
    }, [isLoaded, user]);




    const selectTier = async (tier: string) => {
        setLoadingTier(tier);
        const payload = { tier };
        const response = await PostAPIHandler("/api/set-tier", payload);
        if (!response || !response.ok) {
            console.error("Failed to set tier");
            throw new Error("Failed to set tier");
        }
        setLoadingTier(null);
        router.push("/dashboard");
    };


    return (
        <>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/" />
            </SignedOut>

            <SignedIn>
                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-black via-gray-900 to-black shadow-md">
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">Upgrade Plan</h1>
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-xl hover:opacity-90 transition shadow-md"
                            onClick={() => router.push("/dashboard")}
                        >
                            Dashboard
                        </button>
                        <UserButton />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto py-12 px-6">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Choose Your Plan</h2>
                    <p className="text-center text-gray-500 mb-10">
                        Select a plan that fits your needs and get started.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {TIERS.map((t) => (
                            <div
                                key={t.id}
                                className={`relative backdrop-blur-md bg-white/60 border ${currentTier === t.id
                                        ? 'border-blue-500'
                                        : 'border-gray-200'
                                    } rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center text-center transition`}
                            >
                                {currentTier === t.id && (
                                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                        Current Plan
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                                <p className="text-3xl font-extrabold text-gray-900 mb-4">${t.price}</p>
                                <p className="text-gray-700 mb-6">{t.description}</p>

                                <button
                                    className={`w-full py-2 rounded-xl font-semibold transition ${currentTier === t.id
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                                        }`}
                                    onClick={() => selectTier(t.id)}
                                    disabled={loadingTier != null || currentTier === t.id}
                                >
                                    {loadingTier === t.id ? 'Processing...' : currentTier === t.id ? 'Selected' : 'Select Plan'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </SignedIn>
        </>

    );
}
