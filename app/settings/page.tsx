import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SettingsNav } from "@/components/settings/SettingsNav";
import { SectionPlaceholder } from "@/components/settings/SectionPlaceholder";
import { GeneralSettingsForm } from "@/components/settings/GeneralSettingsForm";
import { ThemeSettingsCard } from "@/components/settings/ThemeSettingsCard";
import { SystemPreferencesCard } from "@/components/settings/SystemPreferencesCard";
import { settingsNavItems } from "@/components/settings/data";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Settings · coocon",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; section?: string }>;
}) {
  const session = await requireSession();
  const sp = await searchParams;
  const q = sp.q?.trim();
  const activeSlug = sp.section ?? "general";
  const activeItem = settingsNavItems.find((item) => item.slug === activeSlug) ?? settingsNavItems[0];

  const settings = await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  return (
    <div className="flex min-h-screen w-full bg-[#f9f9f7]">
      <Sidebar active="Settings" />

      <main className="flex-1 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
          <Header
            title="Settings"
            searchPlaceholder="Search settings..."
            searchAction="/settings"
            q={q}
            userName={session.user.name}
            userRole={session.user.role}
            userAvatarUrl={session.user.avatarUrl}
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr_320px]">
            <SettingsNav activeSlug={activeItem.slug} q={q} />
            {activeItem.slug === "general" ? (
              <>
                <GeneralSettingsForm settings={settings} />
                <div className="flex flex-col gap-5">
                  <ThemeSettingsCard settings={settings} />
                  <SystemPreferencesCard settings={settings} />
                </div>
              </>
            ) : (
              <SectionPlaceholder item={activeItem} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
