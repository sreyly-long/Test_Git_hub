import type { Metadata } from "next";
import { RegisterForm } from "@/components/login/RegisterForm";
import { WaveBackground } from "@/components/login/WaveBackground";

export const metadata: Metadata = {
  title: "Sign up · coocon",
};

export default function RegisterPage() {
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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
