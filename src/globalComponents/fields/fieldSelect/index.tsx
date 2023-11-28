// import { Select, initTE } from "tw-elements";
import {useState} from "react";
import {SelectFieldProps} from "../_fieldTypes";
import Select from 'react-select'
import ToggleSwitch from "../fieldToggle";

export default function SelectField({
    field,
    options,
    disabled,
    changeEvent,
    multi,
    parentId,
    inputName,
}: SelectFieldProps) {
    const [allOptions, checkAllOptions] = useState<any>();

    const handleCheckAllOptions = (parentId: number | null) => {
        checkAllOptions(parentId);
        parentId &&
            changeEvent({
                [parentId]: {
                    isAllChecked: true,
                },
            });
    };

    const handleSelectOptions = (selectedOptions: any) => {
        if (inputName) {
            return changeEvent({
                [inputName]: selectedOptions,
            });
        }
        if (parentId) {
            return changeEvent({
                [parentId]: selectedOptions,
            });
        } else {
            return changeEvent({
                [field.name]: selectedOptions,
            });
        }
    };

    const transformChoices = () => {
        return Object.entries(field.choices).map(([value, label]) => ({
            value,
            label,
        }));
    };

    if (options) {
        return (
            <>
                {multi && parentId && (
                    <div className={"mb-2"}>
                        <ToggleSwitch
                            key={parentId}
                            id={parentId}
                            label={"Zaznacz wszystkie opcje"}
                            isChecked={allOptions === parentId}
                            onToggle={() =>
                                allOptions === parentId
                                    ? handleCheckAllOptions(null)
                                    : handleCheckAllOptions(parentId)
                            }
                        />
                    </div>
                )}
                <Select
                    placeholder={"Wybierz lub szukaj w rozwijanej liście"}
                    noOptionsMessage={() => "Brak danych"}
                    isDisabled={parentId ? allOptions === parentId : false}
                    isMulti={multi}
                    onChange={(selectedOptions) =>
                        handleSelectOptions(selectedOptions)
                    }
                    name={field.name}
                    options={options}
                />
            </>
        );
    } else {
        if (changeEvent) {
            return (
                <>
                    <label
                        htmlFor={`input-${field.name}`}
                        className="text-[14px] inline-block text-neutral-700"
                    >
                        {field.label}
                    </label>
                    <Select
                        placeholder={"Wybierz lub szukaj w rozwijanej liście"}
                        noOptionsMessage={() => "Brak danych"}
                        onChange={(selectedOptions) =>
                            handleSelectOptions(selectedOptions)
                        }
                        name={field.name}
                        options={transformChoices()}
                    />
                </>
            );
        } else {
            return (
                <>
                    <label
                        htmlFor={`input-${field.name}`}
                        className="text-[14px] inline-block text-neutral-700"
                    >
                        {field.label}
                    </label>
                    <Select
                        isDisabled={disabled}
                        value={disabled && {label: field.value, value: field.value}}
                        placeholder={"Wybierz lub szukaj w rozwijanej liście"}
                        noOptionsMessage={() => "Brak danych"}
                        name={field.name}
                        options={transformChoices()}
                    />
                </>
            );
        }
    }
}
