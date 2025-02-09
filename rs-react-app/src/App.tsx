import { Route, Routes } from 'react-router';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Main } from './components/Main/Main';
import { Details } from './components/Details/Details';
import { NotFound } from './components/NotFound/NotFound';

function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route
                path={`details/:uid/${location.search}`}
                element={<Details />}
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
