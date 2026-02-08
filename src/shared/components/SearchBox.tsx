'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js app router
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import useDevice from '@/shared/hooks/useDevice';
import { handleClickOutside } from '@/lib/utils';

export const SearchBox = () => {
  const { isMobile } = useDevice();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setIsSearchVisible(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(searchValue)}`);
    }
    setIsSearchVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isMobile) {
      const handleOutsideClick = (event: MouseEvent) =>
        handleClickOutside(event, formRef, handleModalClose);
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isMobile]);

  return (
    <>
      {!isSearchVisible && (
        <button
          onClick={handleSearchClick}
          className="rounded-full bg-slate-600 p-2 outline-none transition-all duration-200 hover:scale-110 hover:bg-slate-500"
        >
          <IoSearchOutline className="text-white" />
        </button>
      )}

      {isMobile ? (
        isSearchVisible && (
          <div
            className="fixed inset-0 z-10 flex items-start justify-center"
            onClick={handleModalClose}
          >
            <div
              className="flex w-screen flex-col items-end gap-2 bg-secondary-bg-color px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleModalClose}>
                <IoMdClose className="h-5 w-5" />
              </button>
              <form
                className="w-full rounded-md bg-slate-600"
                onSubmit={handleSearchSubmit}
              >
                <input
                  onChange={handleFormChange}
                  type="search"
                  placeholder="What are you looking for?"
                  className="w-full rounded-md bg-slate-600 px-3 py-1 outline-none placeholder:text-sm"
                />
              </form>
            </div>
          </div>
        )
      ) : (
        <form
          ref={formRef}
          className={`${
            isSearchVisible ? 'w-[20rem] flex-1' : 'w-0 overflow-hidden'
          } transition-all duration-300`}
          onSubmit={handleSearchSubmit}
        >
          {isSearchVisible && (
            <input
              onChange={handleFormChange}
              type="search"
              autoFocus
              placeholder="What are you looking for?"
              className="w-full rounded-full bg-secondary-bg-color px-4 py-2 outline-none placeholder:text-sm"
            />
          )}
        </form>
      )}
    </>
  );
};
