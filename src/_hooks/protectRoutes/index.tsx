import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import {SideNavComponent} from "../../globalComponents/sideNav";
import React from "react";
import {AlertsComponent} from "../alerts";

export const ProtectRoutes = () => {
    const { authData } = useAuth();

    return (authData.token
        ?
        <>
            <AlertsComponent/>
            <SideNavComponent/>
            <main className="xl:ml-60 mt-main-nav">
                <Outlet/>
                <footer>
                    <div className={'p-3'}>
                        <div
                            className="block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="p-3">
                                <p className="text-base text-neutral-600">
                                    AlabFlow - stopka
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
        : <Navigate to='/login' />)
};
