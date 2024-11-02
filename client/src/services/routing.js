import {
    createBrowserRouter,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import App, { AppLoader } from "../App";

import Login, { LoginLoader } from "../auth/Login";
// import UserCreation from "../pages/CM/UserCreation";
// import RegTrans from "../pages/AM/RegTrans";
// import UserAccess from "../pages/CM/UserAccess";
// import CommonCode from "../pages/CM/CommonCode";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: AppLoader,
        children: [
            {
                path: '',
                element: <Dashboard />
            },

            // {
            //     path: 'GLAMT100100',
            //     element: <RegTrans/>
            // },
            // {
            //     path: 'UserCreation',
            //     element: <UserCreation/>
            // },
            // {
            //     path: 'UserAccess',
            //     element: <UserAccess/>
            // },
            // {
            //     path: 'CommonCode',
            //     element: <CommonCode/>
            // },
            
        

        ]
    },
    {
        path: '/login',
        element: <Login />,
        loader: LoginLoader
    }
])

export default router