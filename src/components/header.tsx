'use client';

import { faMugHot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { parseFullName } from 'parse-full-name';

const Header = ({ session }: { session: Session | null }) => {
  const name = session?.user?.name || '';
  const { first: firstName } = parseFullName(name);

  return (
    <header className="mb-16">
      <div className="max-w-2xl flex justify-between mx-auto px-4 py-4">
        <Link href={'/'} className="inline-flex gap-1 items-center">
          <FontAwesomeIcon icon={faMugHot} className="h-8" />
          <span className="mt-2">Buy me a coffee</span>
        </Link>
        <nav className="mt-2 flex items-center gap-6">
          <Link href="/about">About</Link>
          <Link href="/about">FAQ</Link>
          <Link href="/about">Contact</Link>
          <div className="flex gap-4">
            {session && (
              <div className="">
                <button className="flex items-center gap-2 bg-yellow-300 rounded-full p-1 pr-4">
                  <Image
                    src={session.user?.image as string}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  {firstName}
                </button>
              </div>
            )}
            {!session && (
              <>
                <button
                  onClick={() => signIn('google')}
                  className="border-2 rounded-full px-4 py-2 ml-4"
                >
                  Login
                </button>
                <button className="bg-yellow-300 rounded-full py-2 px-4 ml-4">
                  Sign up
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
