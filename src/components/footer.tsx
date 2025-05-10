import { Link } from "@heroui/link";

const Footer = () => {
  return (
    <footer className="w-full rounded-lg mx-auto max-w-screen-xl bg-background p-4 flex items-center justify-center py-6">
      <span className="text-foreground-500 text-sm">
        © 2025
        <Link href="/" className="hover:underline ml-1">
          MangEakkk
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
