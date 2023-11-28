import { XCircleFill } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import { useAlerts } from "../../../../_hooks/alerts";
import { useFlowApi } from "../../../../_hooks/flowAPI";
import { AxiosResponse } from "axios/index";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

const GroupOfEntityFields = ({
    template,
    addCollectionItem,
    flowSavedData,
}: {
    template: any;
    addCollectionItem: any;
    flowSavedData: any;
}) => {
    const [groupedData, setGroupedData] = useState([]);
    const { addAlert } = useAlerts();

    useEffect(() => {
        console.log(groupedData);
    }, [groupedData]);

    const handleAddCollectionItem = () => {
        if (Object.keys(groupedData).length > 1) {
            addCollectionItem(groupedData);
            setGroupedData([]);
        } else {
            addAlert("warning", "Wypełnij formularz aby dodać przypisanie");
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {template.map((_field: any) => {
                    if (_field.attr.visible === false) return null;
                    return (
                        <SelectComponent
                            groupedData={groupedData}
                            setGroupedData={setGroupedData}
                            flowSavedData={flowSavedData}
                            _field={_field}
                        />
                    );
                })}
            </div>
            <div className={"mt-2"}>
                <button
                    onClick={() => handleAddCollectionItem()}
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    Dodaj przypisanie
                </button>
            </div>
        </>
    );
};

const SelectComponent = ({
    _field,
    groupedData,
    setGroupedData,
    flowSavedData,
}: any) => {
    const { flowAPI } = useFlowApi();
    const [options, setOptions] = useState<any>();

    const handleSetCollectionData = (data: any) => {
        setGroupedData((prevFormData: any) => ({
            ...prevFormData,
            [_field.name]: data,
        }));
    };

    const getSubmittedData = (stage: any, key: any) => {
        const existStage = flowSavedData.flow.find(
            (item: any) => item.stage === stage
        );
        const existField = existStage.fields.find(
            (item: any) => item.name === key
        );
        return existField.value.map((valueArr: any[]) =>
            Object.fromEntries(valueArr.map((item) => [item.name, item.value]))
        );
    };

    useEffect(() => {
        const getDictionary = (name: string) => {
            return flowAPI
                .getDictionaryByName(name)
                .then((r: AxiosResponse) => {
                    if (r.statusText === "OK") {
                        return r.data.map((item: any) => {
                            return {
                                label: `[${item.symbol}] ${item.name}`,
                                value: item.id,
                            };
                        });
                    }
                });
        };

        const getEntityOptions = () => {
            if (_field.attr.hasOwnProperty("source")) {
                const sourceAttrs = _field.attr.source.split(":");
                switch (sourceAttrs[0]) {
                    case "remote":
                        getDictionary(sourceAttrs[1]).then((r: any) =>
                            setOptions(r)
                        );
                        return;
                    case "submitted":
                        const submittedData = getSubmittedData(
                            sourceAttrs[1],
                            sourceAttrs[2]
                        );
                        console.log(submittedData);
                        const _options = submittedData.map((item: any) => ({
                            value: item.id,
                            label: item.name,
                        }));
                        setOptions(_options);
                }
            }
        };
        getEntityOptions();
    }, []);

    return (
        <div>
            <Select
                value={groupedData[_field.name] || null}
                noOptionsMessage={() => "Brak danych"}
                placeholder={"Wybierz lub szukaj"}
                isClearable={true}
                isDisabled={_field.multiple && groupedData.length < 1}
                isMulti={_field.multiple}
                onChange={(data) => handleSetCollectionData(data)}
                options={options}
            />
        </div>
    );
};

export default function EntityCollectionField({
    field,
    disabled,
    saveCollection,
}: any) {
    const [collectionItems, setCollectionItems] = useState<any>([]);
    const { addAlert } = useAlerts();
    const {flowData} = useFlowApi()

    const addCollectionItem = (selectedObj: any) => {
        selectedObj.uuid = uuidv4();
        const notExist = collectionItems.every((item: any) => {
            return !Object.entries(item).some(([key, value]: [any, any]) => {
                if (typeof value === "object" && !Array.isArray(value)) {
                    if (value === selectedObj[key]) {
                        addAlert(
                            "warning",
                            `${value.label} jest już dodane do kolekcji !`
                        );
                        return true;
                    }
                }
                return false;
            });
        });

        if (notExist) {
            setCollectionItems((prevFormData: any) => [
                ...prevFormData,
                selectedObj,
            ]);
        }
    };

    const removeCollectionItem = (uuid: any) => {
        const updatedCollection = collectionItems.filter(
            (_item: any) => _item.uuid !== uuid
        );
        setCollectionItems(updatedCollection);
    };

    const createCollectionObjToSave = () => {
        return {
            [field.name]: collectionItems.map((collItem: any) => {
                let resObj: any = {};
                delete collItem.uuid;
                Object.entries(collItem).forEach((item: any) => {
                    if (item[1] && Array.isArray(item[1])) {
                        resObj[item[0]] = item[1].map((item: any) => {
                            return item.value;
                        });
                    } else if (item[1] && typeof item[1] === "object") {
                        resObj[item[0]] = item[1].value;
                    }
                });
                return resObj;
            }),
        };
    };

    if (disabled) {
        return (
            <>
                Podglad wprowadzonych danych
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
                                {field.value.map((item: any, index: any) => {
                                    return (
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                {index}
                                            </td>
                                            {item.map((value: any) => {
                                                return (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {typeof value.value ===
                                                        "boolean"
                                                            ? value.value
                                                                ? "Tak"
                                                                : "Nie"
                                                            : value.value}
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
            </>
        );
    }

    return (
        <>
            {collectionItems &&
                collectionItems.map((item: any) => {
                    return (
                        <div
                            className={`block cursor-pointer my-2 w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border-neutral-100 hover:bg-neutral-200`}
                        >
                            <div className="p-3 text-[14px]">
                                <div className="flex flex-row">
                                    {Object.values(item).map((value: any) => {
                                        if (Array.isArray(value)) {
                                            return (
                                                <div className="basis-5/12 p-2">
                                                    {value.map((_item: any) => {
                                                        return (
                                                            <span className="inline-block mr-2 whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
                                                                {_item.label}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        }
                                        if (value.hasOwnProperty("label"))
                                            return (
                                                <div className="basis-5/12 p-2">
                                                    {value.label}
                                                </div>
                                            );
                                    })}
                                    <div className="basis-2/12 p-2">
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
                        </div>
                    );
                })}
            {
                <GroupOfEntityFields
                    template={field.template}
                    addCollectionItem={addCollectionItem}
                    flowSavedData={flowData}
                />
            }
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
