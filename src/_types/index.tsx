import React from "react";

export type StageGroupType = {
    id: any,
    name: string,
    stages: string[],
    nodeRef?: React.RefObject<any>
}

export type StageType = {
    stageGroupId: number;
    isSubmitted: boolean;
    special: boolean;
    stage: string,
    name: string,
    description: string,
    fields: StageFieldType[],
    nodeRef?: React.RefObject<any>
}

type StageFieldAttributesType = {
    visible?: boolean;
    readonly?: boolean
}

export type StageFieldType = {
    settings: any;
    field_type: string;
    name: string,
    label: string,
    type: string,
    value: any
    choices?: any
    multiple?: boolean
    attr?: StageFieldAttributesType
    template?: StageFieldType[]
}

type StageFieldSettingsType = {
    max_length?: number
    select_options?: any[]
}

export type AuthUser = {
    refreshToken: string,
    token: string
    iat: number
    exp: number
    roles: any[]
    username: string
}
