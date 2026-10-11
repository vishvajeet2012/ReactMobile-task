# Custom Fonts Directory

Place custom font files (`.ttf`, `.otf`) in this directory.

To use custom fonts:
1. Place font files here (e.g., `Inter-Regular.ttf`, `Inter-Bold.ttf`).
2. Load them in `src/app/_layout.tsx` using `useFonts` from `expo-font`:
   ```ts
   import { useFonts } from 'expo-font';

   const [loaded] = useFonts({
     'Custom-Regular': require('@/assets/fonts/Custom-Regular.ttf'),
     'Custom-Bold': require('@/assets/fonts/Custom-Bold.ttf'),
   });
   ```
3. Update `src/theme/fonts.ts` to register the font family name.
