import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";
import SearchInput from "./search-input";
import { ThemeSwitch } from "./theme-switch";

export const MangEakkkLogo = () => {
  return <Image src="/logo/logo.png" className="w-8" alt="MangEakkk Drama" />;
};

export default function Navbar() {
  return (
    <HeroUINavbar
      isBordered
      maxWidth="full"
      className="flex justify-between items-center md:px-8"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <SearchInput />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" color="foreground">
            <MangEakkkLogo />
            <p className="font-bold text-inherit">MangEakkk</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/" color="foreground">
            <MangEakkkLogo />
            <p className="font-bold text-inherit">MangEakkk</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex gap-4">
          <ThemeSwitch />
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
}
