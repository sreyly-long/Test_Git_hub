"use client";

import { useActionState } from "react";
import { Logo } from "./Logo";
import { IconMail, IconLock, IconShieldCheck } from "./icons";
import { loginAction, type LoginState } from "@/lib/actions/auth";

const inputClasses =
  "w-full rounded-xl border border-[#e1e0d9] bg-[#f4f7fc] py-2.5 pl-10 pr-4 text-sm text-[#0b0b0b] placeholder:text-[#898781] focus:border-[#2a78d6]/50 focus:outline-none focus:ring-2 focus:ring-[#2a78d6]/25";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="w-full max-w-sm">
      <Logo />

      <form action={formAction} className="mt-8 flex flex-col gap-5">
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
              autoComplete="current-password"
              placeholder="비밀번호를 입력해 주세요"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="otp" className="block text-sm font-medium text-[#0b0b0b]">
              OTP 입력
            </label>
            <a href="#" className="text-xs font-medium text-[#d03b3b] hover:underline">
              OTP 등록하기
            </a>
          </div>
          <div className="relative">
            <IconShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898781]" />
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="6자리 인증번호 (선택)"
              className={inputClasses}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[#52514e]">
          <input type="checkbox" className="h-4 w-4 rounded border-[#c3c2b7] accent-[#2a78d6]" />
          이메일 저장
        </label>

        {state.error && (
          <p className="rounded-lg bg-[#d03b3b]/10 px-3 py-2 text-sm text-[#d03b3b]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-[#2a78d6] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1c5cab] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
