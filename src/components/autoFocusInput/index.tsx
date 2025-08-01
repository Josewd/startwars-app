import { SearchRounded } from "@mui/icons-material";
import React, { useEffect, useRef } from 'react';

type AutoFocusInputProps = {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AutoFocusInput({
  searchTerm,
  handleSearch
}: AutoFocusInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <div> 
      <SearchRounded sx={{ fontSize: 16, color: '#9CA3AF' }} />
      <input
      type="text"
      placeholder="Search planets..."
      value={searchTerm}
      ref={inputRef}
      onChange={handleSearch}
    />
    </div>
  );
}
