import { Menu, Button, SearchBox, Logo } from './index';

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex justify-between px-4 py-2 md:px-6 md:py-4">
      <div className={`md:gap:12 lg:gap-18 flex place-items-center gap-6`}>
        <Logo height={27} width={27} />
        <Menu />
      </div>
      <div className="flex place-items-center gap-2">
        <SearchBox />
        <Button buttonText="Log in" />
      </div>
    </header>
  );
};
