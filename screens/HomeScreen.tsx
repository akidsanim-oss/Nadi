import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, Linking, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { brandGradient, radius, shadow, space, useTheme } from '../lib/theme';
import { CONTACT, PHASES, PROJECTS, SERVICES, STATS, TESTIMONIALS } from '../lib/data';
import { ProjectCard, ServiceCard, TestimonialCard } from '../components/cards';
import { Card, CountUp, GhostButton, IconButton, PrimaryButton, SectionTitle, Skeleton, Stars, T, Tag, useBottomPad } from '../components/ui';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W = Math.min(300, SCREEN_W * 0.78);

export default function HomeScreen() {
  const { c, isDark, mode, setMode } = useTheme();
  const nav = useNavigation<any>();
  const bottomPad = useBottomPad();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const openWhatsApp = () =>
    Linking.openURL(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Bonjour HelloWorld, je souhaite discuter d\u2019un projet.')}`
    ).catch(() => {});

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => nav.navigate('About')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <LinearGradient colors={brandGradient as any} style={styles.logo} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <T size={15} weight="900" color="#fff">
              {'</>'}
            </T>
          </LinearGradient>
          <View>
            <T size={16} weight="900" style={{ letterSpacing: -0.3 }}>
              HelloWorld
            </T>
            <T size={10.5} color={c.muted} weight="700" style={{ letterSpacing: 1.2 }}>
              AGENCY · MA · UK · AE
            </T>
          </View>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton icon={isDark ? 'sunny-outline' : 'moon-outline'} onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')} />
          <IconButton icon="logo-whatsapp" onPress={openWhatsApp} color="#25D366" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.primary} />}
      >
        {/* HERO */}
        <View style={{ paddingHorizontal: space.md, paddingTop: 6 }}>
          <LinearGradient
            colors={isDark ? ['#131A38', '#1B1240', '#0C1730'] : ['#EDF1FF', '#F3EDFF', '#E7F8FC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.hero, { borderColor: c.border }, shadow(c, 2)]}
          >
            <View style={[styles.heroBadge, { backgroundColor: c.primary + '26', borderColor: c.primary + '55' }]}>
              <View style={[styles.dot, { backgroundColor: c.success }]} />
              <T size={11.5} weight="800" color={c.primary}>
                Disponible · réponse sous 48 h
              </T>
            </View>
            <T size={30} weight="900" style={{ marginTop: 14, lineHeight: 36, letterSpacing: -0.8 }}>
              Des produits digitaux{'\n'}qui convertissent.
            </T>
            <T size={14.5} color={c.muted} style={{ marginTop: 10, lineHeight: 22 }}>
              Sites, applications mobiles et solutions IA sur mesure. Conçus à Marrakech, déployés de Londres à Dubaï.
            </T>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <PrimaryButton label="Démarrer un projet" icon="rocket-outline" onPress={() => nav.navigate('Contact')} style={{ flexGrow: 1 }} />
              <GhostButton label="Estimer mon budget" icon="calculator-outline" onPress={() => nav.navigate('Estimator')} style={{ flexGrow: 1 }} tint={c.text} />
            </View>
          </LinearGradient>
        </View>

        {/* STATS */}
        <View style={styles.statsGrid}>
          {loading
            ? [0, 1, 2, 3].map((i) => (
                <View key={i} style={[styles.statCard, { backgroundColor: c.surface, borderColor: c.border }]}>
                  <Skeleton height={26} width="60%" />
                  <View style={{ height: 8 }} />
                  <Skeleton height={11} width="85%" />
                </View>
              ))
            : STATS.map((s) => (
                <View key={s.id} style={[styles.statCard, { backgroundColor: c.surface, borderColor: c.border }, shadow(c, 1)]}>
                  <Ionicons name={s.icon as any} size={16} color={c.primary} style={{ marginBottom: 6 }} />
                  <CountUp value={s.value} suffix={s.suffix} decimals={(s as any).decimals ?? 0} size={26} />
                  <T size={11.8} color={c.muted} style={{ marginTop: 2 }}>
                    {s.label}
                  </T>
                </View>
              ))}
        </View>

        {/* SOCIAL PROOF BAR */}
        <Card style={{ marginHorizontal: space.md, marginBottom: space.lg, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flexDirection: 'row' }}>
            {['#5B7CFF', '#22D3EE', '#A78BFA', '#FF7A59'].map((t, i) => (
              <View
                key={t}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: t,
                  marginLeft: i === 0 ? 0 : -10,
                  borderWidth: 2,
                  borderColor: c.surface,
                }}
              />
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Stars rating={5} size={13} />
              <T size={12.5} weight="800">
                4,9/5
              </T>
            </View>
            <T size={12} color={c.muted}>
              Plus de 1 000 clients accompagnés depuis 2018
            </T>
          </View>
          <Pressable onPress={() => nav.navigate('Avis')} hitSlop={8}>
            <Ionicons name="arrow-forward-circle" size={26} color={c.primary} />
          </Pressable>
        </Card>

        {/* SERVICES */}
        <SectionTitle
          title="Ce que nous faisons"
          subtitle="Build, growth et intelligence artificielle"
          actionLabel="Tout voir"
          onAction={() => nav.navigate('Services')}
        />
        <View style={{ paddingHorizontal: space.md, gap: 10, marginBottom: space.lg }}>
          {SERVICES.slice(0, 3).map((s) => (
            <ServiceCard key={s.id} service={s} onPress={() => nav.navigate('ServiceDetail', { id: s.id })} />
          ))}
        </View>

        {/* PROJECTS */}
        <SectionTitle
          title="Références récentes"
          subtitle="Des résultats mesurés, pas des promesses"
          actionLabel="Portfolio"
          onAction={() => nav.navigate('Projets')}
        />
        {loading ? (
          <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: space.md, marginBottom: space.lg }}>
            {[0, 1].map((i) => (
              <View key={i} style={{ width: CARD_W, gap: 10 }}>
                <Skeleton height={168} rounded={22} />
                <Skeleton height={14} width="80%" />
                <Skeleton height={12} width="55%" />
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            horizontal
            data={PROJECTS}
            keyExtractor={(p) => p.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: space.md, gap: 12, paddingBottom: 4 }}
            style={{ marginBottom: space.lg }}
            snapToInterval={CARD_W + 12}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <ProjectCard project={item} width={CARD_W} onPress={() => nav.navigate('ProjectDetail', { id: item.id })} />
            )}
          />
        )}

        {/* METHOD */}
        <SectionTitle
          title="Notre méthode"
          subtitle="4 phases, 9 semaines, zéro effet tunnel"
          actionLabel="Détail"
          onAction={() => nav.navigate('Process')}
        />
        <Card style={{ marginHorizontal: space.md, marginBottom: space.lg, gap: 2 }} onPress={() => nav.navigate('Process')}>
          {PHASES.map((p, i) => (
            <View key={p.id} style={{ flexDirection: 'row', gap: 14 }}>
              <View style={{ alignItems: 'center', width: 34 }}>
                <View style={[styles.phaseDot, { backgroundColor: p.tint + '26', borderColor: p.tint }]}>
                  <Ionicons name={p.icon as any} size={14} color={p.tint} />
                </View>
                {i < PHASES.length - 1 ? <View style={{ flex: 1, width: 2, backgroundColor: c.border, marginVertical: 2 }} /> : null}
              </View>
              <View style={{ flex: 1, paddingBottom: i < PHASES.length - 1 ? 16 : 0 }}>
                <T size={11} weight="800" color={p.tint} style={{ letterSpacing: 0.6 }}>
                  {p.weeks.toUpperCase()}
                </T>
                <T size={15} weight="800" style={{ marginTop: 1 }}>
                  {p.title}
                </T>
                <T size={12.5} color={c.muted} numberOfLines={2} style={{ marginTop: 2 }}>
                  {p.summary}
                </T>
              </View>
            </View>
          ))}
        </Card>

        {/* TESTIMONIALS */}
        <SectionTitle
          title="Ils en parlent mieux que nous"
          subtitle="Avis vérifiés de nos clients"
          actionLabel="Tous les avis"
          onAction={() => nav.navigate('Avis')}
        />
        <FlatList
          horizontal
          data={TESTIMONIALS.slice(0, 5)}
          keyExtractor={(t) => t.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: space.md, gap: 12 }}
          style={{ marginBottom: space.lg }}
          snapToInterval={CARD_W + 12}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <TestimonialCard
              item={item}
              width={CARD_W}
              onPressProject={item.project ? () => nav.navigate('ProjectDetail', { id: item.project }) : undefined}
            />
          )}
        />

        {/* CTA */}
        <View style={{ paddingHorizontal: space.md }}>
          <LinearGradient
            colors={brandGradient as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.cta, shadow(c, 3)]}
          >
            <T size={22} weight="900" color="#fff" style={{ letterSpacing: -0.4 }}>
              Parlons de votre projet
            </T>
            <T size={14} color="rgba(255,255,255,0.86)" style={{ marginTop: 6, lineHeight: 21 }}>
              Un cadrage gratuit de 30 minutes, une estimation claire et un planning ferme. Réponse garantie sous 48 heures.
            </T>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <Pressable onPress={() => nav.navigate('Contact')} style={[styles.ctaBtn, { backgroundColor: '#fff' }]}>
                <Ionicons name="document-text-outline" size={17} color="#101426" />
                <T size={14.5} weight="800" color="#101426">
                  Envoyer un brief
                </T>
              </Pressable>
              <Pressable onPress={openWhatsApp} style={[styles.ctaBtn, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
                <Ionicons name="logo-whatsapp" size={17} color="#fff" />
                <T size={14.5} weight="800" color="#fff">
                  WhatsApp
                </T>
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              {['Marrakech', 'Londres', 'Dubaï'].map((city) => (
                <View key={city} style={styles.cityPill}>
                  <Ionicons name="location-outline" size={12} color="#fff" />
                  <T size={11.5} weight="700" color="#fff">
                    {city}
                  </T>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={{ alignItems: 'center', paddingVertical: 26, gap: 4 }}>
          <Tag label="HelloWorld Agency · depuis 2018" tint={c.faint} />
          <T size={11.5} color={c.faint}>
            {CONTACT.email}
          </T>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.md,
    paddingBottom: 10,
  },
  logo: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  hero: { borderRadius: radius.xl, padding: 22, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: space.md,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '46%',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
  },
  phaseDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cta: { borderRadius: radius.xl, padding: 24 },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 999,
    flexGrow: 1,
    justifyContent: 'center',
  },
  cityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
});
