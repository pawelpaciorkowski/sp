import apiInstance from "../common";
import {AuthUser} from "../../../_types";

export class FlowAPI {
    private headers: { Authorization: string; "Content-Type": string };
    private addAlert: any;
    refreshToken: any;

    constructor(authData: AuthUser, refreshToken: any, addAlert: any) {
        this.refreshToken = refreshToken
        this.headers = {
            'Authorization': `Bearer ${authData.token}`,
            'Content-Type': 'application/json',
        };
        this.addAlert = addAlert
    }

    async getFlowConfig() {
        this.refreshToken();
        try {
            return await apiInstance.post('flow/client', {}, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem konfiguracji dla flow')
            return error.response
        }
    }

    async saveStage(flowId: string, stageId: string, content: object) {
        this.refreshToken();
        try {
            return await apiInstance.patch(`flow/client/${flowId}/${stageId}`, content, {headers: this.headers})
        } catch (error: any) {
            let context = null
            if (error.response.data.hasOwnProperty('context')) {
                context = JSON.stringify(error.response.data.context)
            }
            this.addAlert('error', 'Problem z zapisem kroku', context)
            return error.response
        }
    }

    async resetFlow(flowId: string) {
        this.refreshToken();
        try {
            return await apiInstance.put(`flow/client/${flowId}`, {}, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z resetem Flow')
            return error.response
        }
    }

    async getClientGroups() {
        try {
            return await apiInstance.get('flow/client/groups', {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem grup klientów')
            throw error;
        }
    }

    async getClientInfoFromGusByNip(nip: string) {
        try {
            return await apiInstance.get(`gus/nip/${nip}`, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z wyszukaniem klienta w GUS')
            return error.response
        }
    }

    async getLaboratories(filterObject?: any) {
        try {
            return await apiInstance.post('laboratories', filterObject ? filterObject: {}, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem listy laboratoriów')
            return error.response
        }
    }

    async getCollectionPoints(collectionPointIds?: number[]) {
        try {
            return await apiInstance.post('collection-points', {collectionPointId: collectionPointIds}, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem listy laboratoriów')
            return error.response
        }
    }

    async getLaboratoriesWithCollectionPointsLimited(labList: number[]) {
        try {
            return await apiInstance.post('laboratories?with-collection-points=true', labList, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem listy laboratoriów')
            return error.response
        }
    }

    async getClientInfoFromRPWDLByNip(nip: string) {
        try {
            return await apiInstance.get(`healing-subject/nip/${nip}`, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem informacji z RPWDL po NIP')
            return error.response
        }
    }

    async getClientInfoFromRPWDLByRegistrationBookNumber(nip: string) {
        try {
            return await apiInstance.get(`healing-subject/registration-book-number/${nip}`, {headers: this.headers});
        } catch (error: any) {
            this.addAlert('error', 'Problem z pobraniem informacji z RPWDL po Numerze księgi rejestrowej')
            return error.response
        }
    }

    async getDictionaryByName(name: string) {
        switch (name) {
            case 'laboratories':
                return this.getLaboratories()
            case 'collectionPoints':
                return this.getCollectionPoints()
            default:
                this.addAlert('error', 'Zdefiniuj konfiguracje słownika')
        }
    }

}
