import { useEffect, useState } from 'react';
import { Keyboard, type KeyboardEvent } from 'react-native';

/**
 * Height of the open keyboard, in dp.
 * Reads the current keyboard on mount so a screen that opens while the
 * keyboard is already visible (OTP after signup) still lifts its footer.
 */
export function useKeyboardOverlap() {
  const [overlap, setOverlap] = useState(0);

  useEffect(() => {
    const readHeight = (event?: KeyboardEvent) => {
      const current =
        typeof Keyboard.metrics === 'function' ? Keyboard.metrics()?.height : undefined;
      const next = event?.endCoordinates.height ?? current ?? 0;
      setOverlap(next > 0 ? next : 0);
    };

    readHeight();
    const timers = [50, 250].map((delay) => setTimeout(readHeight, delay));
    const show = Keyboard.addListener('keyboardDidShow', readHeight);
    const change = Keyboard.addListener('keyboardDidChangeFrame', (event) => {
      if (event.endCoordinates.height > 0) {
        readHeight(event);
      }
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => setOverlap(0));

    return () => {
      timers.forEach(clearTimeout);
      show.remove();
      change.remove();
      hide.remove();
    };
  }, []);

  return overlap;
}
