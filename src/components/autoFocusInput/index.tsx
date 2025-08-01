import { SearchRounded } from "@mui/icons-material";
import React, { useEffect, useRef } from 'react';
import './style.scss';

type AutoFocusInputProps = {
  searchTerm: string;
  placeholder?: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AutoFocusInput({
  searchTerm,
  placeholder = "Search",
  handleSearch
}: AutoFocusInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <div className="auto-focus-input-container"> 
      <SearchRounded sx={{ fontSize: 24, color: '#9CA3AF' }} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        ref={inputRef}
          onChange={handleSearch}
      />
    </div>
  );
}
