"use client";

import React from "react";

interface TierCardProps {
    id: string;
    name: string;
    price: number;
    description?: string;
    isCurrent: boolean;
    onSelect: (tier: string) => void;
    disabled?: boolean;
}

export default function TierCard({
    id,
    name,
    price,
    description,
    isCurrent,
    onSelect,
    disabled,
}: TierCardProps) {
    return (
        <div
            className={`border rounded-lg p-6 flex flex-col justify-between
        ${isCurrent ? "border-indigo-600 bg-indigo-50 text-black" : "border-gray-300"}
      `}
        >
            <div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-3xl font-bold my-2">
                    {price === 0 ? "Free" : `$${price}/mo`}
                </p>
                {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>

            <button
                disabled={disabled || isCurrent}
                onClick={() => onSelect(id)}
                className={`mt-6 py-2 rounded-full font-medium
          ${isCurrent
                        ? "bg-gray-300 cursor-default"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
            >
                {isCurrent ? "Current plan" : "Select plan"}
            </button>
        </div>
    );
}
