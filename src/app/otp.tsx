import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { useLoginMutation, useRequestOtpMutation } from '@/hooks/use-auth';
import { useKeyboardOverlap } from '@/hooks/use-keyboard-overlap';
import { useAuthStore } from '@/store';
import { Colors, FontFamily, FontSizes, LineHeights, Palette, Radii, Spacing } from '@/theme';

function formatPhone(phone: string | undefined) {
  const digits = (phone ?? '').replace(/\D/g, '');
  if (digits.length === 0) {
    return '+91 12345 67890';
  }
  if (digits.length <= 5) {
    return `+91 ${digits}`;
  }
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone?: string }>();
  const storedPhone = useAuthStore((state) => state.phone);
  const activePhone = params.phone || storedPhone || '';

  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [validationError, setValidationError] = useState<string | null>(null);

  const overlap = useKeyboardOverlap();

  const loginMutation = useLoginMutation();
  const resendMutation = useRequestOtpMutation();

  useEffect(() => {
    if (seconds === 0) {
      return;
    }
    const timer = setTimeout(() => setSeconds((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const clock = `00:${String(seconds).padStart(2, '0')}`;

  const handleVerifyOtp = (otpToVerify = code) => {
    if (otpToVerify.length !== 6) {
      setValidationError('Please enter complete 6-digit OTP');
      return;
    }

    setValidationError(null);

    loginMutation.mutate(
      {
        phone: activePhone,
        otp: otpToVerify,
        dial_code: '+91',
      },
      {
        onSuccess: () => {
          router.replace('/home');
        },
      }
    );
  };

  const handleResend = () => {
    if (seconds > 0 || resendMutation.isPending) {
      return;
    }
    setValidationError(null);
    resendMutation.mutate(
      { phone: activePhone, dial_code: '+91' },
      {
        onSuccess: () => {
          setSeconds(30);
        },
      }
    );
  };

  const activeError =
    validationError ||
    (loginMutation.error ? loginMutation.error.message : null) ||
    (resendMutation.error ? resendMutation.error.message : null);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={[styles.flex, overlap > 0 && { paddingBottom: overlap }]}>
        <View style={styles.body}>
          <Pressable accessibilityLabel="Back" hitSlop={12} onPress={() => router.back()} style={styles.back}>
            <Image source={require('@/assets/images/fastor/back.svg')} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.title}>6-digit code</Text>
          <Text style={styles.subtitle}>
            Please enter the code we’ve sent to{'\n'}
            <Text style={styles.phone}>{formatPhone(activePhone)}</Text>
          </Text>

          <View style={styles.boxes}>
            <CodeGroup start={0} code={code} />
            <Text style={styles.separator}>-</Text>
            <CodeGroup start={3} code={code} />
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={(value) => {
                const cleaned = value.replace(/\D/g, '').slice(0, 6);
                setCode(cleaned);
                if (validationError) {
                  setValidationError(null);
                }
              }}
              keyboardType="number-pad"
              inputMode="numeric"
              autoFocus
              maxLength={6}
              caretHidden
              underlineColorAndroid="transparent"
              style={styles.hiddenInput}
            />
          </View>

          {activeError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{activeError}</Text>
            </View>
          ) : null}

          <View style={styles.resendRow}>
            {seconds > 0 ? (
              <Text style={styles.resend}>
                I didn’t receive a code <Text style={styles.timer}>({clock})</Text>
              </Text>
            ) : (
              <Pressable onPress={handleResend} style={styles.resendAction}>
                <Text style={styles.resendLink}>
                  Resend Code
                </Text>
                {resendMutation.isPending && (
                  <ActivityIndicator size="small" color={Colors.light.accent} />
                )}
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label="Continue"
            loading={loginMutation.isPending}
            disabled={code.length !== 6 || loginMutation.isPending}
            onPress={() => handleVerifyOtp()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function CodeGroup({ start, code }: { start: number; code: string }) {
  return (
    <View style={styles.group}>
      {[0, 1, 2].map((offset) => {
        const index = start + offset;
        const value = code[index] ?? '';
        const active = index === code.length && code.length < 6;
        return (
          <View key={index} style={[styles.box, active && styles.boxFocused]}>
            <Text style={styles.boxText}>{value || (active ? '|' : '')}</Text>
          </View>
        );
      })}
    </View>
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
    marginTop: 18,
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
  phone: {
    fontFamily: FontFamily.mulish.bold,
    color: Colors.light.text,
  },
  boxes: {
    marginTop: Spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    alignSelf: 'flex-start',
  },
  group: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    width: 36,
    height: 48,
    borderRadius: Radii.xs,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFocused: {
    borderColor: Colors.light.accent,
  },
  boxText: {
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.base,
    color: Colors.light.accent,
  },
  separator: {
    fontFamily: FontFamily.mulish.regular,
    fontSize: FontSizes.base,
    color: Colors.light.text,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    color: Colors.light.background,
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
  resendRow: {
    marginTop: Spacing.md,
  },
  resend: {
    fontFamily: FontFamily.mulish.medium,
    fontSize: FontSizes.sm,
    lineHeight: 15,
    color: Colors.light.text,
  },
  timer: {
    fontFamily: FontFamily.mulish.bold,
    color: Colors.light.accent,
  },
  resendAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  resendLink: {
    fontFamily: FontFamily.mulish.bold,
    fontSize: FontSizes.sm,
    color: Colors.light.accent,
    textDecorationLine: 'underline',
  },
  actions: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 20,
  },
});
