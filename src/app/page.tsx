"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUp,
  SignUpButton,
  useUser
} from "@clerk/nextjs";

const TIERS = [
  { id: "free", name: "Free", desc: "Start exploring events!" },
  { id: "silver", name: "Silver", desc: "Unlock more content." },
  { id: "gold", name: "Gold", desc: "Premium perks await." },
  { id: "platinum", name: "Platinum", desc: "All-access VIP pass" },
];

export default function LandingPage() {
  const { isLoaded, user } = useUser();
  const [typed, setTyped] = useState("");
  const slogan = "Discover Events, Your Way";



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white flex flex-col">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="p-6 flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold">Event Scope</h1>


        <div className="space-x-4">
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-400">
                Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="flex-1 flex flex-col justify-center items-center text-center px-4"
      >
        <motion.h2
          className="text-4xl sm:text-6xl font-extrabold mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {slogan}
        </motion.h2>
        <p className="max-w-xl mb-8 text-lg text-gray-300">
          Tailored events delivered based on your membership tier.
        </p>
        <SignedIn>
          <Link href="/upgrade">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-yellow-500 rounded text-black font-semibold"
            >
              Upgrade Plan
            </motion.button>
          </Link>
        </SignedIn>
      </motion.main>

      <motion.section
        className="py-12 bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-4">{tier.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.footer
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-6 text-center text-gray-500 text-sm"
      >
        &copy; {new Date().getFullYear()} Event Scope. All rights reserved.
      </motion.footer>
    </div>
  );
}
