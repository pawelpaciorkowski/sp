import React, { CSSProperties, useEffect, useState } from "react";
import Select from "react-select";
import ToggleSwitch from "../../../../globalComponents/fields/fieldToggle";
import { useFlowApi } from "../../../../_hooks/flowAPI";
import { AxiosResponse } from "axios";

const GroupItem = ({
    template,
    principal,
    disabled,
    setFormData,
    flowSavedData,
}: any) => {
    const [assignCollectionPoints, setAssignType] = useState<any>(0);
    const [laboratoriesOptions, setLaboratoriesOptions] = useState<any>([]);
    const [collectionPointsOptions, setCollectionPointsOptions] = useState<any>(
        []
    );
    const [groupData, setGroupData] = useState<any>({});
    const { flowAPI } = useFlowApi();

    useEffect(() => {
        const getSubmittedData = (stage: any, key: any) => {
            const existStage = flowSavedData.flow.find(
                (item: any) => item.stage === stage
            );
            const existField = existStage.fields.find(
                (item: any) => item.name === key
            );
            return existField.value.map((valueArr: any[]) =>
                Object.fromEntries(
                    valueArr.map((item) => [item.name, item.value])
                )
            );
        };

        if (assignCollectionPoints) {
            let collectionPointsIds = getSubmittedData("8_A", "collectionPoints").map((item: any) => {
                return Object.values(item)[0]
            })
            console.log(collectionPointsIds)
            flowAPI.getCollectionPoints(collectionPointsIds)
            .then((r: AxiosResponse) => {
                if (r.statusText === "OK") {
                    setCollectionPointsOptions(
                        r.data.map((item: any) => {
                            return {
                                label: item.name,
                                value: item.id,
                            };
                        })
                    );
                }
            });
        } else {
            const labToFind = getSubmittedData("5_1", "laboratories").find(
                (item: any) => item.principals.includes(principal.value)
            );
            if (!labToFind) {
                return
            }
            flowAPI
                .getLaboratories({ laboratoryId: [labToFind.laboratory] })
                .then((r: AxiosResponse) => {
                    if (r.statusText === "OK") {
                        setLaboratoriesOptions(
                            r.data.map((item: any) => {
                                return {
                                    label: item.name,
                                    value: item.id,
                                };
                            })
                        );
                    }
                });
        }
    }, [assignCollectionPoints]);

    return (
        <div className="flex mb-3 flex-row">
            <div className="basis-2/6">
                <div className={"h-full flex items-center"}>
                    <div>
                        Zleceniodawca:
                        <br />
                        <b>{principal.label}</b>
                    </div>
                </div>
            </div>
            <div className="basis-4/6">
                <ToggleSwitch
                    key={`${principal.value}-switch`}
                    id={`${principal.value}-switch`}
                    label="Przypisz punkty pobrań"
                    isChecked={assignCollectionPoints}
                    onToggle={() => setAssignType(!assignCollectionPoints)}
                />
                {!assignCollectionPoints ? (
                    <SelectComponent
                        parentId={`${principal.value}-selectLab`}
                        _field={template.find(
                            (field: any) => field.name === "laboratories"
                        )}
                        disabled={disabled}
                        setGroupData={setGroupData}
                        groupData={groupData}
                        options={laboratoriesOptions}
                    />
                ) : (
                    <SelectComponent
                        parentId={`${principal.value}-selectCP`}
                        _field={template.find(
                            (field: any) => field.name === "collectionPoints"
                        )}
                        setGroupData={setGroupData}
                        groupData={groupData}
                        options={collectionPointsOptions}
                    />
                )}
            </div>
        </div>
    );
};

const GroupOfFields = ({
    template,
    setFormData,
    formData,
    disabled,
    flowSavedData,
}: any) => {
    const [principalOptions, setPrincipalOptions] = useState<any>([]);

    useEffect(() => {
        const getSubmittedData = (stage: any, key: any) => {
            const existStage = flowSavedData.flow.find(
                (item: any) => item.stage === stage
            );
            const existField = existStage.fields.find(
                (item: any) => item.name === key
            );
            return existField.value.map((valueArr: any[]) =>
                Object.fromEntries(
                    valueArr.map((item) => [item.name, item.value])
                )
            );
        };

        const getPrincipalOptions = () => {
            const principalField = template.find(
                (item: any) => item.name === "principal"
            );
            const principalObjList = getSubmittedData(
                principalField.attr.source.split(":")[1],
                principalField.attr.source.split(":")[2]
            );
            setPrincipalOptions(
                principalObjList.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                })
            );
        };
        getPrincipalOptions();
    }, [flowSavedData.flow, template]);

    return principalOptions.map((principal: any) => (
        <GroupItem
            key={principal.value}
            principal={principal}
            disabled={disabled}
            template={template}
            formData={formData}
            setFormData={setFormData}
            flowSavedData={flowSavedData}
        />
    ));
};

const SelectComponent = ({
    parentId,
    _field,
    setGroupData,
    groupData,
    options,
}: any) => {
    const handleSetCollectionData = (data: any) => {
        setGroupData((prevFormData: any) => ({
            ...prevFormData,
            [_field.name]: data,
        }));
    };

    return (
        <div key={parentId}>
            <label className="text-[14px] inline-block text-neutral-700">
                Wybierz {_field.label}
            </label>
            <Select
                value={groupData[_field.name]}
                isClearable={true}
                isMulti={true}
                onChange={(data) => handleSetCollectionData(data)}
                options={options}
            />
        </div>
    );
};

export default function DeliveriesCollectionField({
    field,
    disabled,
    saveCollection,
}: any) {
    const [formData, setFormData] = useState<any>({});
    const {flowData} = useFlowApi()

    const createCollectionObjToSave = () => {
        return { wayOfMaterialDelivery: "materiał dostarczany dronem" };
    };

    if (disabled) {
        return (<div
            className="mb-4 rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800"
            role="alert"
        >
            Podgląd pola <b>{field.name}</b> nie jest dostępny
        </div>)
    }

    return (
        <>
            {
                <GroupOfFields
                    template={field.template}
                    formData={formData}
                    disabled={disabled}
                    setFormData={setFormData}
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
