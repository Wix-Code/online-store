import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex bg-white rounded-[4px] items-center px-3 h-[46px] text-[#8b8b8b] border-[1px] border-green-500 gap-2 ${className}`}
    >
      <Search className="w-[18px]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-[14px] text-[#8b8b8b] outline-none font-[400] rounded flex-1"
      />
    </div>
  );
};

export default SearchInput;