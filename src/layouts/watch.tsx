import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeSwitch } from "@/components/theme-switch";

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 flex-grow pt-4">
        {children}
      </main>
      <div className="fixed bottom-8 right-8 z-30">
        <div className="p-3 cursor-pointer rounded-full bg-default-900/5 backdrop-blur-sm">
          <ThemeSwitch />
        </div>
      </div>
      <Footer />
    </div>
  );
}
