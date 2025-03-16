import { FormTemplate } from '../../chared/components/form-template/FormTemplate';
import { Header } from '../../chared/components/header/Header';
import { selectAllData } from '../../store/formSlice';
import { selectAllHookFormData } from '../../store/hookFormSlice';
import { selectIndex } from '../../store/indexSlice';
import { useAppSelector } from '../../store/withTypes';

export const Main = () => {
  const formHookData = useAppSelector(selectAllHookFormData);
  const formData = useAppSelector(selectAllData);
  const index = useAppSelector(selectIndex);
  const indexForm = index.formIndex;
  const indexHookForm = index.hookIndex;
  return (
    <div>
      <Header />
      <main className="main">
        <div>
          {formData && (
            <FormTemplate item={formData} numberSubmit={indexForm} />
          )}
        </div>
        <div>
          {formHookData && (
            <FormTemplate item={formHookData} numberSubmit={indexHookForm} />
          )}
        </div>
      </main>
    </div>
  );
};
