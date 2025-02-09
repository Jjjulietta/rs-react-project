import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../../src/utils/hooks';

describe('useLocalStorage', () => {
  const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
  beforeEach(() => {
    mockSetItem.mockImplementation(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('initial value is equal search', () => {
    const { result } = renderHook(() => useLocalStorage('searchValue', ''));
    act(() => {
      result.current.values();
    });
    expect(result.current[0]).toEqual('');
  });
  it('save valur to LS', () => {
    const { result } = renderHook(() => useLocalStorage('searchValue', 'Test'));
    act(() => {
      result.current.values();
    });

    expect(mockSetItem).toHaveBeenCalledWith('searchValue', 'Test');
    expect(result.current[0]).toEqual('Test');
  });
});
