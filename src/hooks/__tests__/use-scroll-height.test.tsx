import { fireEvent, renderHook } from '@testing-library/react';

import useScrollHeight from '../use-scroll-height';

const bodyScrollHeightRef = document.body.scrollHeight;
const windowScrollYRef = window.scrollY;

describe('use-scroll-height', () => {
  it('initializes with expected state', () => {
    const { result } = renderHook(useScrollHeight);

    expect(result.current.lastScrollHeight).toBe(0);
    expect(result.current.scrollHeight).toBe(0);
    expect(result.current.scrollPercentage).toBe(0);
    expect(result.current.wentUp).toBeTruthy();
  });

  it('updates state on scroll down event', () => {
    const { result } = renderHook(useScrollHeight);

    Object.defineProperty(document.body, 'scrollHeight', { configurable: true, value: 250 });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 50 });
    fireEvent.scroll(window);

    expect(result.current.lastScrollHeight).toBe(0);
    expect(result.current.scrollHeight).toBe(50);
    expect(result.current.scrollPercentage).toBe(0.2);
    expect(result.current.wentUp).toBeFalsy();

    Object.defineProperty(document.body, 'scrollHeight', { value: bodyScrollHeightRef });
    Object.defineProperty(window, 'scrollY', { value: windowScrollYRef });
  });
});
