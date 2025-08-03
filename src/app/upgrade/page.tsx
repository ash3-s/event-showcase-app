"use client";

import { useUser, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
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
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TIERS.map((t) => (
                            <TierCard
                                key={t.id}
                                id={t.id}
                                name={t.name}
                                price={t.price}
                                description={t.description}
                                isCurrent={currentTier === t.id}
                                onSelect={selectTier}
                                disabled={loadingTier != null}
                            />
                        ))}
                    </div>
                </div>
            </SignedIn>
        </>
    );
}
