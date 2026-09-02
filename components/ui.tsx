import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { brandGradient, radius, shadow, space, useTheme } from '../lib/theme';

/* ---------------------------------- Text --------------------------------- */

export function T({
  children,
  size = 15,
  weight = '500',
  color,
  style,
  numberOfLines,
  center,
}: {
  children: React.ReactNode;
  size?: number;
  weight?: '400' | '500' | '600' | '700' | '800' | '900';
  color?: string;
  style?: any;
  numberOfLines?: number;
  center?: boolean;
}) {
  const { c } = useTheme();
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: color ?? c.text,
          fontSize: size,
          fontWeight: weight,
          lineHeight: size * 1.42,
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/* --------------------------------- Header -------------------------------- */

export function AppHeader({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  const { c } = useTheme();
  return (
    <View style={[styles.header, { borderBottomColor: c.border, backgroundColor: c.bg }]}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={12}
          style={({ pressed }) => [
            styles.backBtn,
            { backgroundColor: c.surfaceAlt, borderColor: c.border, opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={20} color={c.text} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <T size={20} weight="800" numberOfLines={1}>
          {title}
        </T>
        {subtitle ? (
          <T size={12.5} color={c.muted} numberOfLines={1}>
            {subtitle}
          </T>
        ) : null}
      </View>
      {right}
    </View>
  );
}

/* ---------------------------------- Card --------------------------------- */

export function Card({
  children,
  style,
  onPress,
  level = 1,
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  level?: 1 | 2 | 3;
}) {
  const { c } = useTheme();
  const base: ViewStyle = {
    backgroundColor: c.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: c.border,
    padding: space.md,
    ...shadow(c, level),
  };
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [base, style, pressed && { opacity: 0.9, transform: [{ scale: 0.994 }] }]}
    >
      {children}
    </Pressable>
  );
}

/* -------------------------------- Section -------------------------------- */

export function SectionTitle({
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { c } = useTheme();
  return (
    <View style={styles.sectionRow}>
      <View style={{ flex: 1 }}>
        <T size={19} weight="800">
          {title}
        </T>
        {subtitle ? (
          <T size={13} color={c.muted} style={{ marginTop: 2 }}>
            {subtitle}
          </T>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={10} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <T size={13} weight="700" color={c.primary}>
            {actionLabel}
          </T>
          <Ionicons name="chevron-forward" size={14} color={c.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

/* --------------------------------- Chips --------------------------------- */

export function Chip({
  label,
  active,
  onPress,
  icon,
  tint,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: string;
  tint?: string;
}) {
  const { c } = useTheme();
  const accent = tint ?? c.primary;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? accent : c.surface,
          borderColor: active ? accent : c.border,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      {icon ? (
        <Ionicons name={icon as any} size={14} color={active ? '#fff' : c.muted} style={{ marginRight: 5 }} />
      ) : null}
      <Text style={{ color: active ? '#fff' : c.muted, fontWeight: '700', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}

export function Tag({ label, tint }: { label: string; tint?: string }) {
  const { c } = useTheme();
  const accent = tint ?? c.primary;
  return (
    <View style={[styles.tag, { backgroundColor: accent + '22', borderColor: accent + '55' }]}>
      <Text style={{ color: accent, fontSize: 11.5, fontWeight: '800', letterSpacing: 0.2 }}>{label}</Text>
    </View>
  );
}

/* -------------------------------- Buttons -------------------------------- */

export function PrimaryButton({
  label,
  onPress,
  icon,
  loading,
  disabled,
  style,
  gradient = true,
}: {
  label: string;
  onPress: () => void;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  gradient?: boolean;
}) {
  const { c } = useTheme();
  const content = (
    <View style={styles.btnInner}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          {icon ? <Ionicons name={icon as any} size={17} color="#fff" /> : null}
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15.5 }}>{label}</Text>
        </>
      )}
    </View>
  );
  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [
        { borderRadius: radius.pill, overflow: 'hidden', opacity: disabled ? 0.45 : pressed ? 0.88 : 1 },
        shadow(c, 2),
        style,
      ]}
    >
      {gradient ? (
        <LinearGradient colors={brandGradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          {content}
        </LinearGradient>
      ) : (
        <View style={{ backgroundColor: c.primary }}>{content}</View>
      )}
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
  icon,
  style,
  tint,
}: {
  label: string;
  onPress: () => void;
  icon?: string;
  style?: ViewStyle;
  tint?: string;
}) {
  const { c } = useTheme();
  const accent = tint ?? c.text;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.ghost,
        { borderColor: c.border, backgroundColor: c.surface, opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon as any} size={17} color={accent} /> : null}
      <Text style={{ color: accent, fontWeight: '700', fontSize: 14.5 }}>{label}</Text>
    </Pressable>
  );
}

export function IconButton({
  icon,
  onPress,
  color,
  bg,
}: {
  icon: string;
  onPress: () => void;
  color?: string;
  bg?: string;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.iconBtn,
        { backgroundColor: bg ?? c.surfaceAlt, borderColor: c.border, opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <Ionicons name={icon as any} size={18} color={color ?? c.text} />
    </Pressable>
  );
}

/* --------------------------------- Stars --------------------------------- */

export function Stars({ rating, size = 14, onRate }: { rating: number; size?: number; onRate?: (n: number) => void }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(rating);
        const star = (
          <Ionicons key={n} name={filled ? 'star' : 'star-outline'} size={size} color={filled ? c.star : c.faint} />
        );
        return onRate ? (
          <Pressable key={n} onPress={() => onRate(n)} hitSlop={6}>
            {star}
          </Pressable>
        ) : (
          star
        );
      })}
    </View>
  );
}

/* -------------------------------- Avatar --------------------------------- */

export function Avatar({ initials, tint, size = 44 }: { initials: string; tint: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tint + '26',
        borderWidth: 1,
        borderColor: tint + '66',
      }}
    >
      <Text style={{ color: tint, fontWeight: '800', fontSize: size * 0.36 }}>{initials}</Text>
    </View>
  );
}

