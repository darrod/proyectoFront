import { Outlet } from "react-router-dom";
import { AppHeader } from "@/app/layouts/components/AppHeader.tsx";
import { AppFooter } from "@/app/layouts/components/AppFooter.tsx";
import { SkipToContent } from "@/components/a11y/SkipToContent.tsx";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300">
      <SkipToContent />
      <AppHeader />
      <main id="main-content" className="px-4 pb-16 pt-6 md:px-8 lg:px-12">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

