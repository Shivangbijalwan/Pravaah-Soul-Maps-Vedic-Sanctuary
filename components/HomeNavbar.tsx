"use client";

import { useState } from "react";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronDown, LogOut } from "lucide-react";
import DiyaFlame from "./DiyaFlame";

export default function HomeNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser();
  const displayName = user?.fullName || user?.username || "Seeker";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/50 bg-stone-950/90 shadow-sm backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/home" className="flex items-center gap-3" aria-label="Pravaah home">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10">
            <DiyaFlame size="sm" showBase={false} showHalo={false} />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-semibold tracking-tight text-stone-100">
              Pravaah
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500">
              Sanctuary Home
            </span>
          </div>
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-full border border-stone-700/70 bg-stone-900/70 p-1.5 pr-3 transition hover:border-orange-500/60"
          >
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-stone-950">
                {initials}
              </span>   
            )}
            <ChevronDown className={`h-4 w-4 text-stone-500 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-stone-800 bg-stone-900 p-4 shadow-2xl">
              <div className="border-b border-stone-800 pb-3">
                <p className="truncate text-sm font-semibold text-stone-100">{displayName}</p>
                <p className="truncate text-xs text-stone-400">
                  {user?.username ? `@${user.username}` : "No username set"}
                </p>
                <p className="truncate text-xs text-stone-500">
                  {user?.primaryEmailAddress?.emailAddress || "No email available"}
                </p>
              </div>

              <SignOutButton redirectUrl="/">
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 transition hover:bg-stone-800"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </SignOutButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
