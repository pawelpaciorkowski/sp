import { GusStageComponent } from "./gus";
import { RPWDLStageComponent } from "./rpwdl";
import { StageType } from "../../../_types";
import { MatchFields } from "../../../globalComponents/fields";
import { PeriodsSpecialStageComponent } from "./periods";
import { useFlowApi } from "../../../_hooks/flowAPI";
import { FilesSpecialStageComponent } from "./files";
import { useCallback } from "react";

function DefaultSpecialStageComponent({
    stage,
    collectFormData,
}: {
    stage: StageType;
    collectFormData: Function;
}) {
    const { flowData } = useFlowApi();
    const saveCollection = useCallback((collection: any[]) => {
        collectFormData(collection);
      }, [collectFormData]);

    return (
        <>
            {stage.fields.map((field) => <MatchFields field={field} saveCollection={saveCollection} flowSavedData={flowData}/>)}
        </>
    );
}

export function SpecialStageComponent({
    activeStage,
    saveControlledForm,
}: any) {
    const collectFormData = (formData: object) => {
        saveControlledForm(formData);
    };

    if (activeStage) {
        switch (activeStage.special[0]) {
            case "rpwdl":
                return (
                    <RPWDLStageComponent
                        stage={activeStage}
                        collectFormData={collectFormData}
                    />
                );
            case "gus":
                return (
                    <GusStageComponent
                        stage={activeStage}
                        collectFormData={collectFormData}
                    />
                );
            case "periods":
                return (
                    <PeriodsSpecialStageComponent
                        stage={activeStage}
                        collectFormData={collectFormData}
                    />
                );
            case "agreementFiles":
                return (
                    <FilesSpecialStageComponent
                        stage={activeStage}
                        collectFormData={collectFormData}
                    />
                );
            case "priceLists":
                return (
                    <FilesSpecialStageComponent
                        stage={activeStage}
                        collectFormData={collectFormData}
                    />
                );
            default:
                return (
                    <DefaultSpecialStageComponent
                        stage={activeStage}
                        collectFormData={collectFormData}
                    />
                );
        }
    } else {
        return (
            <>
                <></>
                <div
                    className="mb-4 rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800"
                    role="alert"
                >
                    Brak aktywnego stejdża
                </div>
            </>
        );
    }
}
