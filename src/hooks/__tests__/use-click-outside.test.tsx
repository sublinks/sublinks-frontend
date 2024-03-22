import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useClickOutside } from '../use-click-outside';

const clickedOutsideFn = jest.fn();

const divElemToBeReferenced = document.createElement('div');
divElemToBeReferenced.setAttribute('data-testid', 'test-element-inside');

const TestElementWithHookRef = () => {
  const ref = useClickOutside<HTMLDivElement>(clickedOutsideFn);

  return (
    <>
      { /* eslint-disable-next-line react/no-danger */ }
      <div dangerouslySetInnerHTML={{ __html: divElemToBeReferenced.outerHTML }} ref={ref} />
      <div data-testid="test-element-outside" />
    </>
  );
};

beforeEach(() => {
  jest.spyOn(React, 'useRef').mockReturnValue({ current: divElemToBeReferenced });

  render(<TestElementWithHookRef />);
});
afterEach(() => jest.clearAllMocks());

describe('use-click-outside', () => {
  it('triggers callback function when clicking outside of referenced element', () => {
    const outsideDiv = screen.getByTestId('test-element-outside');
    fireEvent.mouseDown(outsideDiv);

    expect(clickedOutsideFn).toHaveBeenCalled();
  });

  it('does not trigger callback function when clicking inside of referenced element', () => {
    const insideDiv = screen.getByTestId('test-element-inside');
    fireEvent.mouseDown(insideDiv);

    expect(clickedOutsideFn).not.toHaveBeenCalled();
  });
});
