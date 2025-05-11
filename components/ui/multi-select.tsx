import React from "react";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
}) => {
  const handleToggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="border rounded p-2">
      <div className="text-sm text-gray-500 mb-2">{placeholder}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="accent-blue-500"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
