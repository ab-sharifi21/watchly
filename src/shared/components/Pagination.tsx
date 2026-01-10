import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

interface Props {
  handlePageChange: (index: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  totalPages: number;
  page: number;
}

export const Pagination = ({
  handlePageChange,
  totalPages,
  page,
  previousPage,
  nextPage,
}: Props) => {
  return (
    <div className="relative mb-4 mt-8 flex items-center justify-center gap-2">
      <button onClick={() => previousPage()}>
        <MdNavigateBefore className="h-5 w-5 duration-300 hover:scale-110 md:h-8 md:w-8" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full text-sm md:h-[2rem] md:w-[2rem] ${
            page === index + 1
              ? 'bg-secondary-color text-black'
              : 'bg-primary-color hover:bg-secondary-color hover:text-black'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => nextPage()}>
        <MdNavigateNext className="h-5 w-5 duration-300 hover:scale-110 md:h-8 md:w-8" />
      </button>
    </div>
  );
};
