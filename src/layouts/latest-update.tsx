import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

export default function LatestUpdateLayout({
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
      <div className="fixed bottom-8 flex flex-col gap-2 right-8 z-30">
        <Button isIconOnly variant="light" color="primary">
          <Image src="/logo/telegram.png" />
        </Button>
        <Button variant="light" color="primary" isIconOnly>
          <ThemeSwitch />
        </Button>
      </div>
      <Footer />
    </div>
  );
}
