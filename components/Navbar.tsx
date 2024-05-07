import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function App() {
  return (
    <Navbar 
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
      style={{ backgroundColor: '#433bff' }}
    >
      <NavbarBrand>
        <p className="dark font-bold text-inherit">Therapute</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link underline="hover" color="foreground" href="/home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link underline="hover" color="foreground" href="/exercise">
            Exercise
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link underline="hover" color="foreground" href="analysis">
            Analysis
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link underline="hover" color="foreground" href="profile">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
