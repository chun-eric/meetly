import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link className='w-36' href='/'>
          <Image
            src='/assets/images/logo.svg'
            alt='Evently logo'
            width={128}
            height={38}
          />
        </Link>

        <SignedIn>
          <nav className='md:flex-between hidden w-full max-w-xs'>
            <NavItems />
          </nav>
        </SignedIn>

        {/* When user is signed in, show the logout button */}
        {/* When user is signed out */}
        <div className='flex w-32 justify-end gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl='/'></UserButton>
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-full' size='lg'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
