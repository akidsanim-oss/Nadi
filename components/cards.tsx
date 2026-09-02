import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { radius, shadow, space, useTheme } from '../lib/theme';
import { Avatar, Card, Stars, T, Tag } from './ui';
import type { Project, Service, Testimonial } from '../lib/data';
import { useStore } from '../lib/store';

export function ProjectCard({
  project,
  onPress,
  width,
  compact,
}: {
  project: Project;
  onPress: () => void;
  width?: number;
  compact?: boolean;
}) {
  const { c } = useTheme();
  const { isSaved, toggleSaved } = useStore();
  const saved = isSaved(project.id);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width,
          borderRadius: radius.lg,
          overflow: 'hidden',
          backgroundColor: c.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: c.border,
          opacity: pressed ? 0.92 : 1,
        },
        shadow(c, 2),
      ]}
    >
      <View style={{ height: compact ? 128 : 168, backgroundColor: c.surfaceAlt }}>
        <Image
          source={{ uri: project.cover }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={280}
        />
        <LinearGradient
          colors={['transparent', 'rgba(4,6,12,0.86)']}
          style={StyleSheet.absoluteFill as any}
        />
        <View style={styles.coverTop}>
          <View style={[styles.pill, { backgroundColor: project.accent }]}>
            <T size={11} weight="800" color="#0A0C12">
              {project.category}
            </T>
          </View>
          <Pressable
            onPress={() => toggleSaved(project.id)}
            hitSlop={10}
            style={[styles.saveBtn, { backgroundColor: 'rgba(10,12,18,0.6)' }]}
          >
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={15} color={saved ? project.accent : '#fff'} />
          </Pressable>
        </View>
        <View style={styles.coverBottom}>
          <T size={17} weight="800" color="#fff" numberOfLines={1}>
            {project.client}
          </T>
          <T size={12} color="rgba(255,255,255,0.75)" numberOfLines={1}>
            {project.sector} · {project.city} · {project.year}
          </T>
        </View>
      </View>
      <View style={{ padding: space.md, gap: 10 }}>
        <T size={13.5} color={c.muted} numberOfLines={2}>
          {project.tagline}
        </T>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {project.results.slice(0, 2).map((r) => (
            <View
              key={r.label}
              style={[styles.kpi, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}
            >
              <T size={13} weight="900" color={project.accent}>
                {r.value}
              </T>
              <T size={11} color={c.muted}>
                {r.label}
              </T>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

export function ServiceCard({ service, onPress }: { service: Service; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Card onPress={onPress} style={{ padding: space.md }}>
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: service.tint + '22',
            borderWidth: 1,
            borderColor: service.tint + '44',
          }}
        >
          <Ionicons name={service.icon as any} size={23} color={service.tint} />
        </View>
        <View style={{ flex: 1 }}>
          <T size={15.5} weight="800" numberOfLines={1}>
            {service.title}
          </T>
          <T size={12.8} color={c.muted} numberOfLines={2} style={{ marginTop: 2 }}>
            {service.short}
          </T>
        </View>
        <Ionicons name="chevron-forward" size={18} color={c.faint} />
      </View>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, alignItems: 'center' }}>
        <Tag label={`dès ${service.priceFrom.toLocaleString('fr-FR')} MAD`} tint={service.tint} />
        <Tag label={service.duration} tint={c.muted} />
      </View>
    </Card>
  );
}

export function TestimonialCard({
  item,
  onPressProject,
  width,
}: {
  item: Testimonial;
  onPressProject?: () => void;
  width?: number;
}) {
  const { c } = useTheme();
  const { liked, toggleLike } = useStore();
  const isLiked = liked.includes(item.id);
  const initials = item.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Card style={{ width, gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar initials={initials} tint={item.tint} />
        <View style={{ flex: 1 }}>
          <T size={14.5} weight="800" numberOfLines={1}>
            {item.name}
          </T>
          <T size={12} color={c.muted} numberOfLines={1}>
            {item.role} · {item.company}
          </T>
        </View>
        <Ionicons name="logo-google" size={15} color={c.faint} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Stars rating={item.rating} />
        <T size={11.5} color={c.faint}>
          {item.date}
        </T>
      </View>
      <T size={13.8} color={c.muted} style={{ lineHeight: 21 }}>
        « {item.text} »
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable
          onPress={() => toggleLike(item.id)}
          hitSlop={8}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
        >
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={17} color={isLiked ? c.danger : c.faint} />
          <T size={12} color={isLiked ? c.danger : c.faint} weight="700">
            Utile
          </T>
        </Pressable>
        {item.project && onPressProject ? (
          <Pressable onPress={onPressProject} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="albums-outline" size={15} color={c.primary} />
            <T size={12} weight="700" color={c.primary}>
              Voir le projet
            </T>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  coverTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverBottom: { position: 'absolute', left: 14, right: 14, bottom: 12 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  saveBtn: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  kpi: {
    flex: 1,
    minWidth: 100,
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
