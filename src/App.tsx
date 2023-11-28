import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import {ProtectRoutes} from "./_hooks/protectRoutes";
import Home from "./pages/home";
import Flow from "./pages/flow"
import FlowList from "./pages/flow/list";
import FlowNew from "./pages/flow/new";
import AddUserForm from './pages/admin/addUser';
import ProcessDetail from './globalComponents/processDetail';
import FAQPage from './globalComponents/FAQ/FAQPage';
import Profile from "./pages/profile";
import ResetPassword from "./pages/login/resetPassword";


export default function App() {
    return (
        <Routes>
            <Route path='/' element={ <Navigate to='home' /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/reset-password/:ticket' element={ <ResetPassword /> } />

            <Route element={ <ProtectRoutes /> }>
                <Route path='/home' element={ <Home /> } />
                <Route path='/flow' element={ <Flow />}>
                </Route>
                <Route path='/flow/create' element={ <FlowNew /> } />
                <Route path='/flow/modify' element={ <Home /> } />
                <Route path='/flow/list' element={ <FlowList /> } />
                <Route path='/pages/addUser' element={ <AddUserForm /> } />
                <Route path="/globalComponents/processDetail" element={<ProcessDetail />} />
                <Route path="/flow/detail/:id" element={<ProcessDetail />} />
                <Route path="/pages/profile" element={<Profile />} />

                <Route path="/globalComponents/FAQ/FAQPage" element={<FAQPage />} />
            </Route>
        </Routes>
  )
}
