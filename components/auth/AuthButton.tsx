"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = (provider: string) => {
    setLoading(provider);
    signIn(provider, { callbackUrl: "/" });
  };

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
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-sm border border-white/10 px-3 py-1 text-xs text-zinc-400 hover:bg-white/5 hover:text-white"
      >
        Sign In
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-sm rounded-sm border border-white/10 bg-[#111] p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-lg font-semibold text-white mb-2">
              Sign in to Zosygo
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Save builds, bookmark guides, and more.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSignIn("google")}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading === "google" ? "Signing in..." : "Continue with Google"}
              </button>

              <button
                onClick={() => handleSignIn("github")}
                disabled={loading !== null}
                className="w-full flex items-center justify-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                {loading === "github" ? "Signing in..." : "Continue with GitHub"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}