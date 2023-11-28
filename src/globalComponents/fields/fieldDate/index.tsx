import {
    Input,
    initTE,
} from "tw-elements";
import React, {useEffect, useState} from "react";
import DatePicker from "react-date-picker";
import { formatDateToDdMmYyyy } from "../../../_utils";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DateField({field, disabled, changeEvent}: any){
    const [value, onChange] = useState<Value>(new Date());

    useEffect(() => {
        if (value && changeEvent) changeEvent({
            [field.name]: formatDateToDdMmYyyy(value)
        });
    }, [field.name, value])

    useEffect(() => {
        initTE({ Input });
    }, [])

    return (
        <div className={'pt-2 pb-2'}>
            <label
                className="text-[14px] inline-block text-neutral-700"
            >{field.label}</label><br/>
            <DatePicker disabled={disabled} className={'w-full'} name={field.name} onChange={onChange} value={value} />
        </div>
    )
}