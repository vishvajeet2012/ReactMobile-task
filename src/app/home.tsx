import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { bestSellers, popularItems } from '@/data/menu';
import { useAuthStore } from '@/store';
import { Colors, FontFamily } from '@/theme';

type ButtonMode = 'on' | 'off';

const initialButtons: Record<string, { cancel: ButtonMode; track: ButtonMode }> = {
  shake: { cancel: 'on', track: 'off' },
  burger: { cancel: 'on', track: 'off' },
  'sushi-wave': { cancel: 'off', track: 'off' },
  'shake-2': { cancel: 'off', track: 'off' },
};

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const openProduct = () => router.push('/product');
  const [buttons, setButtons] = useState(initialButtons);

  function toggleButton(id: string, key: 'cancel' | 'track') {
    setButtons((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [key]: current[id][key] === 'on' ? 'off' : 'on',
      },
    }));
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.location}>
          <Text style={styles.locationLabel}>Current Locations</Text>
          <Text style={styles.locationValue}>Model Town, New Delhi</Text>
        </View>

        <View style={styles.greetingRow}>
          <View style={styles.nameCard}>
            <Text style={styles.name}>{user?.user_name || 'Karan'}</Text>
          </View>
          <View style={styles.quickActions}>
            <Image source={require('@/assets/images/fastor/call-button.png')} style={styles.quickButton} contentFit="cover" />
            <Image source={require('@/assets/images/fastor/wallet-button.png')} style={styles.quickButton} contentFit="cover" />
          </View>
        </View>

        <Text style={styles.section}>Best Seller</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sellerRow}>
          {bestSellers.map((item) => (
            <Pressable key={item.id} onPress={openProduct} style={styles.seller}>
              <Image source={item.image} style={styles.sellerImage} contentFit="cover" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.price}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable onPress={openProduct} style={styles.promo}>
          <Image
            source={require('@/assets/images/fastor/banner.png')}
            style={styles.promoImage}
            contentFit="cover"
          />
          <View style={styles.promoCopy} pointerEvents="none">
            <Text style={styles.promoBody}>Experience our{'\n'}delicious new dish</Text>
            <Text numberOfLines={1} style={styles.promoOff}>
              30% OFF
            </Text>
          </View>
        </Pressable>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.section}>Popular Items</Text>
        {popularItems.map((item) => {
          const state = buttons[item.id];
          return (
            <View key={item.id} style={styles.itemWrap}>
              <View style={styles.item}>
                <Pressable onPress={openProduct}>
                  <Image source={item.image} style={styles.itemImage} contentFit="cover" />
                </Pressable>
                <View style={styles.itemBody}>
                  <Pressable onPress={openProduct} style={styles.itemTitleRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </Pressable>
                  <View style={styles.itemMetaRow}>
                    <Text style={styles.itemMeta}>{item.date}</Text>
                    <Text style={styles.itemMeta}>{item.count}</Text>
                  </View>
                  <View style={styles.itemActions}>
                    <OrderButton
                      label="Cancel Order"
                      mode={state.cancel}
                      onPress={() => toggleButton(item.id, 'cancel')}
                    />
                    <OrderButton
                      label="Track Driver"
                      mode={state.track}
                      onPress={() => toggleButton(item.id, 'track')}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function OrderButton({
  label,
  mode,
  onPress,
}: {
  label: string;
  mode: ButtonMode;
  onPress: () => void;
}) {
  const on = mode === 'on';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={onPress}
      style={[styles.pill, on ? styles.pillOn : styles.pillOff]}>
      <Text
        numberOfLines={1}
        style={[styles.pillText, on ? styles.pillTextOn : styles.pillTextOff]}>
        {label}
      </Text>
    </Pressable>
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
    paddingBottom: 32,
  },
  location: {
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    gap: 4,
  },
  locationLabel: {
    fontFamily: FontFamily.inter.regular,
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.4,
  },
  locationValue: {
    fontFamily: FontFamily.inter.bold,
    fontSize: 12,
    lineHeight: 15,
    color: '#000000',
  },
  greetingRow: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameCard: {
    width: 174,
    height: 60,
    backgroundColor: Colors.light.backgroundCard,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    paddingRight: 12,
  },
  name: {
    fontFamily: FontFamily.inter.medium,
    fontSize: 18,
    color: Colors.light.text,
    opacity: 0.5,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
  },
  quickButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  section: {
    marginTop: 18,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: FontFamily.spartan.medium,
    fontSize: 20,
    color: Colors.light.brown,
  },
  sellerRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  seller: {
    width: 72,
    height: 108,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sellerImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    height: 16,
    paddingLeft: 4,
    paddingRight: 1,
    backgroundColor: '#e95322',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: FontFamily.spartan.regular,
    fontSize: 12,
    lineHeight: 16,
    color: '#ffffff',
    includeFontPadding: false,
  },
  promo: {
    marginTop: 22,
    marginHorizontal: 20,
    height: 128,
    borderRadius: 20,
    overflow: 'hidden',
  },
  promoImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  promoCopy: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  promoBody: {
    textAlign: 'center',
    fontFamily: FontFamily.spartan.regular,
    fontSize: 15,
    lineHeight: 18,
    color: '#f8f8f8',
  },
  promoOff: {
    marginTop: 2,
    textAlign: 'center',
    fontFamily: FontFamily.spartan.bold,
    fontSize: 26,
    lineHeight: 28,
    color: '#f8f8f8',
  },
  dots: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 20,
    height: 4,
    borderRadius: 12,
    backgroundColor: Colors.light.dot,
  },
  dotActive: {
    backgroundColor: Colors.light.orange,
  },
  itemWrap: {
    marginBottom: 18,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  itemImage: {
    width: 72,
    height: 108,
    borderRadius: 20,
  },
  itemBody: {
    flex: 1,
    paddingTop: 2,
  },
  itemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemName: {
    flex: 1,
    fontFamily: FontFamily.spartan.medium,
    fontSize: 20,
    color: Colors.light.brown,
  },
  itemPrice: {
    fontFamily: FontFamily.spartan.medium,
    fontSize: 20,
    color: Colors.light.orange,
  },
  itemMetaRow: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMeta: {
    fontFamily: FontFamily.spartan.light,
    fontSize: 14,
    lineHeight: 14,
    color: Colors.light.brown,
  },
  itemActions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    height: 26,
    borderRadius: 100,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pillOn: {
    backgroundColor: '#e95322',
    borderWidth: 1,
    borderColor: '#e95322',
  },
  pillOff: {
    backgroundColor: '#ffdecf',
  },
  pillText: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.075,
    includeFontPadding: false,
  },
  pillTextOn: {
    fontFamily: FontFamily.spartan.medium,
    color: '#ffffff',
  },
  pillTextOff: {
    fontFamily: FontFamily.spartan.regular,
    color: '#e95322',
  },
});
