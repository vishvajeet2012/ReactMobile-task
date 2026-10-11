import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { portions } from '@/data/menu';
import { Colors, FontFamily } from '@/theme';

export default function ProductScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(3);
  const [selected, setSelected] = useState<(typeof portions)[number]['id']>('jumbo');

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Image source={require('@/assets/images/fastor/pizza.png')} style={styles.hero} contentFit="cover" />

        <View style={styles.rule} />
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹14.00</Text>
          <View style={styles.stepper}>
            <Pressable
              accessibilityLabel="Decrease quantity"
              onPress={() => setQuantity((current) => Math.max(1, current - 1))}>
              <Image source={require('@/assets/images/fastor/minus.svg')} style={styles.stepIcon} />
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable accessibilityLabel="Increase quantity" onPress={() => setQuantity((current) => current + 1)}>
              <Image source={require('@/assets/images/fastor/plus.svg')} style={styles.stepIcon} />
            </Pressable>
          </View>
        </View>

        <View style={styles.rule} />
        <Text style={styles.heading}>Lorem ipsum dolor sit amet</Text>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        </Text>

        <Text style={styles.portionTitle}>Personal portion</Text>
        {portions.map((portion) => {
          const isSelected = portion.id === selected;
          return (
            <Pressable key={portion.id} onPress={() => setSelected(portion.id)} style={styles.portionRow}>
              <Text style={styles.portionLabel}>{portion.label}</Text>
              <View style={styles.leader} />
              <Text style={styles.portionPrice}>{portion.price}</Text>
              <Image
                source={
                  isSelected
                    ? require('@/assets/images/fastor/radio-fill.svg')
                    : require('@/assets/images/fastor/radio-empty.svg')
                }
                style={styles.radio}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton label="Add to cart" onPress={() => router.back()} />
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  hero: {
    marginTop: 8,
    width: '100%',
    height: 223,
    borderRadius: 36,
  },
  priceRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: FontFamily.spartan.bold,
    fontSize: 24,
    lineHeight: 26,
    color: Colors.light.orange,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepIcon: {
    width: 26,
    height: 26,
  },
  quantity: {
    fontFamily: FontFamily.spartan.regular,
    fontSize: 24,
    color: Colors.light.brown,
    minWidth: 16,
    textAlign: 'center',
  },
  rule: {
    marginTop: 12,
    height: 1,
    backgroundColor: '#ffd8c7',
  },
  heading: {
    marginTop: 14,
    fontFamily: FontFamily.spartan.medium,
    fontSize: 20,
    color: Colors.light.brown,
  },
  body: {
    marginTop: 6,
    fontFamily: FontFamily.spartan.light,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.48,
    color: Colors.light.brown,
  },
  portionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontFamily: FontFamily.spartan.medium,
    fontSize: 20,
    color: Colors.light.brown,
  },
  portionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  portionLabel: {
    fontFamily: FontFamily.spartan.light,
    fontSize: 14,
    lineHeight: 14,
    color: Colors.light.brown,
  },
  leader: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#e7c3b4',
    marginBottom: 4,
  },
  portionPrice: {
    fontFamily: FontFamily.spartan.light,
    fontSize: 12,
    color: Colors.light.brown,
  },
  radio: {
    width: 15,
    height: 15,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
});
