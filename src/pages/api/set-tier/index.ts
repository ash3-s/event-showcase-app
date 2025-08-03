import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function setTierHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} not Allowed`);
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { tier } = req.body;

  if (!tier) {
    return res.status(400).json({ error: "Missing tier in request body" });
  }
  if (
    tier !== "free" &&
    tier !== "silver" &&
    tier !== "gold" &&
    tier !== "platinum"
  ) {
    return res.status(400).json({ error: "Invalid tier in request body" });
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        tier: tier,
      },
    });

    return res
      .status(200)
      .json({ message: `Tier ${tier} set for user ${userId}` });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to update user tier" });
  }
}
