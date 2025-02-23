import { Route, Routes } from 'react-router';
import './App.css';
import ErrorBoundary from './app/shared/components/ErrorBoundary/ErrorBoundary';
import { Main } from './app/pages/Main/Main';
import { Details } from './app/pages/Details/Details';
import { NotFound } from './app/pages/NotFound/NotFound';

function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="details/:uid" element={<Details />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
