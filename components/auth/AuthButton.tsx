"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name ?? "Avatar"}
            className="h-8 w-8 rounded-full"
          />
        )}
        <span className="text-sm text-zinc-300">{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="rounded-sm border border-white/10 px-3 py-1 text-xs text-zinc-400 hover:bg-white/5 hover:text-white"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="rounded-sm border border-white/10 px-3 py-1 text-xs text-zinc-400 hover:bg-white/5 hover:text-white"
    >
      Sign In
    </button>
  );
}