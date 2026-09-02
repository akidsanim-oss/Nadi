import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { radius, shadow, space, useTheme } from '../lib/theme';
import { SERVICES } from '../lib/data';
import { ServiceCard } from '../components/cards';
import { AppHeader, Chip, T, useBottomPad } from '../components/ui';
import { useStore } from '../lib/store';

const FILTERS = ['Tout', 'Build', 'Growth', 'IA'] as const;

export default function ServicesScreen() {
  const { c, isDark } = useTheme();
  const nav = useNavigation<any>();
  const bottomPad = useBottomPad();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Tout');
  const { selectedServices } = useStore();

  const data = useMemo(
    () => (filter === 'Tout' ? SERVICES : SERVICES.filter((s) => s.category === filter)),
    [filter]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader
        title="Services"
        subtitle="6 expertises, une seule équipe"
        right={
          selectedServices.length > 0 ? (
            <View style={[styles.counter, { backgroundColor: c.primary }]}>
              <Ionicons name="briefcase" size={13} color="#fff" />
              <T size={12.5} weight="800" color="#fff">
                {selectedServices.length}
              </T>
            </View>
          ) : null
        }
      />
      <FlatList
        data={data}
        keyExtractor={(s) => s.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: space.md, paddingBottom: bottomPad, gap: 12 }}
        ListHeaderComponent={
          <View style={{ gap: 14, marginBottom: 4 }}>
            <LinearGradient
              colors={isDark ? ['#151B3A', '#101A32'] : ['#EEF2FF', '#E9F6FB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.banner, { borderColor: c.border }, shadow(c, 1)]}
            >
              <View style={{ flex: 1 }}>
                <T size={16.5} weight="900">
                  Pas sûr du budget ?
                </T>
                <T size={13} color={c.muted} style={{ marginTop: 4, lineHeight: 19 }}>
                  Composez votre projet en 30 secondes et obtenez une fourchette réaliste.
                </T>
              </View>
              <Pressable
                onPress={() => nav.navigate('Estimator')}
                style={({ pressed }) => [styles.calcBtn, { backgroundColor: c.primary, opacity: pressed ? 0.8 : 1 }]}
              >
                <Ionicons name="calculator" size={20} color="#fff" />
              </Pressable>
            </LinearGradient>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              {FILTERS.map((f) => (
                <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={() => nav.navigate('ServiceDetail', { id: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
  },
  calcBtn: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
