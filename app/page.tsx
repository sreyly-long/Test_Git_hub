import type { Metadata } from "next";
import { LoginForm } from "@/components/login/LoginForm";
import { WaveBackground } from "@/components/login/WaveBackground";

export const metadata: Metadata = {
  title: "Log in · coocon",
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[#f9f9f7] px-4 py-10">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-black/[.06] bg-white shadow-sm md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#12172b] via-[#153467] to-[#1c5cab] px-12 py-16 md:flex md:flex-col md:justify-center">
          <WaveBackground />
          <div className="relative z-10 max-w-sm">
            <p className="text-sm font-medium text-[#9ec5f4]">안전한 금융거래의 시작</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
              비대면 고객확인
              <br />
              eKYC 통합 서비스
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-[#c3c2b7]">
              한 번의 연동으로 금융 가이드라인 인증 방식이 포함된
              <br />
              eKYC 프로세스를 구현하실 수 있습니다
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-8 py-12 sm:px-14">
          <LoginForm />
        </div>
      </div>

      <footer className="w-full max-w-5xl px-2 text-xs leading-relaxed text-[#898781]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>
            <span className="font-medium text-[#52514e]">T.</span> 1588-3987
            <span className="mx-2 text-[#e1e0d9]">|</span>
            <span className="font-medium text-[#52514e]">T.</span> 02-3779-9199
            <span className="mx-2 text-[#e1e0d9]">|</span>
            <span className="font-medium text-[#52514e]">E.</span> biz@coocon.net
          </p>
          <p className="flex gap-3">
            <a href="#" className="hover:text-[#2a78d6] hover:underline">
              서비스 이용약관
            </a>
            <span className="text-[#e1e0d9]">|</span>
            <a href="#" className="hover:text-[#2a78d6] hover:underline">
              개인정보처리방침
            </a>
          </p>
        </div>
        <p className="mt-1.5">
          (주)쿠콘 | 대표자 : 김종현 | 사업자등록번호 : 102-86-85702 | 서울특별시 영등포구 영신로 220 KnK디지털타워 19층
        </p>
        <p className="mt-1">
          본 사이트의 모든 콘텐츠는 저작권법의 보호를 받는 바, 무단 전재, 복사, 배포 등을 금합니다. ©COOCON Corp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
