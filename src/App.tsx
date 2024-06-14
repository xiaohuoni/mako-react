import { Suspense } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div>
      <HashRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Suspense fallback="Loading...">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export { App };
