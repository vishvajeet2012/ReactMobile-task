import { Platform, TextStyle } from 'react-native';

/**
 * Fonts & Typography
 *
 * Signup and buttons use Mulish.
 * Home and product food UI use League Spartan.
 * Location and the greeting use Inter.
 */

export const FontFamily = {
  mulish: {
    regular: 'Mulish_400Regular',
    medium: 'Mulish_500Medium',
    semiBold: 'Mulish_600SemiBold',
    bold: 'Mulish_700Bold',
  },
  spartan: {
    light: 'LeagueSpartan_300Light',
    regular: 'LeagueSpartan_400Regular',
    medium: 'LeagueSpartan_500Medium',
    bold: 'LeagueSpartan_700Bold',
  },
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    bold: 'Inter_700Bold',
  },
} as const;

export const Fonts = Platform.select({
  web: {
    sans: FontFamily.mulish.regular,
    serif: 'Georgia, serif',
    rounded: FontFamily.mulish.medium,
    mono: 'ui-monospace, monospace',
  },
  default: {
    sans: FontFamily.mulish.regular,
    serif: 'serif',
    rounded: FontFamily.mulish.medium,
    mono: 'monospace',
  },
}) as {
  sans: string;
  serif: string;
  rounded: string;
  mono: string;
};

export const FontWeights = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 48,
} as const;

export const LineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 26,
  xl: 28,
  xxl: 32,
  xxxl: 44,
  display: 52,
} as const;

export const Typography: Record<string, TextStyle> = {
  display: {
    fontFamily: FontFamily.spartan.bold,
    fontSize: FontSizes.xxxl,
    lineHeight: 36,
  },
  title: {
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.xxl,
    lineHeight: LineHeights.xxl,
  },
  subtitle: {
    fontFamily: FontFamily.mulish.regular,
    fontSize: FontSizes.sm,
    lineHeight: 21,
  },
  h1: {
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.xxl,
    lineHeight: LineHeights.xxl,
  },
  h2: {
    fontFamily: FontFamily.spartan.medium,
    fontSize: FontSizes.xl,
    lineHeight: 24,
  },
  h3: {
    fontFamily: FontFamily.spartan.medium,
    fontSize: FontSizes.lg,
    lineHeight: 22,
  },
  body: {
    fontFamily: FontFamily.mulish.regular,
    fontSize: FontSizes.base,
    lineHeight: LineHeights.base,
  },
  bodyMedium: {
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.base,
    lineHeight: LineHeights.base,
  },
  bodyBold: {
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.base,
    lineHeight: LineHeights.base,
  },
  small: {
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
  smallBold: {
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
  caption: {
    fontFamily: FontFamily.mulish.regular,
    fontSize: 10,
    lineHeight: 15,
  },
  button: {
    fontFamily: FontFamily.mulish.semiBold,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base,
    letterSpacing: 1.25,
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
    lineHeight: LineHeights.xs,
  },
  link: {
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.sm,
    lineHeight: 21,
  },
  foodTitle: {
    fontFamily: FontFamily.spartan.medium,
    fontSize: 20,
    lineHeight: 24,
  },
  foodPrice: {
    fontFamily: FontFamily.spartan.bold,
    fontSize: 24,
    lineHeight: 26,
  },
  foodBody: {
    fontFamily: FontFamily.spartan.light,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.48,
  },
  foodMeta: {
    fontFamily: FontFamily.spartan.light,
    fontSize: 14,
    lineHeight: 14,
  },
};
