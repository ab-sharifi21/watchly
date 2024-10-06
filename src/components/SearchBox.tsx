'use client';
import useDevice from '@/hooks/useDevice';
import { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';

export const SearchBox = () => {
  const { isMobile } = useDevice();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleModalClose = () => {
    setIsSearchVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (!isMobile) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isMobile]);

  return (
    <>
      {!isSearchVisible && (
        <button
          onClick={handleSearchClick}
          className="rounded-full bg-slate-600 p-2 outline-none"
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
              className="flex w-screen flex-col items-end gap-2 bg-bg-secondary-color px-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleModalClose}>
                <IoMdClose className="h-5 w-5" />
              </button>
              <input
                onChange={handleFormChange}
                type="search"
                placeholder="What are you looking for?"
                className="w-full rounded-md bg-slate-600 placeholder:text-sm px-3 py-1 outline-none"
              />
            </div>
          </div>
        )
      ) : (
        <form ref={formRef} className="flex-1 transition-all duration-300">
          {isSearchVisible && (
            <div className='w-[15rem]'>
              <input
                onChange={handleFormChange}
                type="search"
                placeholder="What are you looking for?"
                className="rounded-full w-full bg-bg-secondary-color px-4 py-2 outline-none transition-all duration-300 placeholder:text-sm"
              />
            </div>
          )}
        </form>
      )}
    </>
  );
};
