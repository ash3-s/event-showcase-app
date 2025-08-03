import { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/app/_init/supabaseClient";

export default async function GetEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data: events, error } = await supabase.from("events").select("*");

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(events);
  } else {
    return res.status(405).end(`Method ${req.method} not Allowed`);
  }
}
