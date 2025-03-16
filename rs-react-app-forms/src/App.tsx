import './App.css';
import { Route, Routes } from 'react-router';
import { Main } from './app/pages/main/Main';
import { Form } from './app/pages/form/Form';
import { HookForm } from './app/pages/hook-form/Hook_form';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="form" element={<Form />} />
        <Route path="hookform" element={<HookForm />} />
      </Routes>
    </div>
  );
}

export default App;
