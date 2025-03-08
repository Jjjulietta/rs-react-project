import Link from 'next/link';
import { NotFound } from 'src/components/NotFound/NotFound';

export default function NotFoundPage() {
  return (
    <div>
      <NotFound />
      <Link href={'/'}>Return Home</Link>
    </div>
  );
}
