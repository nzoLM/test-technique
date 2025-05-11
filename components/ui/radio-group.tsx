"use client";

import React from "react";

type RadioOption = {
  label: string;
  value: string;
};

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
  required?: boolean;
  label?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  required = false,
  label,
}) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label && <legend className="font-medium">{label}</legend>}
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            required={required}
            className="accent-blue-600"
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};
