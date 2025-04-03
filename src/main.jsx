/* eslint-disable no-unused-vars */
import './index.css'
import App from './App.jsx';
import AdminPanel from './utils/admin.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import { ContextDataWrapper } from './utils/modules/context.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminPanel />
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <ContextDataWrapper>
  <RouterProvider router={router} />
  </ContextDataWrapper>
);