/* ------------------------------- Count up -------------------------------- */

export function CountUp({
  value,
  decimals = 0,
  suffix = '',
  size = 26,
  color,
  duration = 1200,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  size?: number;
  color?: string;
  duration?: number;
}) {
  const { c } = useTheme();
  const [display, setDisplay] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const id = anim.addListener(({ value: v }) => setDisplay(v * value));
    Animated.timing(anim, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => anim.removeListener(id);
  }, [value]);

  const text = decimals > 0 ? display.toFixed(decimals).replace('.', ',') : Math.round(display).toString();

  return (
    <Text style={{ color: color ?? c.text, fontSize: size, fontWeight: '900', letterSpacing: -0.6 }}>
      {text}
      <Text style={{ fontSize: size * 0.62, fontWeight: '800' }}>{suffix}</Text>
    </Text>
  );
}

/* ------------------------------- Skeleton -------------------------------- */

export function Skeleton({ height = 16, width = '100%', rounded = 10 }: { height?: number; width?: any; rounded?: number }) {
  const { c } = useTheme();
  const anim = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 750, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(anim, { toValue: 0.4, duration: 750, useNativeDriver: Platform.OS !== 'web' }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return (
    <Animated.View
      style={{ height, width, borderRadius: rounded, backgroundColor: c.surfaceAlt, opacity: anim }}
    />
  );
}

/* ------------------------------ Empty state ------------------------------ */

export function EmptyState({
  icon = 'search',
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { c } = useTheme();
  return (
    <View style={{ alignItems: 'center', paddingVertical: 54, paddingHorizontal: 30 }}>
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: c.surfaceAlt,
          marginBottom: 14,
        }}
      >
        <Ionicons name={icon as any} size={30} color={c.faint} />
      </View>
      <T size={17} weight="800" center>
        {title}
      </T>
      <T size={13.5} color={c.muted} center style={{ marginTop: 6 }}>
        {message}
      </T>
      {actionLabel && onAction ? (
        <GhostButton label={actionLabel} onPress={onAction} style={{ marginTop: 16 }} tint={c.primary} />
      ) : null}
    </View>
  );
}

/* --------------------------------- Field --------------------------------- */

export function Field({
  label,
  error,
  icon,
  style,
  ...props
}: TextInputProps & { label: string; error?: string; icon?: string; style?: any }) {
  const { c } = useTheme();
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ marginBottom: 14 }}>
      <T size={12.5} weight="700" color={c.muted} style={{ marginBottom: 6, letterSpacing: 0.3 }}>
        {label.toUpperCase()}
      </T>
      <View
        style={[
          styles.field,
          {
            backgroundColor: c.surface,
            borderColor: error ? c.danger : focus ? c.primary : c.border,
          },
        ]}
      >
        {icon ? <Ionicons name={icon as any} size={17} color={focus ? c.primary : c.faint} /> : null}
        <TextInput
          {...props}
          onFocus={(e) => {
            setFocus(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor={c.faint}
          style={[
            {
              flex: 1,
              color: c.text,
              fontSize: 15,
              fontWeight: '500',
              paddingVertical: Platform.OS === 'web' ? 6 : 2,
              outlineStyle: 'none',
            } as any,
            style,
          ]}
        />
      </View>
      {error ? (
        <T size={12} color={c.danger} style={{ marginTop: 5 }}>
          {error}
        </T>
      ) : null}
    </View>
  );
}

/* ------------------------------ Screen shell ----------------------------- */

export function Divider() {
  const { c } = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: c.border, marginVertical: space.md }} />;
}

export function HScroll({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: space.md, gap: 10 }}
      style={style}
    >
      {children}
    </ScrollView>
  );
}

export function useBottomPad() {
  const insets = useSafeAreaInsets();
  return insets.bottom + 92;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: space.md,
    paddingBottom: 12,
    paddingTop: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: space.md,
    marginBottom: 12,
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  ghost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 10 : 13,
  },
});
