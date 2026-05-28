import React from 'react';

type BirthDateFieldsProps = {
  year: string;
  month: string;
  day: string;
  onYearChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onDayChange: (value: string) => void;
};

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 100 }, (_, index) => String(currentYear - index));
const monthOptions = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
const dayOptions = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));

export function BirthDateFields({ year, month, day, onYearChange, onMonthChange, onDayChange }: BirthDateFieldsProps) {
  return (
    <div className="grid grid-cols-[1.25fr_1fr_1fr] gap-2">
      <BirthSelect label="년" value={year} options={yearOptions} placeholder="년" onChange={onYearChange} />
      <BirthSelect label="월" value={month} options={monthOptions} placeholder="월" onChange={onMonthChange} />
      <BirthSelect label="일" value={day} options={dayOptions} placeholder="일" onChange={onDayChange} />
    </div>
  );
}

function BirthSelect({ label, value, options, placeholder, onChange }: { label: string; value: string; options: string[]; placeholder: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[18px] border border-border bg-white px-3 text-sm font-semibold text-foreground outline-none focus:border-primary"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
