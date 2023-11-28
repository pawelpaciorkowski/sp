import CollectionPeriodsField from "./periods";
import { MatchFields } from "../index";
import React, { useCallback, useEffect, useState } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";
import EntityCollectionField from "./entity";
import CollectionPointsCollectionField from "./collectionPoints";
import DeliveriesCollectionField from "./deliveries";
import FileCollectionField from "./file";

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

function sortObjectKeysByOtherObject(objectToSort: any, referenceObject: any) {
    let referenceObjectSorted: any = {};
    referenceObject.map((obj: any, index: number) => {
        referenceObjectSorted[obj.name] = index + 1;
    });
    const referenceArray = Object.entries(referenceObjectSorted);
    referenceArray.sort((a: any, b: any) => {
        return a[1] - b[1];
    });
    const sortedObject: any = {};
    for (const [key] of referenceArray) {
        if (objectToSort[key]) {
            sortedObject[key] = objectToSort[key];
        }
    }
    return sortedObject;
}

function DefaultCollectionField({ field, disabled, saveCollection }: any) {
    const [formData, setFormData] = useState<any>({});
    const [collection, setCollection] = useState<any>([]);
    const [alert, setAlert] = useState("");
    const [details, openDetails] = useState<number>(-1);

    const handleChange = (formFieldData: any) => {
        console.log(formFieldData)
        const [fieldName, fieldValue]: [any, any] = Object.entries(formFieldData)[0];
        const fieldLabel = field.template.find(
            (obj: any) => obj.name === fieldName
        ).label;

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [fieldName]: {
                ...prevFormData[fieldName],
                value: typeof(fieldValue) == 'object' ? fieldValue.value : fieldValue,
                label: fieldLabel,
            },
        }));
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const checkFieldsNotEmpty = useCallback(() => {
        for (const _field of field.template) {
          if (_field.attr && (_field.attr.readonly === true || !field.attr.visible)) {
            continue;
          }
          if (!(_field.name in formData)) {
            setAlert(`Wypełnij wymagane pole ${_field.label}`);
            return false;
          }
        }
        return true;
      }, [formData, field.template]);

    const addCollectionItem = useCallback(() => {
        if (checkFieldsNotEmpty()) {
          const formDataWithKey = {
            uuid: uuidv4(),
            form: sortObjectKeysByOtherObject(formData, field.template),
          };
          setCollection([...collection, formDataWithKey]);
          Object.keys(formData).forEach((key: string) => {
            setFormData((prevFormData: any) => ({
            ...prevFormData,
              [key]: {
              ...prevFormData[key],
                value: '',
                label: prevFormData[key].label,
              },
            }));
          })
        }
      }, [checkFieldsNotEmpty, formData, field.template, collection]);

    const removeCollectionItem = (uuid: any) => {
        const updatedCollection = collection.filter(
            (_item: any) => _item.uuid !== uuid
        );
        setCollection(updatedCollection);
    };

    const createCollectionObjToSave = () => {
        return {
            [field.name]: collection.map((collectionItem: any) =>
                Object.fromEntries(
                    Object.entries(collectionItem.form).map(
                        ([key, { value }]: any) => [key, value]
                    )
                )
            ),
        };
    };

    if (disabled) {
        return <SummaryTable field={field} />;
    }

    return (
        <>
            {collection &&
                collection.length > 0 &&
                collection.map((item: any) => {
                    return (
                        <div
                            onClick={() => openDetails(item.uuid)}
                            className={`block cursor-pointer my-2 w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-neutral-100 hover:bg-neutral-200`}
                        >
                            <div className="p-3 text-[14px]">
                                <div className="flex flex-row">
                                    {Object.values(item.form).map(
                                        (_item: any, _index) => {
                                            if (_index <= 2)
                                                return (
                                                    <div className="basis-3/12 p-2">
                                                        <b>{_item.label}: </b>
                                                        {_item.value}
                                                    </div>
                                                );
                                        }
                                    )}
                                    <div className="basis-3/12 p-2">
                                        <XCircleFill
                                            onClick={() =>
                                                removeCollectionItem(item.uuid)
                                            }
                                            className={"float-right"}
                                            size={20}
                                            color={"red"}
                                        />
                                    </div>
                                </div>
                            </div>
                            {details === item.uuid && (
                                <div className="p-3 text-[14px]">
                                    <div className="grid gap-2 grid-cols-4 bg-primary-200 rounded p-5">
                                        {Object.values(item.form).map(
                                            (_item: any, _index) => {
                                                return (
                                                    <div className="basis-4/12 p-2">
                                                        <b>{_item.label}: </b>
                                                        {_item.value}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            {alert && (
                <div
                    className="mb-4 rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800"
                    role="alert"
                >
                    {alert}
                </div>
            )}
            Dodaj - <b>{field.label}</b>
            <div className="border-dashed shadow-md p-5 mt-2 mb-2 rounded grid grid-cols-2 gap-2">
                {field.template.map((_field: any) => (
                    <MatchFields
                        field={_field}
                        required
                        value={formData && formData.hasOwnProperty(_field.name) ? {value: formData[_field.name].value} : {value: ''}}
                        changeEvent={handleChange}
                    />
                ))}
            </div>
            <button
                onClick={addCollectionItem}
                type="button"
                className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
                Dodaj Przedmiot Collection
            </button>
            <button
                onClick={() => saveCollection(createCollectionObjToSave())}
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
            >
                Dalej
            </button>
        </>
    );
}

export default function CollectionField({
    disabled,
    field,
    saveCollection,
    flowSavedData,
}: any) {
    switch (field.attr.collectionType) {
        case "period":
            return (
                <CollectionPeriodsField
                    disabled={disabled}
                    field={field}
                    saveCollection={saveCollection}
                />
            );
        case "file":
            return (
                <FileCollectionField
                    field={field}
                    disabled={disabled}
                    saveCollection={saveCollection}
                />
            );
        case "entity":
            return (
                <EntityCollectionField
                    field={field}
                    disabled={disabled}
                    saveCollection={saveCollection}
                />
            );
        case "default":
            return (
                <DefaultCollectionField
                    field={field}
                    disabled={disabled}
                    saveCollection={saveCollection}
                />
            );
        case "custom":
            switch (field.name) {
                case "collectionPoints":
                    return (
                        <CollectionPointsCollectionField
                            field={field}
                            disabled={disabled}
                            saveCollection={saveCollection}
                        />
                    );
                case "deliveries":
                    return (
                        <DeliveriesCollectionField
                            field={field}
                            disabled={disabled}
                            saveCollection={saveCollection}
                        />
                    );
                default:
                    return <div>custom collection field</div>;
            }
        default:
            return (
                <>
                    <></>
                    <div
                        className="mb-4 rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800"
                        role="alert"
                    >
                        Dodaj pole collection <b>{field.name}</b> do
                        konfiguracji
                    </div>
                </>
            );
    }
}
