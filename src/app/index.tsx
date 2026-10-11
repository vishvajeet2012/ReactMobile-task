import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { useRequestOtpMutation } from '@/hooks/use-auth';
import { useKeyboardOverlap } from '@/hooks/use-keyboard-overlap';
import { useAuthStore } from '@/store';
import { Colors, FontFamily, FontSizes, LineHeights, Palette, Radii, Spacing } from '@/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const storedPhone = useAuthStore((state) => state.phone);
  const [digits, setDigits] = useState(storedPhone || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  const overlap = useKeyboardOverlap();
  const requestOtpMutation = useRequestOtpMutation();

  const handleGetOtp = () => {
    if (digits.length !== 10) {
      setValidationError('Please enter a valid 10-digit mobile number');
      return;
    }

    setValidationError(null);

    requestOtpMutation.mutate(
      { phone: digits, dial_code: '+91' },
      {
        onSuccess: () => {
          router.push({
            pathname: '/otp',
            params: { phone: digits },
          });
        },
      }
    );
  };

  const activeError =
    validationError || (requestOtpMutation.error ? requestOtpMutation.error.message : null);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={[styles.flex, overlap > 0 && { paddingBottom: overlap }]}>
        <View style={styles.body}>
          <Pressable accessibilityLabel="Back" hitSlop={12} onPress={() => router.back()} style={styles.back}>
            <Image source={require('@/assets/images/fastor/back.svg')} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.title}>Sign Up to Fastor</Text>
          <Text style={styles.subtitle}>
            Let us know your mobile number and we will send you an OTP for verification.
          </Text>

          <View style={styles.field}>
            <Text style={styles.country}>+91</Text>
            <View style={styles.cursor} />
            <Text style={styles.dash}>-</Text>
            <TextInput
              value={digits}
              onChangeText={(value) => {
                setDigits(value.replace(/\D/g, '').slice(0, 10));
                if (validationError) {
                  setValidationError(null);
                }
              }}
              keyboardType="number-pad"
              inputMode="numeric"
              autoFocus
              maxLength={10}
              placeholder="00000"
              placeholderTextColor={Colors.light.placeholder}
              caretHidden
              style={styles.input}
            />
          </View>

          {activeError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{activeError}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label="Get OTP"
            loading={requestOtpMutation.isPending}
            disabled={digits.length === 0 || requestOtpMutation.isPending}
            onPress={handleGetOtp}
          />
          <Text style={styles.legal}>
            By clicking, I accept the <Text style={styles.legalStrong}>Terms & Conditions</Text> and{' '}
            <Text style={styles.legalStrong}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  back: {
    marginTop: Spacing.lg,
    width: 24,
    height: 24,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    marginTop: Spacing.lg,
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.xxl,
    lineHeight: LineHeights.xxl,
    color: Colors.light.text,
  },
  subtitle: {
    marginTop: Spacing.sm,
    fontFamily: FontFamily.mulish.regular,
    fontSize: FontSizes.sm,
    lineHeight: 21,
    color: Colors.light.textSecondary,
  },
  field: {
    marginTop: Spacing.xxl,
    height: 48,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  country: {
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.base,
    color: Colors.light.text,
  },
  cursor: {
    width: 1.5,
    height: 13,
    backgroundColor: Colors.light.accent,
  },
  dash: {
    fontFamily: FontFamily.mulish.regular,
    fontSize: FontSizes.base,
    color: Colors.light.text,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.base,
    color: Colors.light.text,
    letterSpacing: 0.4,
    padding: 0,
  },
  errorBox: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.sm,
    backgroundColor: Palette.danger.bgLight,
    borderWidth: 1,
    borderColor: Palette.danger.light,
  },
  errorText: {
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.xs,
    color: Colors.light.danger,
    lineHeight: LineHeights.xs,
  },
  actions: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  legal: {
    textAlign: 'center',
    fontFamily: FontFamily.mulish.regular,
    fontSize: 10,
    lineHeight: 15,
    color: Colors.light.textSecondary,
  },
  legalStrong: {
    fontFamily: FontFamily.mulish.medium,
    color: Colors.light.text,
  },
});
