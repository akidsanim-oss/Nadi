import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { radius, space, useTheme } from '../lib/theme';
import { PROJECTS } from '../lib/data';
import { ProjectCard } from '../components/cards';
import { AppHeader, Chip, EmptyState, IconButton, Skeleton, T, useBottomPad } from '../components/ui';
import { useStore } from '../lib/store';

const CATS = ['Tout', 'Web', 'Mobile', 'E-commerce', 'IA'] as const;

export default function ProjectsScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const bottomPad = useBottomPad();
  const { saved } = useStore();
  const [cat, setCat] = useState<(typeof CATS)[number]>('Tout');
  const [query, setQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 850);
  }, []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (cat !== 'Tout' && p.category !== cat) return false;
      if (onlySaved && !saved.includes(p.id)) return false;
      if (!q) return true;
      return (
        p.client.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.join(' ').toLowerCase().includes(q)
      );
    });
  }, [cat, query, onlySaved, saved]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader
        title="Réalisations"
        subtitle={`${PROJECTS.length} études de cas · 120+ sites livrés`}
        right={
          <IconButton
            icon={onlySaved ? 'bookmark' : 'bookmark-outline'}
            onPress={() => setOnlySaved((s) => !s)}
            color={onlySaved ? c.primary : c.text}
            bg={onlySaved ? c.primarySoft : undefined}
          />
        }
      />

      <View style={{ paddingHorizontal: space.md, paddingTop: 12, gap: 12 }}>
        <View style={[styles.search, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Ionicons name="search" size={17} color={c.faint} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Rechercher un client, un secteur, une techno…"
            placeholderTextColor={c.faint}
            returnKeyType="search"
            style={[{ flex: 1, color: c.text, fontSize: 14.5 }, { outlineStyle: 'none' } as any]}
          />
          {query.length > 0 ? (
            <Ionicons name="close-circle" size={17} color={c.faint} onPress={() => setQuery('')} />
          ) : null}
        </View>
        <FlatList
          horizontal
          data={CATS as unknown as string[]}
          keyExtractor={(i) => i}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 10 }}
          renderItem={({ item }) => (
            <Chip label={item} active={cat === item} onPress={() => setCat(item as any)} />
          )}
        />
      </View>

      {loading ? (
        <View style={{ padding: space.md, gap: 16 }}>
          {[0, 1].map((i) => (
            <View key={i} style={{ gap: 10 }}>
              <Skeleton height={168} rounded={22} />
              <Skeleton height={14} width="70%" />
              <Skeleton height={12} width="45%" />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(p) => p.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: space.md, paddingBottom: bottomPad, gap: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.primary} />}
          ListHeaderComponent={
            <T size={12.5} color={c.muted} weight="600">
              {data.length} projet{data.length > 1 ? 's' : ''} {onlySaved ? 'sauvegardés' : 'affichés'}
            </T>
          }
          ListEmptyComponent={
            <EmptyState
              icon={onlySaved ? 'bookmark-outline' : 'search-outline'}
              title={onlySaved ? 'Aucun projet sauvegardé' : 'Aucun résultat'}
              message={
                onlySaved
                  ? 'Touchez le marque-page sur une étude de cas pour la retrouver ici.'
                  : 'Essayez un autre mot-clé ou changez de catégorie.'
              }
              actionLabel="Réinitialiser"
              onAction={() => {
                setQuery('');
                setCat('Tout');
                setOnlySaved(false);
              }}
            />
          }
          renderItem={({ item }) => (
            <ProjectCard project={item} onPress={() => nav.navigate('ProjectDetail', { id: item.id })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
});
