import '../styles/global.css';
import { AppProps } from 'next/app';
import { ThemeContextProvider } from 'src/context/themeProvider';
import { wrapper } from 'src/store/store';

interface AppPropsI {
  Component: React.ElementType;
  pageProps: AppProps;
}

export function MyApp({ Component, pageProps }: AppPropsI) {
  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}
export default wrapper.withRedux(MyApp);
