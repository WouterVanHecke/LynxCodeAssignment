import React from "react";

interface Props {
  label: string;
  value: string;
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldInput = (props: Props) => {
  const { label, value, handleValueChange } = props;

  return (
    <div className="flex-col flex mx-4">
      <label htmlFor={value} className="font-bold text-white uppercase text-sm">
        {label}
      </label>
      <input
        type="text"
        name={label}
        value={value}
        onChange={handleValueChange}
        className="pl-2"
        required
      />
    </div>
  );
};

export default FieldInput;
