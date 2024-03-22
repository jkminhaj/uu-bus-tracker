import {createBrowserRouter} from "react-router-dom";
import WebApp from "./WebApp";
export const router = createBrowserRouter([
    {
      path: "/",
      element:<WebApp></WebApp>,
    },
  ]);