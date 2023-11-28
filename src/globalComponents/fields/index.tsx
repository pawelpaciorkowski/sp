import YesNoField from "./fieldYesNo";
import InputField from "./fieldInput";
import {StageFieldType} from "../../_types";
import EmailField from "./fieldEmail";
import SelectField from "./fieldSelect";
import CollectionField from "./fieldCollection";
import TimeField from "./fieldTime";
import DateField from "./fieldDate";
import TextAreaField from "./fieldTextArea";
import NumberField from "./fieldNumber";

type MatchFieldsProps = {
    field: StageFieldType,
    disabled?: boolean,
    changeEvent?: any,
    required?: boolean,
    readOnly?: boolean,
    value?: {value: string},
    saveCollection?: any,
    flowSavedData?: any
}

export const MatchFields = ({
    field,
    disabled,
    changeEvent,
    required,
    readOnly,
    value,
    saveCollection,
    flowSavedData,
}: MatchFieldsProps) => {
    if (field.attr?.readonly === !readOnly) return null
    if (field.attr?.visible === false) return null
    switch (field.type) {
        case 'checkbox':
            return <YesNoField changeEvent={changeEvent} key={field.name} disabled={disabled} field={field} />;
        case 'text':
            return <InputField key={field.name} disabled={disabled} field={field} changeEvent={changeEvent} required={required} customValue={value} />;
        case 'email':
            return <EmailField key={field.name} disabled={disabled} field={field} changeEvent={changeEvent} customValue={value} />;
        case 'enum':
            return <SelectField key={field.name} field={field} disabled={disabled} changeEvent={changeEvent} />;
        case 'collection':
            return <CollectionField field={field} saveCollection={saveCollection} disabled={disabled} flowSavedData={flowSavedData} />;
        case 'time':
            return <TimeField field={field} key={field.name} changeEvent={changeEvent} />;
        case 'date':
            return <DateField disabled={disabled} field={field} key={field.name} changeEvent={changeEvent} />;
        case 'textarea':
            return <TextAreaField disabled={disabled} changeEvent={changeEvent} field={field} key={field.name} />;
        case 'number':
            return <NumberField field={field} changeEvent={changeEvent} key={field.name} />;
        case 'integer':
            return <NumberField field={field} changeEvent={changeEvent} key={field.name} />;
        default:
            return <pre>Brak konfiguracji dla pola {field.type}</pre>;
    }
}
