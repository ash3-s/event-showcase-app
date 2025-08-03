"use client";

import { SignedOut, SignedIn, RedirectToSignIn, useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TierPopup from "@/app/_components/TierPopup";
import { GetAPIHandler } from "../_utils/api";

export default function DashboardPage() {
    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();
    const [events, setEvents] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(true);
    const [readyToFetch, setReadyToFetch] = useState(false);

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
            const token = await getToken();
            const res = await GetAPIHandler("/api/events")
            if (!res || !res.ok) {
                console.error("Failed to fetch events");
                return;
            }
            const payload = await res.json();
            setEvents(payload.events ?? payload);
        })();
    }, [readyToFetch, getToken]);

    const handleTierChosen = () => {
        setShowPopup(false);
        setReadyToFetch(true);
    };

    return (
        <>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/" />
            </SignedOut>

            <SignedIn>
                {showPopup && <TierPopup onTierChosen={handleTierChosen} />}

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    {events.length === 0 ? (
                        <p>No events to show.</p>
                    ) : (
                        <ul className="space-y-2">
                            {events.map((evt: any) => (
                                <li key={evt.id} className="border p-4 rounded">
                                    <h2 className="font-semibold">{evt.title}</h2>
                                    <p>{evt.description}</p>
                                    <small>Tier: {evt.tier}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </SignedIn>
        </>
    );
}
