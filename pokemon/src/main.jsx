import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './view/main';
import ErrorPage from './view/errorPage';
import DetailPage from './view/detailPage';
import ListMyPokemonPage  from './view/listMyPokemon';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />
  },
  {
    path: "detail/:id",
    element: <DetailPage />
  },
  {
    path: "listMyPokemon/",
    element: <ListMyPokemonPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
