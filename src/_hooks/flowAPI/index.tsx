import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useAuth} from "../auth";
import {useAlerts} from "../alerts";
import {FlowAPI} from "../../_services/api/flowAPI";

const FlowApiContext = createContext<any>({} as any)

export const FlowApiProvider = ({ children }: { children: React.ReactNode }) => {
    const { authData, refreshToken } = useAuth();
    const { addAlert } = useAlerts();
    const [flowData, setFlowData] = useState<any>(null)

    const value = useMemo(
        () => {
            const flowAPI = new FlowAPI(authData, refreshToken, addAlert)
            return {
                flowData,
                setFlowData,
                flowAPI
            }
        },
        [addAlert, authData, flowData]
    );

    return (
        <FlowApiContext.Provider value={value}>
            {children}
        </FlowApiContext.Provider>
    )
};

export const useFlowApi = () => {
    return useContext(FlowApiContext)
};
