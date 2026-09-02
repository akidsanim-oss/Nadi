import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { radius, shadow, space, useTheme } from '../lib/theme';
import { PROJECTS, SERVICES } from '../lib/data';
import { AppHeader, Card, GhostButton, PrimaryButton, SectionTitle, T, Tag } from '../components/ui';
import { ProjectCard } from '../components/cards';
import { useStore } from '../lib/store';

export default function ServiceDetailScreen() {
  const { c, isDark } = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const service = SERVICES.find((s) => s.id === route.params?.id) ?? SERVICES[0];
  const { selectedServices, toggleService } = useStore();
  const added = selectedServices.includes(service.id);

  const related = PROJECTS.filter((p) =>
    service.id === 'mobile'
      ? p.category === 'Mobile'
      : service.id === 'ia'
      ? p.category === 'IA'
      : service.id === 'ecommerce'
      ? p.category === 'E-commerce'
      : p.category === 'Web'
  ).slice(0, 3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader title={service.category} subtitle="Service" onBack={() => nav.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: space.md, paddingTop: 8 }}>
          <LinearGradient
            colors={isDark ? [service.tint + '33', '#0E1018'] : [service.tint + '22', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.hero, { borderColor: c.border }, shadow(c, 2)]}
          >
            <View style={[styles.iconWrap, { backgroundColor: service.tint + '2E', borderColor: service.tint + '66' }]}>
              <Ionicons name={service.icon as any} size={26} color={service.tint} />
            </View>
            <T size={24} weight="900" style={{ marginTop: 14, letterSpacing: -0.5, lineHeight: 30 }}>
              {service.title}
            </T>
            <T size={14} color={c.muted} style={{ marginTop: 8, lineHeight: 21 }}>
              {service.description}
            </T>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              <Tag label={`À partir de ${service.priceFrom.toLocaleString('fr-FR')} MAD`} tint={service.tint} />
              <Tag label={service.duration} tint={c.muted} />
            </View>
          </LinearGradient>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, padding: space.md }}>
          {service.kpis.map((k) => (
            <View key={k.label} style={[styles.kpi, { backgroundColor: c.surface, borderColor: c.border }, shadow(c, 1)]}>
              <T size={17} weight="900" color={service.tint}>
                {k.value}
              </T>
              <T size={11} color={c.muted} numberOfLines={2}>
                {k.label}
              </T>
            </View>
          ))}
        </View>

        <SectionTitle title="Ce qui est livré" subtitle="Inclus dans chaque mission" />
        <Card style={{ marginHorizontal: space.md, gap: 12 }}>
          {service.deliverables.map((d) => (
            <View key={d} style={{ flexDirection: 'row', gap: 11, alignItems: 'flex-start' }}>
              <Ionicons name="checkmark-circle" size={19} color={service.tint} />
              <T size={14} style={{ flex: 1 }}>
                {d}
              </T>
            </View>
          ))}
        </Card>

        <SectionTitle title="Stack technique" subtitle="Des outils prouvés, pas expérimentaux" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: space.md }}>
          {service.stack.map((t) => (
            <View key={t} style={[styles.stackTag, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
              <T size={12.5} weight="700" color={c.muted}>
                {t}
              </T>
            </View>
          ))}
        </View>

        {related.length > 0 ? (
          <>
            <View style={{ height: space.lg }} />
            <SectionTitle title="Projets associés" subtitle="Ce que ça donne en vrai" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: space.md, gap: 12 }}
            >
              {related.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  width={260}
                  compact
                  onPress={() => nav.push('ProjectDetail', { id: p.id })}
                />
              ))}
            </ScrollView>
          </>
        ) : null}

        <View style={{ padding: space.md, gap: 10, marginTop: space.md }}>
          <PrimaryButton
            label={added ? 'Retirer de mon brief' : 'Ajouter à mon brief'}
            icon={added ? 'checkmark-done' : 'add-circle-outline'}
            gradient={!added}
            onPress={() => toggleService(service.id)}
          />
          <GhostButton label="Demander un devis" icon="paper-plane-outline" onPress={() => nav.navigate('Contact')} tint={c.primary} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.xl, padding: 22, borderWidth: StyleSheet.hairlineWidth },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  kpi: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 13,
    gap: 2,
  },
  stackTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
