import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import Main from './components/Main/Main';

function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Main props={null} />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
