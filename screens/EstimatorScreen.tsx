import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { radius, shadow, space, useTheme } from '../lib/theme';
import { SERVICES } from '../lib/data';
import { AppHeader, Card, Chip, PrimaryButton, T } from '../components/ui';
import { useStore } from '../lib/store';

const OPTIONS = [
  { id: 'multi', label: 'Multilingue (2 langues +)', icon: 'language-outline', add: 0, mult: 1.15 },
  { id: 'ds', label: 'Design system sur mesure', icon: 'color-palette-outline', add: 0, mult: 1.12 },
  { id: 'seo', label: 'SEO de lancement', icon: 'trending-up-outline', add: 9000, mult: 1 },
  { id: 'ia', label: 'Chatbot / agent IA', icon: 'sparkles-outline', add: 18000, mult: 1 },
  { id: 'maint', label: 'Maintenance 6 mois', icon: 'shield-checkmark-outline', add: 15000, mult: 1 },
];

const COMPLEXITY = [
  { id: 'simple', label: 'Essentiel', mult: 0.85 },
  { id: 'standard', label: 'Standard', mult: 1 },
  { id: 'premium', label: 'Sur-mesure avancé', mult: 1.35 },
];

export default function EstimatorScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const { selectedServices, toggleService } = useStore();
  const [pages, setPages] = useState(8);
  const [options, setOptions] = useState<string[]>(['seo']);
  const [complexity, setComplexity] = useState('standard');

  const toggleOption = (id: string) =>
    setOptions((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const { low, high, weeks } = useMemo(() => {
    const picked = SERVICES.filter((s) => selectedServices.includes(s.id));
    const base = picked.reduce((sum, s) => sum + s.priceFrom, 0) || 20000;
    const pageCost = Math.max(0, pages - 5) * 2200;
    const opts = OPTIONS.filter((o) => options.includes(o.id));
    const add = opts.reduce((s, o) => s + o.add, 0);
    const mult = opts.reduce((m, o) => m * o.mult, 1) * (COMPLEXITY.find((x) => x.id === complexity)?.mult ?? 1);
    const total = (base + pageCost + add) * mult;
    const w = Math.round(4 + picked.length * 2 + pages / 6 + opts.length * 0.6);
    return { low: Math.round((total * 0.92) / 1000) * 1000, high: Math.round((total * 1.22) / 1000) * 1000, weeks: w };
  }, [selectedServices, pages, options, complexity]);

  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader title="Estimateur de budget" subtitle="Indicatif, affiné lors du cadrage" onBack={() => nav.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: space.md, paddingBottom: 210, gap: 16 }}>
        <View>
          <T size={13} weight="800" color={c.muted} style={{ letterSpacing: 0.4, marginBottom: 10 }}>
            1. DE QUOI AVEZ-VOUS BESOIN ?
          </T>
          <View style={{ gap: 10 }}>
            {SERVICES.map((s) => {
              const active = selectedServices.includes(s.id);
              return (
                <Pressable
                  key={s.id}
                  onPress={() => toggleService(s.id)}
                  style={({ pressed }) => [
                    styles.row,
                    {
                      backgroundColor: active ? s.tint + '14' : c.surface,
                      borderColor: active ? s.tint : c.border,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.check,
                      { borderColor: active ? s.tint : c.border, backgroundColor: active ? s.tint : 'transparent' },
                    ]}
                  >
                    {active ? <Ionicons name="checkmark" size={13} color="#fff" /> : null}
                  </View>
                  <View style={{ flex: 1 }}>
                    <T size={14.5} weight="700">
                      {s.title}
                    </T>
                    <T size={11.8} color={c.muted}>
                      dès {fmt(s.priceFrom)} MAD · {s.duration}
                    </T>
                  </View>
                  <Ionicons name={s.icon as any} size={19} color={active ? s.tint : c.faint} />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <T size={13} weight="800" color={c.muted} style={{ letterSpacing: 0.4, marginBottom: 10 }}>
            2. VOLUME (PAGES / ÉCRANS)
          </T>
          <Card style={{ gap: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable
                onPress={() => setPages((p) => Math.max(1, p - 1))}
                style={[styles.stepBtn, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}
              >
                <Ionicons name="remove" size={20} color={c.text} />
              </Pressable>
              <View style={{ alignItems: 'center' }}>
                <T size={34} weight="900" style={{ letterSpacing: -1 }}>
                  {pages}
                </T>
                <T size={12} color={c.muted}>
                  pages / écrans
                </T>
              </View>
              <Pressable
                onPress={() => setPages((p) => Math.min(40, p + 1))}
                style={[styles.stepBtn, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}
              >
                <Ionicons name="add" size={20} color={c.text} />
              </Pressable>
            </View>
            <View style={{ height: 6, borderRadius: 3, backgroundColor: c.surfaceAlt }}>
              <View style={{ width: `${(pages / 40) * 100}%`, height: 6, borderRadius: 3, backgroundColor: c.primary }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[5, 10, 20, 30].map((n) => (
                <Chip key={n} label={`${n}`} active={pages === n} onPress={() => setPages(n)} />
              ))}
            </View>
          </Card>
        </View>

        <View>
          <T size={13} weight="800" color={c.muted} style={{ letterSpacing: 0.4, marginBottom: 10 }}>
            3. NIVEAU DE FINITION
          </T>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {COMPLEXITY.map((x) => (
              <Chip key={x.id} label={x.label} active={complexity === x.id} onPress={() => setComplexity(x.id)} />
            ))}
          </View>
        </View>

        <View>
          <T size={13} weight="800" color={c.muted} style={{ letterSpacing: 0.4, marginBottom: 10 }}>
            4. OPTIONS
          </T>
          <View style={{ gap: 10 }}>
            {OPTIONS.map((o) => {
              const active = options.includes(o.id);
              return (
                <Pressable
                  key={o.id}
                  onPress={() => toggleOption(o.id)}
                  style={({ pressed }) => [
                    styles.row,
                    {
                      backgroundColor: active ? c.primarySoft : c.surface,
                      borderColor: active ? c.primary : c.border,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                >
                  <Ionicons name={o.icon as any} size={19} color={active ? c.primary : c.faint} />
                  <T size={14} weight="600" style={{ flex: 1 }}>
                    {o.label}
                  </T>
                  <View style={[styles.switch, { backgroundColor: active ? c.primary : c.surfaceAlt, borderColor: c.border }]}>
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        backgroundColor: '#fff',
                        alignSelf: active ? 'flex-end' : 'flex-start',
                      }}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bar, { backgroundColor: c.bgElevated, borderColor: c.border }, shadow(c, 3)]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <T size={11.5} weight="700" color={c.muted} style={{ letterSpacing: 0.4 }}>
              ESTIMATION INDICATIVE
            </T>
            <T size={21} weight="900" style={{ letterSpacing: -0.6 }}>
              {fmt(low)} – {fmt(high)} MAD
            </T>
          </View>
          <View style={[styles.weeks, { backgroundColor: c.primarySoft, borderColor: c.primary + '55' }]}>
            <Ionicons name="time-outline" size={14} color={c.primary} />
            <T size={12.5} weight="800" color={c.primary}>
              ~{weeks} sem.
            </T>
          </View>
        </View>
        <PrimaryButton
          label="Envoyer ce brief"
          icon="arrow-forward"
          onPress={() => nav.navigate('Tabs', { screen: 'Contact' })}
          style={{ marginTop: 12 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  switch: {
    width: 42,
    height: 24,
    borderRadius: 12,
    padding: 3,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: space.md,
    paddingBottom: 26,
  },
  weeks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
