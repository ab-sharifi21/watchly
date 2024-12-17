'use client';
import { useEffect, useState } from 'react';
import { Menu, Button, SearchBox, Logo, LogInFormModal } from './index';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-20 flex justify-between px-2 py-2 md:px-6 ${isScrolled && 'bg-black/70'} md:py-4`}
    >
      <div className={`md:gap:12 lg:gap-18 flex place-items-center gap-6`}>
        <Logo height={27} width={27} />
        <Menu />
      </div>
      <div className="flex place-items-center gap-2">
        <SearchBox />
        <Button buttonText="Log in" onClick={() => setIsModalOpen(true)} />
      </div>
      <LogInFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="mb-4 text-xl font-semibold">Welcome to Watchly</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border bg-black/60 px-3 py-2 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border bg-black/60 px-3 py-2 outline-none"
          />
          <div className="flex w-full justify-end gap-4">
            <Button buttonText="Log In" />
            <Button buttonText="Sign Up" />
          </div>
        </form>
      </LogInFormModal>
    </header>
  );
};
