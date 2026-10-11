import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { Colors, FontFamily, FontSizes, Radii } from '@/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  style,
}: PrimaryButtonProps) {
  const isInteractive = !disabled && !loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive }}
      disabled={!isInteractive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && isInteractive && styles.pressed,
        !isInteractive && styles.disabled,
      ]}>
      {loading ? (
        <ActivityIndicator color={Colors.light.primaryForeground} size="small" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    borderRadius: Radii.md,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.65,
  },
  label: {
    color: Colors.light.primaryForeground,
    fontFamily: FontFamily.mulish.semiBold,
    fontSize: FontSizes.base,
    letterSpacing: 1.25,
  },
});
