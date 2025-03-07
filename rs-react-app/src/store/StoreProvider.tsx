'use client';

// import { useRef, useState } from 'react';
import { setupStore } from './store';
import { Provider } from 'react-redux';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [store] = useState<AppStore>(() => setupStore());
  const store = setupStore();

  return <Provider store={store}>{children}</Provider>;
  // const storeRef = useRef<AppStore | null>(null);
  // if (storeRef.current === null) {
  //   storeRef.current = setupStore();
  // }
  // return <Provider store={storeRef.current}>{children}</Provider>;
}
