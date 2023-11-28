import {StageType} from "../../../../_types";
import React, {useEffect, useState} from "react";
import {useFlowApi} from "../../../../_hooks/flowAPI";
import {initTE, Input, Ripple} from "tw-elements";
import {AxiosResponse} from "axios";
import {MatchFields} from "../../../../globalComponents/fields";

type RPWDLDataType = {
    registrationBookNumber: string
    name: string,
    nip: string,
    regon: string,
    email: string,
    phone: string,
    city: string,
    postalCode: string,
    street: string,
    houseNumber: string,
    flatNumber: string,
}

type RPWDLFormType = {
    rpwdl: string
    rpwdlName: string
    rpwdlEmail: string
    rpwdlPhone: string
    rpwdlCity: string
    rpwdlPostalCode: string
    rpwdlStreet: string
    rpwdlHouseNumber: string
    rpwdlFlatNumber: string
    rpwdlRegon: string
    rpwdlNip: string
    rpwdlCountryCode: string
    rpwdlCountry: string
    rpwdlProvince: string
}

function SearchMethodButtons({completeFormByGusData}: any) {
    const [searchMethod, setSearchMethod] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const { flowAPI } = useFlowApi();

    const handleSetSearchMethod = (method: number) => {
        setSearchMethod(method)
        setSearchValue('')
    }


    function searchNip() {
        flowAPI.getClientInfoFromRPWDLByNip(searchValue).then((r: AxiosResponse) => {
            if (r.statusText === 'OK') {
                // @ts-ignore
                completeFormByGusData(r.data)
            }
        })
    }

    function searchRegistrationBookNumber() {
        flowAPI.getClientInfoFromRPWDLByRegistrationBookNumber(searchValue).then((r: AxiosResponse) => {
            if (r.statusText === 'OK') {
                // @ts-ignore
                completeFormByGusData(r.data)
            }
        })
    }

    return (
        <>
            <div className={'mb-3 border-solid border border-primary rounded p-3'}>
                <div className="flex items-center flex-row">
                    <div className="basis-1/2 ">Sposób wyszukiwania podmiotów medycznych</div>
                    <div className="basis-1/2">
                        <div
                            className="float-right inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            role="group">
                            <button
                                type="button"
                                className={`inline-block rounded-l ${searchMethod === 1 ? 'bg-primary-700' : 'bg-primary'} px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0`}
                                data-te-ripple-init
                                onClick={() => handleSetSearchMethod(1)}
                                data-te-ripple-color="light">
                                NIP
                            </button>
                            <button
                                type="button"
                                className={`inline-block rounded-r ${searchMethod === 2 ? 'bg-primary-700' : 'bg-primary'} px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700`}
                                data-te-ripple-init
                                onClick={() => handleSetSearchMethod(2)}
                                data-te-ripple-color="light">
                                numer księgi rejestrowej
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    searchMethod === 1 &&
                    <div className="relative mb-1 flex flex-wrap items-stretch">
                        <input
                            key={'searchInput-rpwdlNIP'}
                            type="text"
                            name={'searchInput-rpwdlNIP'}
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-900 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                            placeholder={'Przeszukaj RPWDL po NIP-ie'}
                            aria-label={'Przeszukaj RPWDL po NIP-ie'}
                            aria-describedby={`searchInput-rpwdlNIP`}/>
                        <button
                            className="z-[2] inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            data-te-ripple-init
                            type="button"
                            onClick={() => searchNip()}
                            id={`searchInput-rpwdlNIP`}>
                            Szukaj w bazie RPWDL
                        </button>
                    </div>
                }
                {
                    searchMethod === 2 &&
                    <div className="relative mb-1 flex flex-wrap items-stretch" data-te-input-wrapper-init>
                        <input
                            key={'searchInput-rpwdlNKS'}
                            name={'searchInput-rpwdlNKS'}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-900 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                            placeholder={'Przeszukaj RPWDL po Numerze księgi rejestrowej'}
                            aria-label={'Przeszukaj RPWDL po Numerze księgi rejestrowej'}
                            aria-describedby={`searchInput-rpwdlNKS`}/>
                        <button
                            className="z-[2] inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            data-te-ripple-init
                            type="button"
                            onClick={() => searchRegistrationBookNumber()}
                            id={`searchInput-rpwdlNKS`}>
                            Szukaj w bazie RPWDL
                        </button>
                    </div>
                }</div>
        </>
    )
}

export function RPWDLStageComponent({stage, collectFormData}: {stage: StageType, collectFormData: Function}) {
    const [formData, setFormData] = useState<RPWDLFormType>({
        rpwdl: "",
        rpwdlEmail: "",
        rpwdlCity: "",
        rpwdlCountry: "",
        rpwdlCountryCode: "",
        rpwdlFlatNumber: "",
        rpwdlHouseNumber: "",
        rpwdlName: "",
        rpwdlPhone: "",
        rpwdlPostalCode: "",
        rpwdlProvince: "",
        rpwdlRegon: "",
        rpwdlNip: "",
        rpwdlStreet: ""
    })
    const handleChange = (event: any) => {
        const updatedFormData: any = { ...formData };
        updatedFormData[event.target.name] = event.target.value
        setFormData(updatedFormData)
    }

    const completeFormByGusData = (rpwdlData: RPWDLDataType) => {
        if (rpwdlData) {
            const updatedFormData: any = { ...formData };
            updatedFormData.rpwdlCity = rpwdlData.city
            updatedFormData.rpwdlFlatNumber = rpwdlData.flatNumber
            updatedFormData.rpwdlHouseNumber = rpwdlData.houseNumber
            updatedFormData.rpwdlNip = rpwdlData.nip
            updatedFormData.rpwdlName = rpwdlData.name
            updatedFormData.rpwdlPostalCode = rpwdlData.postalCode
            updatedFormData.rpwdlRegon = rpwdlData.regon
            updatedFormData.rpwdlStreet = rpwdlData.street
            updatedFormData.rpwdl = rpwdlData.registrationBookNumber
            setFormData(updatedFormData)
        }
    }

    useEffect(() => {
        initTE({ Input, Ripple }, {allowReinits: true});
    })

    return <>
        <SearchMethodButtons completeFormByGusData={completeFormByGusData}/>
        {// @ts-ignore
        formData && stage.fields.map((field) => <MatchFields field={field} changeEvent={handleChange} value={{value: formData[field.name]}} />)
        }
        <button
            onClick={() => collectFormData(formData)}
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light">
            Dalej
        </button>
    </>
}
