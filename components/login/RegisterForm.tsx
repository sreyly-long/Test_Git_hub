"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { IconUser, IconMail, IconLock } from "./icons";
import { registerAction, type RegisterState } from "@/lib/actions/auth";

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-[#f4f7fc] py-2.5 pl-10 pr-4 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:border-[#2a78d6]/50 focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/25";

const initialState: RegisterState = {};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <div className="w-full max-w-sm">
      <Logo />

      <form action={formAction} className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#0b0b0b]">
            이름
          </label>
          <div className="relative">
            <IconUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="홍길동"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#0b0b0b]">
            이메일
          </label>
          <div className="relative">
            <IconMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="example@coocon.net"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#0b0b0b]">
            비밀번호
          </label>
          <div className="relative">
            <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상 입력해 주세요"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[#0b0b0b]">
            비밀번호 확인
          </label>
          <div className="relative">
            <IconLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력해 주세요"
              className={inputClasses}
            />
          </div>
        </div>

        {state.error && (
          <p className="rounded-lg bg-[#d03b3b]/10 px-3 py-2 text-sm text-[#d03b3b]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-[#2a78d6] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1c5cab] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "계정 생성 중..." : "계정 만들기"}
        </button>

        <p className="text-center text-sm text-[#52514e]">
          이미 계정이 있으신가요?{" "}
          <Link href="/" className="font-medium text-[#2a78d6] hover:underline">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
