"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { IconCamera, IconChevronDown, IconTrash } from "./icons";
import { updateAvatarAction, removeAvatarAction } from "@/lib/actions/profile";
import type { ActionState } from "@/lib/actions/rooms";

const initialState: ActionState = {};

export function ProfileMenu({
  name,
  role,
  avatarUrl,
}: {
  name: string;
  role: string;
  avatarUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(updateAvatarAction, initialState);

  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.success) {
      setOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }

  useEffect(() => {
    if (state.success && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [state]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 border-l border-[#e1e0d9] pl-4"
      >
        <Avatar name={name} avatarUrl={avatarUrl} className="h-9 w-9" />
        <div className="hidden text-left leading-tight sm:block">
          <p className="text-sm font-medium text-[#0b0b0b]">{name}</p>
          <p className="text-xs text-[#898781]">{role}</p>
        </div>
        <IconChevronDown className="hidden h-4 w-4 text-[#898781] sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-[#e1e0d9] bg-white p-4 shadow-lg">
          <div className="flex flex-col items-center gap-3">
            {previewUrl ? (
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not eligible for next/image optimization */}
                <img src={previewUrl} alt={name} className="h-full w-full object-cover" />
              </span>
            ) : (
              <Avatar name={name} avatarUrl={avatarUrl} className="h-16 w-16 text-base" />
            )}

            <div className="text-center">
              <p className="text-sm font-medium text-[#0b0b0b]">{name}</p>
              <p className="text-xs text-[#898781]">{role}</p>
            </div>

            <form action={formAction} className="flex w-full flex-col items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                name="avatar"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-file-input"
              />
              <label
                htmlFor="avatar-file-input"
                className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#e1e0d9] px-3 py-2 text-xs font-medium text-[#52514e] hover:bg-black/[.02]"
              >
                <IconCamera className="h-3.5 w-3.5" />
                {selectedFile ? "Choose a different photo" : "Choose photo"}
              </label>

              {state.error && (
                <p className="w-full rounded-lg bg-[#d03b3b]/10 px-2.5 py-1.5 text-xs text-[#d03b3b]">{state.error}</p>
              )}

              {selectedFile && (
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full rounded-xl bg-[#2a78d6] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1c5cab] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {pending ? "Uploading..." : "Save photo"}
                </button>
              )}
            </form>

            {avatarUrl && !selectedFile && (
              <form action={removeAvatarAction} className="w-full">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-[#d03b3b] hover:bg-[#d03b3b]/5"
                >
                  <IconTrash className="h-3.5 w-3.5" />
                  Remove photo
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
