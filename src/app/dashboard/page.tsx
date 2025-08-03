"use client";

import { SignedOut, SignedIn, RedirectToSignIn, useUser, useAuth, UserButton } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import TierPopup from "@/app/_components/TierPopup";
import { GetAPIHandler } from "../_utils/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();
    const [events, setEvents] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(true);
    const [currentTier, setCurrentTier] = useState<string | undefined>(undefined);
    const [readyToFetch, setReadyToFetch] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;
        if (user?.publicMetadata?.tier) {
            setShowPopup(false);
            setReadyToFetch(true);
        }
    }, [isLoaded, user]);

    useEffect(() => {
        if (!readyToFetch) return;
        (async () => {
            await user?.reload();
            setCurrentTier(user?.publicMetadata.tier as string | undefined);
        })();
        (async () => {
            const res = await GetAPIHandler("/api/events")
            if (!res || !res.ok) {
                console.error("Failed to fetch events");
                return;
            }
            const payload = await res.json();
            setEvents(payload.events ?? payload);
        })();
        setCurrentTier(user?.publicMetadata.tier as string);
    }, [readyToFetch, getToken]);

    const handleTierChosen = () => {
        setShowPopup(false);
        setReadyToFetch(true);
    };

    const navigateToUpgrade = () => {
        router.push("/upgrade");
    };
    return (
        <>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/" />
            </SignedOut>

            <SignedIn>
                {showPopup && <TierPopup onTierChosen={handleTierChosen} />}

                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-black via-gray-900 to-gray-950 shadow-md">
                    <h1 className="text-3xl font-extrabold text-white">Event Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-xl hover:opacity-90 transition shadow-md"
                            onClick={navigateToUpgrade}
                        >
                            Upgrade Plan
                        </button>
                        <UserButton />
                    </div>
                </div>

                <div className="p-8 bg-gray-100 min-h-screen">
                    <div className="flex items-center mb-6 gap-2">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Events</h2>
                        <div className="text-sm text-white bg-blue-600 opacity-88 rounded-2xl px-2">
                            <span className="font-semibold">{String(currentTier || "Not set")}</span>
                        </div>
                    </div>

                    {events.length === 0 ? (
                        <div className="text-center text-gray-500 italic">No events to display yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((evt: any) => (
                                <div
                                    key={evt.id}
                                    className="backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{evt.title}</h3>
                                    <p className="text-gray-700 mb-4">{evt.description}</p>
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                        Tier: {evt.tier}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SignedIn>
        </>
    );
}
