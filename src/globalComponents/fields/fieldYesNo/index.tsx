import {useEffect} from "react";
import {initTE, Select} from "tw-elements";

function YesNoField({ field, disabled, changeEvent }: any) {

    useEffect(() => {
        initTE({ Select }, {allowReinits: true});
    })

    useEffect(() => {
        !field.attr.hasOwnProperty('defaultValue') && changeEvent && changeEvent({[field.name]: 'true'})
    }, [])

    return (
        <div key={field.name} className={'py-4'}>
            <label
                htmlFor={`yesno-${field.name}`}
                className="text-[14px] inline-block text-neutral-700">
                {field.label}
            </label>
            {changeEvent
            ?
                <select data-te-select-init
                        name={field.name}
                        defaultValue={field.attr.hasOwnProperty('defaultValue') ? field.attr.defaultValue.toString() : "true"}
                        key={field.name}
                        id={`yesno-${field.name}`}
                        onChange={(event) => changeEvent && changeEvent({[field.name]: event.target.value})}
                        value={disabled && field.value}
                        disabled={disabled}
                        data-te-class-select-label={'pointer-events-none absolute font-semibold top-0 text- left-4 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-700 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none data-[te-input-state-active]:scale-[0.8]'}
                        data-te-class-select-input={'peer block text-neutral-600 min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 cursor-pointer data-[te-input-disabled]:bg-[#e9ecef] data-[te-input-disabled]:cursor-default group-data-[te-was-validated]/validation:mb-4'}
                >
                    <option value={'true'}>Tak</option>
                    <option value={'false'}>Nie</option>
                </select>
            :
                <select data-te-select-init
                        name={field.name}
                        key={field.name}
                        id={`yesno-${field.name}`}
                        value={disabled && field.value}
                        disabled={disabled}
                        data-te-class-select-label={'pointer-events-none absolute font-semibold top-0 text- left-4 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-700 transition-all duration-200 ease-out peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none data-[te-input-state-active]:scale-[0.8]'}
                        data-te-class-select-input={'peer block text-neutral-600 min-h-[auto] w-full rounded border-0 bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 cursor-pointer data-[te-input-disabled]:bg-[#e9ecef] data-[te-input-disabled]:cursor-default group-data-[te-was-validated]/validation:mb-4'}
                >
                    <option value={'true'}>Tak</option>
                    <option value={'false'}>Nie</option>
                </select>
            }
        </div>
    )
}

export default YesNoField
