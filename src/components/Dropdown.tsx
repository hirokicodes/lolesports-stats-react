import React, { useState } from "react";

interface Props {
  label: string;
  dropdownOptions: DropdownOption[];
  handler: Function;
  currentOption: DropdownOption;
}

interface DropdownOption {
  name: string;
  value: string;
}

export const Dropdown: React.FC<Props> = ({
  dropdownOptions,
  handler,
  currentOption,
  label,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full" onMouseLeave={() => setIsMenuOpen(false)}>
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative z-20 block w-full p-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-700 cursor-pointer"
      >
        {label}: {currentOption.name}
      </div>

      {isMenuOpen ? (
        <div className="absolute left-0 w-48 max-h-72 bg-white overflow-scroll shadow-xl z-20">
          <div className="block px-4 py-2 text-sm bg-gray-100 text-gray-800 border-b ">
            {label}
          </div>
          {dropdownOptions.map((option, i) => {
            return (
              <a
                key={i}
                onClick={() => handler(option)}
                className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 cursor-pointer"
              >
                {option.name}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
