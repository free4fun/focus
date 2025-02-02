import React, { useState, useEffect } from 'react';

interface SelectProps {
  options: string[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  value?: string; // Añade esta línea
}

const Select: React.FC<SelectProps> = ({ options, onValueChange, placeholder = 'Select a category', value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-[180px] audio-select">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValue || placeholder}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-[180px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
