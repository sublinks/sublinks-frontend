/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { useLocalStorage } from '../use-local-storage';

const storageKey = 'storage-key';
const TestElementWithStorageState = () => {
  const [storageValue, setStorageValue] = useLocalStorage(storageKey, '0');

  return (
    <div>
      <button type="button" data-testid="storage-set__1" onClick={() => setStorageValue('1')} />
      <div data-testid="storage-state">
        {storageValue}
      </div>
    </div>
  );
};

afterEach(() => localStorage.removeItem(storageKey));

describe('use-local-storage', () => {
  it('saves default value to storage if not exists', () => {
    const element = render(<TestElementWithStorageState />);
    const stateElem = element.getByTestId('storage-state');

    // Place last in execution queue to allow hook to process useEffect
    setTimeout(() => {
      expect(localStorage.getItem(storageKey)).toBe('0');
      expect(stateElem.innerHTML).toBe('0');
    });
  });

  it('uses existing value in storage if exists', () => {
    localStorage.setItem(storageKey, '5');
    const element = render(<TestElementWithStorageState />);
    const stateElem = element.getByTestId('storage-state');

    expect(stateElem.innerHTML).toBe('5');
  });

  it('updates storage value when state dispatch function called', () => {
    const element = render(<TestElementWithStorageState />);
    const stateElem = element.getByTestId('storage-state');
    const stateUpdateButton = element.getByTestId('storage-set__1');

    fireEvent.click(stateUpdateButton);

    // Place last in execution queue to allow hook to process useEffect
    setTimeout(() => {
      expect(localStorage.getItem(storageKey)).toBe('1');
      expect(stateElem.innerHTML).toBe('1');
    });
  });
});
