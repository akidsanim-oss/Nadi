import React, { useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { radius, shadow, space, useTheme } from '../lib/theme';
import { TESTIMONIALS, Testimonial } from '../lib/data';
import { TestimonialCard } from '../components/cards';
import { AppHeader, Card, Chip, EmptyState, Field, PrimaryButton, Stars, T, useBottomPad } from '../components/ui';
import { useStore } from '../lib/store';

const FILTERS = ['Tous', '5 étoiles', 'Avec projet', 'Mes avis'] as const;

export default function TestimonialsScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const bottomPad = useBottomPad();
  const { reviews, addReview } = useStore();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Tous');
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const mine: Testimonial[] = useMemo(
    () =>
      reviews.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role || 'Client',
        company: r.company || '—',
        rating: r.rating,
        date: new Date(r.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        text: r.text,
        tint: '#5B7CFF',
      })),
    [reviews]
  );

  const all = useMemo(() => [...mine, ...TESTIMONIALS], [mine]);

  const data = useMemo(() => {
    if (filter === '5 étoiles') return all.filter((t) => t.rating === 5);
    if (filter === 'Avec projet') return all.filter((t) => !!t.project);
    if (filter === 'Mes avis') return mine;
    return all;
  }, [filter, all, mine]);

  const avg = (all.reduce((s, t) => s + t.rating, 0) / all.length).toFixed(1).replace('.', ',');
  const distribution = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: all.filter((t) => t.rating === n).length,
  }));

  const submit = () => {
    if (name.trim().length < 2) return setError('Merci d’indiquer votre nom.');
    if (text.trim().length < 15) return setError('Votre avis doit contenir au moins 15 caractères.');
    addReview({ name: name.trim(), company: company.trim(), role: role.trim(), rating, text: text.trim() });
    setName('');
    setCompany('');
    setRole('');
    setText('');
    setRating(5);
    setError('');
    setOpen(false);
    setFilter('Mes avis');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader title="Avis clients" subtitle={`${all.length} témoignages vérifiés`} />
      <FlatList
        data={data}
        keyExtractor={(t) => t.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: space.md, paddingBottom: bottomPad, gap: 12 }}
        ListHeaderComponent={
          <View style={{ gap: 14 }}>
            <Card style={{ flexDirection: 'row', gap: 18, alignItems: 'center' }} level={2}>
              <View style={{ alignItems: 'center', gap: 4 }}>
                <T size={38} weight="900" style={{ letterSpacing: -1.5 }}>
                  {avg}
                </T>
                <Stars rating={5} size={13} />
                <T size={11} color={c.muted}>
                  {all.length} avis
                </T>
              </View>
              <View style={{ flex: 1, gap: 5 }}>
                {distribution.map((d) => (
                  <View key={d.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <T size={11} color={c.muted} weight="700">
                      {d.n}★
                    </T>
                    <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: c.surfaceAlt }}>
                      <View
                        style={{
                          width: `${(d.count / all.length) * 100}%`,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: d.n >= 4 ? c.star : c.faint,
                        }}
                      />
                    </View>
                    <T size={11} color={c.faint} style={{ width: 18, textAlign: 'right' }}>
                      {d.count}
                    </T>
                  </View>
                ))}
              </View>
            </Card>

            <Pressable onPress={() => setOpen(true)} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
              <View style={[styles.addBar, { backgroundColor: c.primarySoft, borderColor: c.primary + '55' }]}>
                <Ionicons name="create-outline" size={18} color={c.primary} />
                <T size={13.5} weight="800" color={c.primary}>
                  Laisser un avis sur votre expérience
                </T>
              </View>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {FILTERS.map((f) => (
                <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
              ))}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="chatbubble-ellipses-outline"
            title="Aucun avis ici"
            message="Vous n’avez pas encore publié d’avis. Partagez votre expérience en quelques lignes."
            actionLabel="Écrire un avis"
            onAction={() => setOpen(true)}
          />
        }
        renderItem={({ item }) => (
          <TestimonialCard
            item={item}
            onPressProject={item.project ? () => nav.navigate('ProjectDetail', { id: item.project }) : undefined}
          />
        )}
      />

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, backgroundColor: c.overlay, justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={[styles.sheet, { backgroundColor: c.bgElevated, borderColor: c.border }, shadow(c, 3)]}>
              <View style={{ alignItems: 'center', marginBottom: 12 }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.border }} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                <T size={19} weight="900" style={{ flex: 1 }}>
                  Votre avis
                </T>
                <Pressable onPress={() => setOpen(false)} hitSlop={10}>
                  <Ionicons name="close" size={22} color={c.muted} />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
                <View style={{ alignItems: 'center', marginBottom: 16, gap: 8 }}>
                  <Stars rating={rating} size={30} onRate={setRating} />
                  <T size={12.5} color={c.muted}>
                    {['Très déçu', 'Déçu', 'Correct', 'Satisfait', 'Excellent'][rating - 1]}
                  </T>
                </View>
                <Field label="Nom" value={name} onChangeText={setName} placeholder="Votre nom" icon="person-outline" />
                <Field label="Entreprise" value={company} onChangeText={setCompany} placeholder="Nom de la société" icon="business-outline" />
                <Field label="Fonction" value={role} onChangeText={setRole} placeholder="Ex : Directrice marketing" icon="briefcase-outline" />
                <Field
                  label="Votre expérience"
                  value={text}
                  onChangeText={setText}
                  placeholder="Racontez comment le projet s’est passé…"
                  multiline
                  numberOfLines={4}
                  error={error}
                  style={{ height: 96, textAlignVertical: 'top' }}
                />
                <PrimaryButton label="Publier mon avis" icon="send" onPress={submit} />
                <View style={{ height: 20 }} />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    padding: space.lg,
    paddingBottom: 28,
  },
});
