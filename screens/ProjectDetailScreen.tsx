import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { radius, shadow, space, useTheme } from '../lib/theme';
import { CONTACT, PROJECTS, TESTIMONIALS } from '../lib/data';
import { Card, GhostButton, PrimaryButton, SectionTitle, T } from '../components/ui';
import { TestimonialCard } from '../components/cards';
import { useStore } from '../lib/store';

export default function ProjectDetailScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const project = PROJECTS.find((p) => p.id === route.params?.id) ?? PROJECTS[0];
  const { isSaved, toggleSaved } = useStore();
  const saved = isSaved(project.id);
  const testimonial = TESTIMONIALS.find((t) => t.project === project.id);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ height: 300 }}>
          <Image source={{ uri: project.cover }} style={StyleSheet.absoluteFill as any} contentFit="cover" transition={300} />
          <LinearGradient
            colors={['rgba(4,6,12,0.75)', 'rgba(4,6,12,0.15)', c.bg]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill as any}
          />
          <SafeAreaView edges={['top']} style={styles.navRow}>
            <Pressable onPress={() => nav.goBack()} style={styles.circleBtn}>
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </Pressable>
            <Pressable onPress={() => toggleSaved(project.id)} style={styles.circleBtn}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? project.accent : '#fff'} />
            </Pressable>
          </SafeAreaView>
          <View style={{ position: 'absolute', left: space.md, right: space.md, bottom: 16 }}>
            <View style={[styles.pill, { backgroundColor: project.accent }]}>
              <T size={11} weight="900" color="#0A0C12">
                {project.category.toUpperCase()} · {project.year}
              </T>
            </View>
            <T size={27} weight="900" color="#fff" style={{ marginTop: 10, letterSpacing: -0.6 }}>
              {project.client}
            </T>
            <T size={13.5} color="rgba(255,255,255,0.8)" style={{ marginTop: 2 }}>
              {project.sector} · {project.city} · {project.duration}
            </T>
          </View>
        </View>

        <View style={{ paddingHorizontal: space.md, marginTop: 6 }}>
          <T size={17.5} weight="800" style={{ lineHeight: 25 }}>
            {project.tagline}
          </T>
        </View>

        <View style={styles.resultsGrid}>
          {project.results.map((r) => (
            <View key={r.label} style={[styles.result, { backgroundColor: c.surface, borderColor: c.border }, shadow(c, 1)]}>
              <T size={20} weight="900" color={project.accent}>
                {r.value}
              </T>
              <T size={11.5} color={c.muted} numberOfLines={2}>
                {r.label}
              </T>
            </View>
          ))}
        </View>

        <SectionTitle title="Le contexte" />
        <Card style={{ marginHorizontal: space.md }}>
          <T size={14} color={c.muted} style={{ lineHeight: 22 }}>
            {project.challenge}
          </T>
        </Card>

        <View style={{ height: space.lg }} />
        <SectionTitle title="Ce que nous avons livré" />
        <Card style={{ marginHorizontal: space.md, gap: 13 }}>
          {project.solution.map((s, i) => (
            <View key={s} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View style={[styles.num, { backgroundColor: project.accent + '22', borderColor: project.accent + '55' }]}>
                <T size={11.5} weight="900" color={project.accent}>
                  {i + 1}
                </T>
              </View>
              <T size={14} style={{ flex: 1 }}>
                {s}
              </T>
            </View>
          ))}
        </Card>

        <View style={{ height: space.lg }} />
        <SectionTitle title="Stack" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: space.md }}>
          {project.stack.map((t) => (
            <View key={t} style={[styles.stackTag, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
              <T size={12.5} weight="700" color={c.muted}>
                {t}
              </T>
            </View>
          ))}
        </View>

        {testimonial ? (
          <>
            <View style={{ height: space.lg }} />
            <SectionTitle title="Le mot du client" />
            <View style={{ paddingHorizontal: space.md }}>
              <TestimonialCard item={testimonial} />
            </View>
          </>
        ) : null}

        <View style={{ padding: space.md, gap: 10, marginTop: space.md }}>
          <PrimaryButton
            label="Je veux un résultat similaire"
            icon="flash-outline"
            onPress={() => nav.navigate('Contact')}
          />
          <GhostButton
            label="En parler sur WhatsApp"
            icon="logo-whatsapp"
            tint="#25D366"
            onPress={() =>
              Linking.openURL(
                `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                  `Bonjour, j\u2019ai vu le projet ${project.client} et je souhaite un accompagnement similaire.`
                )}`
              ).catch(() => {})
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: space.md,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(10,12,18,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: space.md,
  },
  result: {
    flexGrow: 1,
    flexBasis: '45%',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    gap: 2,
  },
  num: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  stackTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
