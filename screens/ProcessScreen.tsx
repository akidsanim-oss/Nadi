import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { brandGradient, radius, shadow, space, useTheme } from '../lib/theme';
import { PHASES } from '../lib/data';
import { AppHeader, Card, PrimaryButton, T } from '../components/ui';

export default function ProcessScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const [open, setOpen] = useState<string | null>(PHASES[0].id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader title="Notre méthode" subtitle="4 phases · 9 semaines et plus" onBack={() => nav.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: space.md, paddingBottom: 40, gap: 14 }}>
        <LinearGradient
          colors={brandGradient as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, shadow(c, 2)]}
        >
          <T size={20} weight="900" color="#fff">
            Un process, pas de surprises
          </T>
          <T size={13.5} color="rgba(255,255,255,0.86)" style={{ marginTop: 8, lineHeight: 21 }}>
            Chaque projet suit les mêmes 4 phases. Vous savez toujours où nous en sommes, ce qui a été validé et ce qui arrive la semaine suivante.
          </T>
          <View style={{ flexDirection: 'row', gap: 18, marginTop: 16 }}>
            {[
              { v: '9+', l: 'semaines' },
              { v: '4', l: 'phases' },
              { v: '1', l: 'démo / semaine' },
            ].map((s) => (
              <View key={s.l}>
                <T size={20} weight="900" color="#fff">
                  {s.v}
                </T>
                <T size={11.5} color="rgba(255,255,255,0.8)">
                  {s.l}
                </T>
              </View>
            ))}
          </View>
        </LinearGradient>

        {PHASES.map((p) => {
          const expanded = open === p.id;
          return (
            <Card key={p.id} onPress={() => setOpen(expanded ? null : p.id)} style={{ gap: 0 }}>
              <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
                <View style={[styles.badge, { backgroundColor: p.tint + '22', borderColor: p.tint + '55' }]}>
                  <T size={13} weight="900" color={p.tint}>
                    {p.index}
                  </T>
                </View>
                <View style={{ flex: 1 }}>
                  <T size={11} weight="800" color={p.tint} style={{ letterSpacing: 0.6 }}>
                    {p.weeks.toUpperCase()}
                  </T>
                  <T size={16.5} weight="800">
                    {p.title}
                  </T>
                </View>
                <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={c.faint} />
              </View>

              <T size={13.5} color={c.muted} style={{ marginTop: 10, lineHeight: 21 }}>
                {p.summary}
              </T>

              {expanded ? (
                <View style={{ marginTop: 14, gap: 11 }}>
                  {p.steps.map((s) => (
                    <View key={s} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                      <Ionicons name="ellipse" size={7} color={p.tint} style={{ marginTop: 7 }} />
                      <T size={13.5} style={{ flex: 1 }} color={c.text}>
                        {s}
                      </T>
                    </View>
                  ))}
                  <View style={[styles.output, { backgroundColor: p.tint + '18', borderColor: p.tint + '44' }]}>
                    <Ionicons name="flag" size={14} color={p.tint} />
                    <T size={12.5} weight="700" color={p.tint} style={{ flex: 1 }}>
                      Livrable : {p.output}
                    </T>
                  </View>
                </View>
              ) : null}
            </Card>
          );
        })}

        <Card style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="shield-checkmark" size={20} color={c.success} />
            <T size={15.5} weight="800">
              Garanties incluses
            </T>
          </View>
          {[
            '3 mois de garantie après la mise en ligne',
            'Code source et accès transférés à 100%',
            'Planning ferme après la phase Discovery',
            'Réponse à toute demande sous 48 heures',
          ].map((g) => (
            <View key={g} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Ionicons name="checkmark-circle-outline" size={17} color={c.success} />
              <T size={13.5} color={c.muted} style={{ flex: 1 }}>
                {g}
              </T>
            </View>
          ))}
        </Card>

        <PrimaryButton label="Lancer la phase Discovery" icon="compass-outline" onPress={() => nav.navigate('Contact')} />
        <Pressable onPress={() => nav.navigate('Estimator')} style={{ alignSelf: 'center', paddingVertical: 10 }}>
          <T size={13.5} weight="700" color={c.primary}>
            Estimer mon budget d’abord
          </T>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.xl, padding: 22 },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  output: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 11,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 4,
  },
});
