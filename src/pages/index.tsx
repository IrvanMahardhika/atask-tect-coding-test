import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes as RouterDOMRoutes,
  Route
} from 'react-router-dom';

import { Routes } from 'constants/routes';

import MainLayout from 'containers/MainLayout';
import Spinner from 'components/Spinner';

const Search = lazy(() => import('./Search'));

const Pages = () => {
  return (
    <Suspense
      fallback={
        <MainLayout>
          <Spinner />
        </MainLayout>
      }
    >
      <BrowserRouter>
        <RouterDOMRoutes>
          <Route
            path={Routes.index}
            element={
              <MainLayout>
                <Search />
              </MainLayout>
            }
          />
          <Route
            path={`${Routes.index}/:user`}
            element={
              <MainLayout>
                <Search />
              </MainLayout>
            }
          />
        </RouterDOMRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Pages;
