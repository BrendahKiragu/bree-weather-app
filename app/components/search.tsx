import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";

interface InputProps {
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<InputProps> = ({ handleSearch, setLocation }) => {
  return (
    <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
      <input
        type="text"
        placeholder="Search City"
        className="w-full bg-transparent border-b-2 placeholder:white outline-none text-white"
        onKeyDown={handleSearch}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="cursor-pointer text-white text-3xl border rounded-full">
        <RiLogoutCircleRLine />
      </div>
    </form>
  );
};

export default Search;
