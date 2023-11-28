import React, {useEffect, useState} from "react";
import SelectField from "../../fieldSelect";
import TimeField from "../../fieldTime";

type PeriodsType = {
    fromDayOfWeek: string,
    toDayOfWeek: string,
    fromTime: string,
    toTime: string
}

const SummaryTable = ({ field }: any) => {
    console.log(!field.value)
    if (field.value.length === 0) {
        return (
            <div
                className="mb-4 rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800"
                role="alert"
            >
                Pole <b>{field.name}</b> nie zostało wypełnione
            </div>
        );
    }
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        #
                                    </th>
                                    {field.value[0].map((item: any) => {
                                        return (
                                            <th
                                                scope="col"
                                                className="px-6 py-4"
                                            >
                                                {item.label}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {field.value.map((item: any, index: number) => {
                                    return (
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                {index + 1}
                                            </td>
                                            {item.map((_item: any) => {
                                                return (
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {_item.value}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CollectionPeriodsField({field, saveCollection, disabled}: any){
    const [formData, setFormData] = useState<PeriodsType>({fromDayOfWeek: "monday", fromTime: "00:00", toDayOfWeek: "monday", toTime: "00:00"})
    const [periodsSubmitted, setPeriodsSubmitted] = useState<PeriodsType[]>([])

    const handleChange = (selectData: any) => {
        if (selectData.constructor.name === 'SyntheticBaseEvent') {
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                [selectData.target.name]: selectData.target.value
            }));
        } else {
            Object.entries(selectData).forEach(([key, value]: [any, any]) => {
                setFormData((prevFormData: any) => ({
                    ...prevFormData,
                    [key]: value.value
                }));
            })
        }
    }

    const translateDays = (day: string) => {
        if (day == 'monday') return 'Poniedziałek'
        if (day == 'tuesday') return 'Wtorek'
        if (day == 'wednesday') return 'Środa'
        if (day == 'thursday') return 'Czwartek'
        if (day == 'friday') return 'Piątek'
        if (day == 'saturday') return 'Sobota'
        if (day == 'sunday') return 'Niedziela'
    }

    const addPeriod = () => {
        setPeriodsSubmitted([ ...periodsSubmitted, formData ]);
    }

    if (disabled) {
        console.log(field.value)
        return <SummaryTable field={field}/>
    }

    if (field) return <>
        <div className={'mb-1'}>{field.label}</div>
        {periodsSubmitted && periodsSubmitted.length > 0 &&
            periodsSubmitted.map((period) => {
                console.log(period)
                return (
                    <div
                        className={`block cursor-pointer my-2 w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-neutral-100 hover:bg-neutral-200`}>
                        <div className="p-3 text-[14px]">
                            <div className="flex flex-row">
                                <div className="basis-3/12 p-2"><b>Dzień od: </b>
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                                        {translateDays(period.fromDayOfWeek)}</span>
                                </div>
                                <div className="basis-3/12 p-2"><b>Dzień do: </b>
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                                        {translateDays(period.toDayOfWeek)}</span>
                                </div>
                                <div className="basis-3/12 p-2"><b>Czas od: </b>
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                                        {period.fromTime}</span>
                                </div>
                                <div className="basis-3/12 p-2"><b>Czas do: </b>
                                    <span
                                        className="inline-block whitespace-nowrap rounded-full bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                                        {period.toTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        <div className="flex mb-3 flex-row border-primary border rounded">
        {field.template.map((_field: any) => {
            if (_field.type === 'enum') {
                return <div className="basis-1/4 p-2"><SelectField field={_field} key={_field.name} changeEvent={handleChange} inputName={_field.name}/></div>
            } else {
                return <div className="basis-1/4 p-2"><TimeField field={_field} key={_field.name} changeEvent={handleChange}/></div>
            }
        })}
        </div>
        <button
            onClick={addPeriod}
            type="button"
            className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
            Dodaj okres
        </button>
        <button
            onClick={() => saveCollection(periodsSubmitted)}
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Dalej
        </button>
    </>
    return <p>Loading ....</p>
}