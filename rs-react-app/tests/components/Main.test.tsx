import { Main } from '../../src/components/Main/Main';
import { renderWithProviders } from '../../src/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { details, seasonApi } from 'tests/mocksData/mocks';
import { cards } from 'src/mocks/mocks';

vi.mock('next/compat/router');
const mockOn = vi.fn();
const mockReplase = vi.fn();
describe('Main', () => {
  vi.mock('next/compat/router', () => ({
    useRouter() {
      return {
        pathname: '',
        query: { uid: '1' },
        push: () => {},
        replase: mockReplase,
        events: {
          on: mockOn,
          off: () => {},
        },
      };
    },
  }));

  it('should render cards', async () => {
    const { getAllByText } = renderWithProviders(
      <Main details={details} cards={cards} detailsPage={seasonApi} />
    );
    expect(getAllByText('Title1')).toBeDefined();
  });
});
