import {
    Input,
    initTE,
} from "tw-elements";
import {useEffect} from "react";
import {DefaultFieldProps} from "../_fieldTypes";

export default function TextAreaField({disabled, field}: any) {

    useEffect(() => {
        initTE({Input}, {allowReinits: true});
    })

    return (
        <div>
            <label
                htmlFor={`textarea-${field.name}`}
                className="text-[14px] inline-block text-neutral-700">
                {field.label}
            </label>
            <div className="relative mb-3" data-te-input-wrapper-init>
              <textarea
                  className={`peer block min-h-[auto] w-full rounded border-0 ${disabled ? "bg-gray-200" : "bg-transparent"} px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
                  id={`textarea-${field.name}`}
                  name={field.name}
                  readOnly={disabled}
                  defaultValue={field.value}
                  rows={3}
                  placeholder={field.label}>
              </textarea>
            </div>
        </div>
    )
}