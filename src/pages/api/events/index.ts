import { NextApiRequest, NextApiResponse } from "next";
import { createSupabaseClient } from "@/lib/SupabaseClient";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

type tierType = "free" | "silver" | "gold" | "platinum";
export default async function GetEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //check if the user is authenticated using clerk
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const eventPriority: Record<string, number> = {
      free: 0,
      silver: 1,
      gold: 2,
      platinum: 3,
    };
    try {
      //get the user's tier from clerk
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(userId);
      const tier = user.publicMetadata.tier as tierType;
      if (!tier || !(tier in eventPriority)) {
        return res.status(400).json({ error: "Invalid user tier" });
      }
      const supabase = createSupabaseClient(req);
      if (!supabase) {
        return res
          .status(500)
          .json({ error: "Supabase client not initialized" });
      }
      const { data: events, error } = await supabase.from("events").select("*");
      if (error) return res.status(500).json({ error: error.message });

      const filteredEvents = (events ?? []).filter((event) => {
        return event && eventPriority[event.tier] <= eventPriority[tier];
      });
      return res.status(200).json(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ error: "Failed to fetch events" });
    }
  } else {
    return res.status(405).end(`Method ${req.method} not Allowed`);
  }
}
