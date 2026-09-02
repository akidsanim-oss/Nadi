import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { brandGradient, radius, shadow, space, useTheme, Mode } from '../lib/theme';
import { CONTACT, FAQ, OFFICES, STATS, TEAM } from '../lib/data';
import { AppHeader, Avatar, Card, Chip, CountUp, PrimaryButton, SectionTitle, T } from '../components/ui';

export default function AboutScreen() {
  const { c, mode, setMode } = useTheme();
  const nav = useNavigation<any>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader title="L’agence" subtitle="HelloWorld · depuis 2018" onBack={() => nav.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: space.md, paddingTop: 8 }}>
          <LinearGradient colors={brandGradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, shadow(c, 2)]}>
            <T size={22} weight="900" color="#fff" style={{ letterSpacing: -0.5, lineHeight: 29 }}>
              Une agence de développement,{'\n'}pas une usine à templates.
            </T>
            <T size={13.5} color="rgba(255,255,255,0.88)" style={{ marginTop: 10, lineHeight: 21 }}>
              Née à Marrakech en 2018, HelloWorld réunit développeurs, designers et spécialistes growth autour d’une seule
              obsession : livrer des produits qui génèrent du chiffre d’affaires. L’équipe accompagne aujourd’hui des marques
              au Maroc, à Londres et à Dubaï.
            </T>
          </LinearGradient>
        </View>

        <View style={styles.grid}>
          {STATS.map((s) => (
            <View key={s.id} style={[styles.stat, { backgroundColor: c.surface, borderColor: c.border }, shadow(c, 1)]}>
              <CountUp value={s.value} suffix={s.suffix} decimals={(s as any).decimals ?? 0} size={24} />
              <T size={11.5} color={c.muted}>
                {s.label}
              </T>
            </View>
          ))}
        </View>

        <SectionTitle title="L’équipe" subtitle="Vos interlocuteurs directs, du brief au suivi" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: space.md, gap: 10 }}>
          {TEAM.map((m) => (
            <View key={m.id} style={[styles.member, { backgroundColor: c.surface, borderColor: c.border }, shadow(c, 1)]}>
              <Avatar initials={m.initials} tint={m.tint} size={52} />
              <T size={14} weight="800" center style={{ marginTop: 10 }}>
                {m.name}
              </T>
              <T size={11.5} color={c.muted} center>
                {m.role}
              </T>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: space.lg }} />
        <SectionTitle title="Questions fréquentes" />
        <View style={{ paddingHorizontal: space.md, gap: 10 }}>
          {FAQ.map((f, i) => {
            const open = openFaq === i;
            return (
              <Card key={f.q} onPress={() => setOpenFaq(open ? null : i)}>
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                  <T size={14.5} weight="700" style={{ flex: 1 }}>
                    {f.q}
                  </T>
                  <Ionicons name={open ? 'remove-circle' : 'add-circle'} size={20} color={open ? c.primary : c.faint} />
                </View>
                {open ? (
                  <T size={13.5} color={c.muted} style={{ marginTop: 10, lineHeight: 21 }}>
                    {f.a}
                  </T>
                ) : null}
              </Card>
            );
          })}
        </View>

        <View style={{ height: space.lg }} />
        <SectionTitle title="Bureaux" />
        <View style={{ paddingHorizontal: space.md, gap: 10 }}>
          {OFFICES.map((o) => (
            <Card key={o.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <T size={24}>{o.flag}</T>
              <View style={{ flex: 1 }}>
                <T size={14.5} weight="800">
                  {o.city}
                </T>
                <T size={12} color={c.muted}>
                  {o.country} · {o.tz}
                </T>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ height: space.lg }} />
        <SectionTitle title="Apparence" subtitle="Thème de l’application" />
        <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: space.md }}>
          {(
            [
              { id: 'system', label: 'Système', icon: 'phone-portrait-outline' },
              { id: 'light', label: 'Clair', icon: 'sunny-outline' },
              { id: 'dark', label: 'Sombre', icon: 'moon-outline' },
            ] as { id: Mode; label: string; icon: string }[]
          ).map((m) => (
            <Chip key={m.id} label={m.label} icon={m.icon} active={mode === m.id} onPress={() => setMode(m.id)} />
          ))}
        </View>

        <View style={{ height: space.lg }} />
        <View style={{ paddingHorizontal: space.md, gap: 10 }}>
          <PrimaryButton label="Démarrer un projet" icon="rocket-outline" onPress={() => nav.navigate('Tabs', { screen: 'Contact' })} />
          <Pressable
            onPress={() => Linking.openURL(`mailto:${CONTACT.email}`).catch(() => {})}
            style={{ alignItems: 'center', paddingVertical: 10 }}
          >
            <T size={13} color={c.muted}>
              {CONTACT.email} · {CONTACT.phoneDisplay}
            </T>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.xl, padding: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: space.md },
  stat: {
    flexGrow: 1,
    flexBasis: '45%',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
  },
  member: {
    width: 140,
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
