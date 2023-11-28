import React, { createRef, useCallback, useEffect, useState } from "react";
import { StageFieldType, StageGroupType, StageType } from "../../../_types";
import { Asterisk } from "react-bootstrap-icons";
import { MatchFields } from "../../../globalComponents/fields";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useFlowApi } from "../../../_hooks/flowAPI";
import {
    fieldCanBeVisible,
    getFormKeyAndValues,
    isObjectEmpty,
} from "../../../_utils";
import { SpecialStageComponent } from "../specialStages";
import { AxiosResponse } from "axios";

function PrevStagesComponent(props: {
    stages: StageType[];
    flowStageGroups: any[];
}) {
    const [hoveredStageGroup, setHoveredStageGroup] = useState("");

    const groupedStages = Object.values(
        props.stages.reduce((groups: any, stage) => {
            const { stageGroupId } = stage;
            const stageGroupObj = props.flowStageGroups.find(
                (stageGroup: any) => stageGroup.id === stageGroupId
            );
            if (!groups[stageGroupId]) {
                groups[stageGroupId] = {
                    stageGroupName: stageGroupObj.name,
                    stages: [],
                    nodeRef: null,
                };
            }
            groups[stageGroupId].stages.push(stage);
            return groups;
        }, {})
    );

    return (
        <TransitionGroup component={null}>
            {groupedStages.map((previousStageGroup: any, index: number) => {
                return (
                    <CSSTransition
                        nodeRef={previousStageGroup.nodeRef}
                        key={index}
                        timeout={500}
                        classNames="fade"
                        style={{ transitionDelay: `${index * 10 + 100}ms` }}
                    >
                        <div
                            onClick={() =>
                                setHoveredStageGroup(
                                    previousStageGroup.stageGroupName
                                )
                            }
                            ref={previousStageGroup.nodeRef}
                            key={index}
                            className={`block mb-3 rounded bg-white text-neutral-700 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]`}
                        >
                            <div>
                                <span className="mb-2 text-sm font-medium leading-tight">
                                    {previousStageGroup.stageGroupName}
                                    <br />
                                </span>
                                {hoveredStageGroup ===
                                    previousStageGroup.stageGroupName &&
                                    previousStageGroup.stages.map(
                                        (stage: any) => {
                                            return (
                                                <div key={stage.stage}>
                                                    {stage.name}
                                                    {stage.fields.map(
                                                        (
                                                            field: StageFieldType
                                                        ) => {
                                                            return (
                                                                <MatchFields
                                                                    field={
                                                                        field
                                                                    }
                                                                    disabled
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    </CSSTransition>
                );
            })}
        </TransitionGroup>
    );
}

function DefaultStageComponent({ activeStage, handleSubmit }: any) {
    const { flowData } = useFlowApi();
    const [groupedFields, setGroupedFields] = useState<any>({});
    const [formData, setFormData] = useState<any>(function () {
        const startValues: any = {};
        activeStage.fields.forEach((field: { name: string }) => {
            startValues[field.name] = "";
        });
        return startValues;
    });
    const handleChange = useCallback(
        (formFieldData: any) => {
            const updatedFormData: any = { ...formData };
            const [key, value]: any = Object.entries(formFieldData)[0];
            updatedFormData[key] = value;
            setFormData(updatedFormData);
        },
        [formData]
    );

    useEffect(() => {
        setGroupedFields({});
        formData &&
            activeStage.fields.map((field: any) => {
                if (
                    field.hasOwnProperty("attr") &&
                    field.attr.hasOwnProperty("group")
                ) {
                    setGroupedFields((prevGroupedFields: any) => {
                        const group = field.attr.group;

                        if (!prevGroupedFields[group]) {
                            prevGroupedFields[group] = { fields: [] };
                        }

                        return {
                            ...prevGroupedFields,
                            [group]: {
                                ...prevGroupedFields[group],
                                fields: [
                                    ...prevGroupedFields[group].fields,
                                    field,
                                ],
                            },
                        };
                    });
                } else {
                    setGroupedFields((prevGroupedFields: any) => {
                        if (!prevGroupedFields["default"]) {
                            prevGroupedFields["default"] = { fields: [] };
                        }

                        if (
                            !prevGroupedFields["default"].fields.includes(field)
                        ) {
                            return {
                                ...prevGroupedFields,
                                default: {
                                    ...prevGroupedFields["default"],
                                    fields: [
                                        ...prevGroupedFields["default"].fields,
                                        field,
                                    ],
                                },
                            };
                        } else return prevGroupedFields;
                    });
                }
            });
    }, [activeStage.fields, formData]);

    return (
        <div>
            <h3>{activeStage.name}</h3>
            <form
                onSubmit={(event) => {
                    handleSubmit(event);
                }}
            >
                {!isObjectEmpty(groupedFields) ? (
                    <div>
                        {Object.entries(groupedFields).map(
                            ([group, value]: [any, any]) => {
                                return (
                                    <div key={group}>
                                        {group !== "default" && (
                                            <div className="border-l-4 pl-3 border-primary text-lg mb-2">{group}</div>
                                        )}
                                        {value.fields.map((field: any) => {
                                            if (
                                                fieldCanBeVisible(
                                                    field,
                                                    formData
                                                )
                                            )
                                                return (
                                                    <MatchFields
                                                        key={field.name}
                                                        changeEvent={
                                                            handleChange
                                                        }
                                                        field={field}
                                                    />
                                                );
                                        })}
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div className="w-full pt-2">
                        <div
                            className="inline-block h-4 w-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                            role="status"
                        >
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                    </div>
                )}
                <div className="w-full text-right pt-2 pb-2">
                    <button
                        type="submit"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                        {flowData.flowStatus.isFinal
                            ? "Zatwierdź wniosek"
                            : "Dalej"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function FlowIsFinalAlert() {
    return (
        <div
            className="m-4 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700"
            role="alert"
        >
            Dziękujemy za wypełnienie wniosku ! Dane zostały przekazane do
            weryfikacji
        </div>
    );
}

function CreateNewFlowComponent({ createFlow }: any) {
    return (
        <div className="block rounded bg-white text-neutral-700 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]">
            <h3 className="mb-2 text-xl font-medium leading-tight">
                Rozpocznij wypełnianie wniosku
            </h3>
            <button
                onClick={() => createFlow()}
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
            >
                Rozpocznij wniosek
            </button>
        </div>
    );
}

export default function FlowNew() {
    const { flowAPI, flowData, setFlowData } = useFlowApi();
    const [flowClientGroups, setFlowClientGroups] = useState<any>();
    const [activeStageGroup, setActiveStageGroup] = useState<
        StageGroupType | undefined
    >(undefined);
    const [activeStage, setActiveStage] = useState<StageType | undefined>(
        undefined
    );
    const [flowIsFinal, setIsFinal] = useState(false);
    const [previousStages, setPreviousStages] = useState<StageType[] | []>([]);

    useEffect(() => {
        if (flowData && flowData.flowStatus.isFinal) {
            setIsFinal(true);
            const timer = setTimeout(() => {
                window.location.reload();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flowData]);

    function changeCurrentStage(stageId: string) {
        if (stageId === "1_1") {
            flowAPI.resetFlow(flowData.id).then((r: AxiosResponse) => {
                if (r.statusText === "OK") {
                    setFlowData(r.data);
                    setPreviousStages([]);
                }
            });
        } else {
            flowAPI
                .saveStage(flowData.id, stageId, {})
                .then((r: AxiosResponse) => {
                    if (r.statusText === "OK") {
                        setFlowData(r.data);
                    }
                });
        }
    }

    useEffect(() => {
        if (flowData) {
            const historyStages: StageType[] = [];
            flowData.stageHistory.forEach((historyStageId: string) => {
                historyStages.push(
                    flowData.flow.find(
                        (obj: StageType) => obj.stage === historyStageId
                    )
                );
            });
            setPreviousStages(historyStages);
        }
    }, [flowData]);

    const createFlow = () => {
        flowAPI.getClientGroups().then((r: AxiosResponse) => {
            if (r.statusText === "OK") {
                setFlowClientGroups(r.data);
            }
        });
        flowAPI.getFlowConfig().then((r: AxiosResponse) => {
            if (r.statusText === "OK") {
                setFlowData(r.data);
            }
        });
    };

    const getStageGroup = useCallback(
        (stage: StageType) => {
            return flowClientGroups.find(
                (obj: StageGroupType) => obj.id === stage.stageGroupId
            );
        },
        [flowClientGroups]
    );

    const getStage = useCallback(() => {
        return flowData.flow.find(
            (obj: StageType) => obj.stage === flowData.currentStage
        );
    }, [flowData]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = getFormKeyAndValues(event);
        if (activeStage) {
            flowAPI
                .saveStage(flowData.id, activeStage.stage, formData)
                .then((r: AxiosResponse) => {
                    if (r.statusText === "OK") {
                        setFlowData(r.data);
                    }
                });
        }
    }

    useEffect(() => {
        if (flowData) {
            const currentStage = getStage();
            if (currentStage) {
                setActiveStage(currentStage);
                setActiveStageGroup(getStageGroup(currentStage));
            }
        }
    }, [flowData, getStage, getStageGroup]);

    useEffect(() => {
        if (activeStageGroup) {
            const orderedObjects = flowData.flow.filter(function (
                obj: StageGroupType
            ) {
                return obj.id < activeStageGroup.id;
            });
            orderedObjects.forEach((obj: StageGroupType) => {
                obj.nodeRef = createRef();
            });
        }
    }, [activeStageGroup, flowData]);

    const handleSetActiveStageGroup = (stageGroup: StageGroupType) => {
        setPreviousStages(
            previousStages.filter(
                (pStage) => pStage.stageGroupId < stageGroup.id
            )
        );
        setActiveStageGroup(stageGroup);
        changeCurrentStage(stageGroup.stages[0]);
    };

    const saveControlledForm = (formObj: object) => {
        if (activeStage) {
            const flowId = flowData.id;
            const currentStageId = activeStage.stage;
            flowAPI
                .saveStage(flowId, currentStageId, formObj)
                .then((r: AxiosResponse) => {
                    if (r.statusText === "OK") {
                        setFlowData(r.data);
                    }
                });
        }
    };

    return (
        <div className={"relative"}>
            <nav className="sticky z-40 top-main-nav flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-5">
                    <div>Dodaj nowy proces</div>
                </div>
            </nav>
            <div className={"mx-5 my-5"}>
                <div className="grid grid-cols-3 gap-4">
                    <div
                        className={`${
                            activeStageGroup ? "col-span-2" : "col-span-3"
                        }`}
                    >
                        {activeStageGroup &&
                        Object.keys(activeStageGroup).length > 0 ? (
                            <>
                                {previousStages && flowClientGroups && (
                                    <PrevStagesComponent
                                        stages={previousStages}
                                        flowStageGroups={flowClientGroups}
                                    />
                                )}
                                <div className="block rounded bg-white text-neutral-700 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <h5 className="mb-2 text-xl font-medium leading-tight">
                                                {activeStageGroup.name}
                                                <br />
                                                <small
                                                    className={
                                                        "text-neutral-500 font-normal"
                                                    }
                                                >
                                                    {activeStageGroup.name}
                                                </small>
                                            </h5>
                                        </div>
                                        <div className={"my-auto"}>
                                            <Asterisk
                                                size={"30px"}
                                                className={"float-right"}
                                            />
                                        </div>
                                    </div>
                                    {activeStage && !activeStage.special ? (
                                        <DefaultStageComponent
                                            activeStage={activeStage}
                                            handleSubmit={handleSubmit}
                                        />
                                    ) : (
                                        <SpecialStageComponent
                                            activeStage={activeStage}
                                            saveControlledForm={
                                                saveControlledForm
                                            }
                                        />
                                    )}
                                    {flowIsFinal && <FlowIsFinalAlert />}
                                </div>
                            </>
                        ) : (
                            <CreateNewFlowComponent createFlow={createFlow} />
                        )}
                    </div>
                    {activeStageGroup && (
                        <div>
                            <div className="block sticky md:top-[133px] rounded bg-white text-neutral-700 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]">
                                <h5 className="mb-2 text-xl font-medium leading-tight">
                                    Etapy procesu
                                </h5>
                                <div className={"overflow-y-auto h-[40rem]"}>
                                    <ol className="border-l border-neutral-300 dark:border-neutral-500">
                                        {flowClientGroups &&
                                            flowClientGroups.map(
                                                (
                                                    stageGroup: StageGroupType
                                                ) => (
                                                    <li
                                                        key={stageGroup.id}
                                                        onClick={() =>
                                                            activeStageGroup &&
                                                            stageGroup.id <
                                                                activeStageGroup.id &&
                                                            handleSetActiveStageGroup(
                                                                stageGroup
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={`flex-start flex items-center pt-3 ${
                                                                activeStageGroup &&
                                                                stageGroup.id <
                                                                    activeStageGroup.id &&
                                                                "cursor-pointer hover:translate-y-1 duration-300"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full transition ease-in-out delay-150 ${
                                                                    activeStageGroup &&
                                                                    activeStageGroup.name ===
                                                                        stageGroup.name
                                                                        ? "bg-blue-600"
                                                                        : "bg-neutral-500"
                                                                }`}
                                                            ></div>
                                                            <p
                                                                className={`${
                                                                    activeStageGroup &&
                                                                    activeStageGroup.name ===
                                                                        stageGroup.name
                                                                        ? "text-blue-600"
                                                                        : "text-neutral-500"
                                                                } font-bold transition ease-in-out delay-100`}
                                                            >
                                                                {
                                                                    stageGroup.name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="mb-6 ml-4 mt-2">
                                                            <p className="mb-3 text-sm text-neutral-500">
                                                                {
                                                                    stageGroup.name
                                                                }
                                                            </p>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
