import {createBrowserRouter} from "react-router-dom";
import WebApp from "./WebApp";
import Root from "./Root";
import Home from "./components/Home";
import Shedule from "./components/user_components/Shedule";
import Maps from "./components/user_components/Maps";
export const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/schedule',
          element:<Shedule></Shedule>
        },
        {
          path:'/maps',
          element:<Maps></Maps>
        },
      ]
    },
  ]);