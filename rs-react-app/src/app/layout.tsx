import { Metadata } from 'next';
import '../styles/global.css';
import StoreProvider from 'src/store/StoreProvider';
import Providers from '../context/providers';

export const metadata: Metadata = {
  title: 'Rs-ssr-app-router',
  description: 'My App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StoreProvider>{children}</StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
