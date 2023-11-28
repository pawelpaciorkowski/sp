import {StageType} from "../../../../_types";
import {MatchFields} from "../../../../globalComponents/fields";
import React, { useCallback } from "react";
import {StageIds} from "../../../../_enums";

export function CollectionPointsSpecialStageComponent({stage, collectFormData, flowData}: { stage: StageType, collectFormData: Function, flowData: any }) {
    const saveCollection = useCallback((collection: any) => {
        collectFormData(collection);
      }, [collectFormData]);

    const getSavedPrincipalsFromFlow = () => {
        const principalsSourceId = (StageIds.wyborZleceniodawcowGus in flowData.stageHistory) ? StageIds.wyborZleceniodawcowGus : StageIds.wyborZleceniodawcowRpwdl
        const foundStage = flowData.flow.find((item: any) => item.stage === principalsSourceId)
        return foundStage.fields.find((item: any) => item.name === 'principals').value
    }

    return <>
        {stage.fields.map((field) => {
                return <MatchFields field={field} saveCollection={saveCollection} flowSavedData={getSavedPrincipalsFromFlow()}/>
            }
        )}
    </>
}