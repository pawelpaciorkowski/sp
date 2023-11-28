import {StageType} from "../../../../_types";
import {MatchFields} from "../../../../globalComponents/fields";
import React, {useCallback, useEffect, useState} from "react";

export function PeriodsSpecialStageComponent({stage, collectFormData}: { stage: StageType, collectFormData: Function }) {
    const [collectedFormData, setCollectedFormData] = useState({})
    const saveCollection = useCallback((collection: any) => {
        collectFormData(({
          ...collectedFormData,
          periods: collection,
        }));
      }, [collectedFormData]);

    const handleChange = (data: any) => {
        Object.entries(data).forEach(([key, value]: [any, any]) => {
            setCollectedFormData((prevCollFormData: any) => ({
                ...prevCollFormData,
                [key]: typeof(value) === 'object' ? value.value : value
            }));
        })
    }

    useEffect(() => {
        console.log(collectedFormData)
    }, [collectedFormData])

    return <>
        {stage.fields.map((field) => <MatchFields field={field} changeEvent={handleChange} saveCollection={saveCollection}/>)}
    </>
}