import { Navigate, type RouteObject } from "react-router";
import ConsoleLayout from "./layout/ConsoleLayout";
import Test from "./pages/test/Test";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RequirementList from "./pages/requirement/RequirementList";
import ReleaseList from "./pages/release/ReleaseList";
import Manage from "./pages/manage/Manage";

export const routes: RouteObject[] = [
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "",
    element: <Navigate to="/requirement" />,
  },
  {
    element: <ConsoleLayout />,
    children: [
      {
        path: "requirement",
        element: <RequirementList />,
      },
      {
        path: "release",
        element: <ReleaseList />,
      },
      {
        path: "manage",
        element: <Manage />,
      },
      // {
      //   index: true,
      //   element: <Test />,
      // },
    ],
  },
];
