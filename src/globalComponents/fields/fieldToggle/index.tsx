import React from "react";

interface ToggleSwitchProps {
  label?: string;
  isChecked: boolean;
  id: any;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  id,
  isChecked,
  onToggle,
}) => (
  <div>
    <label htmlFor={`toggle-${id}`} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={`toggle-${id}`}
          className="sr-only"
          checked={isChecked}
          onChange={onToggle}
        />
        <div
          className={`block ${
            isChecked ? "bg-blue-500" : "bg-gray-600"
          } w-10 h-6 rounded-full`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
            isChecked ? "transform translate-x-full" : ""
          }`}
        ></div>
      </div>
      <h2 className="ml-2 text-sm font-medium">{label || "Administrator procesu"}</h2>
    </label>
  </div>
);

export default ToggleSwitch;
export type { ToggleSwitchProps };
