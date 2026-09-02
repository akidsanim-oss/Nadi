import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { brandGradient, radius, shadow, space, useTheme } from '../lib/theme';
import { CONTACT, OFFICES, SERVICES } from '../lib/data';
import { AppHeader, Card, Chip, Field, GhostButton, PrimaryButton, SectionTitle, T, useBottomPad } from '../components/ui';
import { useStore } from '../lib/store';

const BUDGETS = ['< 30k MAD', '30 – 60k', '60 – 120k', '120k +', 'À définir'];
const DEADLINES = ['Urgent (< 1 mois)', '1 – 3 mois', '3 – 6 mois', 'Pas encore fixé'];

export default function ContactScreen() {
  const { c } = useTheme();
  const nav = useNavigation<any>();
  const bottomPad = useBottomPad();
  const { briefs, addBrief, removeBrief, selectedServices, toggleService, setSelectedServices } = useStore();

  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [deadline, setDeadline] = useState(DEADLINES[1]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const openWhatsApp = () =>
    Linking.openURL(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Bonjour HelloWorld !')}`).catch(() => {});
  const call = () => Linking.openURL(`tel:${CONTACT.phone}`).catch(() => {});
  const mail = () => Linking.openURL(`mailto:${CONTACT.email}`).catch(() => {});

  const next = () => {
    if (step === 0) {
      if (selectedServices.length === 0) {
        setErrors({ services: 'Sélectionnez au moins un service.' });
        return;
      }
      setErrors({});
      setStep(1);
      return;
    }
    if (step === 1) {
      if (message.trim().length < 20) {
        setErrors({ message: 'Décrivez votre projet en 20 caractères minimum.' });
        return;
      }
      setErrors({});
      setStep(2);
    }
  };

  const submit = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = 'Votre nom est requis.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Adresse e-mail invalide.';
    if (phone.trim().replace(/\D/g, '').length < 8) e.phone = 'Numéro de téléphone invalide.';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSending(true);
    setTimeout(() => {
      const brief = addBrief({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        services: [...selectedServices],
        budget,
        deadline,
        message: message.trim(),
      });
      setSending(false);
      setSent(brief.id);
      setStep(0);
      setMessage('');
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setSelectedServices([]);
    }, 900);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <AppHeader title="Parlons projet" subtitle="Réponse garantie sous 48 heures" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: bottomPad }}
        >
          <View style={{ flexDirection: 'row', gap: 10, padding: space.md }}>
            {[
              { icon: 'logo-whatsapp', label: 'WhatsApp', tint: '#25D366', action: openWhatsApp },
              { icon: 'call', label: 'Appeler', tint: c.primary, action: call },
              { icon: 'mail', label: 'E-mail', tint: c.warm, action: mail },
            ].map((q) => (
              <Pressable
                key={q.label}
                onPress={q.action}
                style={({ pressed }) => [
                  styles.quick,
                  { backgroundColor: c.surface, borderColor: c.border, opacity: pressed ? 0.8 : 1 },
                  shadow(c, 1),
                ]}
              >
                <View style={[styles.quickIcon, { backgroundColor: q.tint + '1F' }]}>
                  <Ionicons name={q.icon as any} size={19} color={q.tint} />
                </View>
                <T size={12.5} weight="700">
                  {q.label}
                </T>
              </Pressable>
            ))}
          </View>

          {sent ? (
            <View style={{ paddingHorizontal: space.md, marginBottom: space.md }}>
              <LinearGradient colors={brandGradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.success, shadow(c, 2)]}>
                <Ionicons name="checkmark-circle" size={34} color="#fff" />
                <T size={18} weight="900" color="#fff" style={{ marginTop: 8 }}>
                  Brief bien reçu !
                </T>
                <T size={13.5} color="rgba(255,255,255,0.88)" style={{ marginTop: 5, lineHeight: 20 }}>
                  Hamid ou Zakaria vous recontacte sous 48 heures avec une première proposition de cadrage.
                </T>
                <Pressable onPress={() => setSent(null)} style={styles.successBtn}>
                  <T size={13} weight="800" color="#fff">
                    Envoyer un autre brief
                  </T>
                </Pressable>
              </LinearGradient>
            </View>
          ) : (
            <View style={{ paddingHorizontal: space.md }}>
              <Card level={2} style={{ gap: 16 }}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  {[0, 1, 2].map((i) => (
                    <View
                      key={i}
                      style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: i <= step ? c.primary : c.surfaceAlt,
                      }}
                    />
                  ))}
                </View>
                <View>
                  <T size={11.5} weight="800" color={c.primary} style={{ letterSpacing: 0.6 }}>
                    ÉTAPE {step + 1} / 3
                  </T>
                  <T size={19} weight="900" style={{ marginTop: 2 }}>
                    {['Votre besoin', 'Votre projet', 'Vos coordonnées'][step]}
                  </T>
                </View>

                {step === 0 ? (
                  <View style={{ gap: 16 }}>
                    <View>
                      <T size={12.5} weight="700" color={c.muted} style={{ marginBottom: 8, letterSpacing: 0.3 }}>
                        SERVICES SOUHAITÉS
                      </T>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {SERVICES.map((s) => (
                          <Chip
                            key={s.id}
                            label={s.title.split(' ').slice(0, 2).join(' ')}
                            icon={s.icon}
                            tint={s.tint}
                            active={selectedServices.includes(s.id)}
                            onPress={() => toggleService(s.id)}
                          />
                        ))}
                      </View>
                      {errors.services ? (
                        <T size={12} color={c.danger} style={{ marginTop: 6 }}>
                          {errors.services}
                        </T>
                      ) : null}
                    </View>
                    <View>
                      <T size={12.5} weight="700" color={c.muted} style={{ marginBottom: 8, letterSpacing: 0.3 }}>
                        BUDGET ENVISAGÉ
                      </T>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {BUDGETS.map((b) => (
                          <Chip key={b} label={b} active={budget === b} onPress={() => setBudget(b)} />
                        ))}
                      </View>
                    </View>
                    <View>
                      <T size={12.5} weight="700" color={c.muted} style={{ marginBottom: 8, letterSpacing: 0.3 }}>
                        ÉCHÉANCE
                      </T>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {DEADLINES.map((d) => (
                          <Chip key={d} label={d} active={deadline === d} onPress={() => setDeadline(d)} />
                        ))}
                      </View>
                    </View>
                    <PrimaryButton label="Continuer" icon="arrow-forward" onPress={next} />
                    <Pressable onPress={() => nav.navigate('Estimator')} style={{ alignSelf: 'center' }}>
                      <T size={13} weight="700" color={c.primary}>
                        Estimer mon budget
                      </T>
                    </Pressable>
                  </View>
                ) : null}

                {step === 1 ? (
                  <View style={{ gap: 4 }}>
                    <Field
                      label="Décrivez votre projet"
                      value={message}
                      onChangeText={setMessage}
                      placeholder="Objectifs, cible, existant, contraintes…"
                      multiline
                      error={errors.message}
                      style={{ height: 130, textAlignVertical: 'top' }}
                    />
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <GhostButton label="Retour" icon="chevron-back" onPress={() => setStep(0)} style={{ flex: 1 }} />
                      <PrimaryButton label="Continuer" icon="arrow-forward" onPress={next} style={{ flex: 1.4 }} />
                    </View>
                  </View>
                ) : null}

                {step === 2 ? (
                  <View style={{ gap: 4 }}>
                    <Field label="Nom complet" value={name} onChangeText={setName} placeholder="Sara Belkadi" icon="person-outline" error={errors.name} />
                    <Field label="Entreprise" value={company} onChangeText={setCompany} placeholder="Votre société" icon="business-outline" />
                    <Field
                      label="E-mail"
                      value={email}
                      onChangeText={setEmail}
                      placeholder="vous@entreprise.com"
                      icon="mail-outline"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={errors.email}
                    />
                    <Field
                      label="Téléphone"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="+212 6 12 34 56 78"
                      icon="call-outline"
                      keyboardType="phone-pad"
                      error={errors.phone}
                    />
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <GhostButton label="Retour" icon="chevron-back" onPress={() => setStep(1)} style={{ flex: 1 }} />
                      <PrimaryButton label="Envoyer" icon="paper-plane" loading={sending} onPress={submit} style={{ flex: 1.4 }} />
                    </View>
                  </View>
                ) : null}
              </Card>
            </View>
          )}

          {briefs.length > 0 ? (
            <>
              <View style={{ height: space.lg }} />
              <SectionTitle
                title="Mes demandes"
                subtitle={`${briefs.length} brief${briefs.length > 1 ? 's' : ''} envoyé${briefs.length > 1 ? 's' : ''}`}
              />
              <View style={{ paddingHorizontal: space.md, gap: 10 }}>
                {briefs.map((b) => (
                  <Card key={b.id} style={{ gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={[styles.statusDot, { backgroundColor: c.success }]} />
                      <T size={14.5} weight="800" style={{ flex: 1 }} numberOfLines={1}>
                        {b.company || b.name}
                      </T>
                      <Pressable onPress={() => removeBrief(b.id)} hitSlop={10}>
                        <Ionicons name="trash-outline" size={17} color={c.faint} />
                      </Pressable>
                    </View>
                    <T size={12.8} color={c.muted} numberOfLines={2}>
                      {b.message}
                    </T>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                      {b.services.map((id) => {
                        const s = SERVICES.find((x) => x.id === id);
                        if (!s) return null;
                        return (
                          <View key={id} style={[styles.miniTag, { backgroundColor: s.tint + '1F', borderColor: s.tint + '44' }]}>
                            <T size={11} weight="700" color={s.tint}>
                              {s.title.split(' ')[0]}
                            </T>
                          </View>
                        );
                      })}
                      <View style={[styles.miniTag, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
                        <T size={11} weight="700" color={c.muted}>
                          {b.budget}
                        </T>
                      </View>
                      <View style={[styles.miniTag, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
                        <T size={11} weight="700" color={c.muted}>
                          {b.status}
                        </T>
                      </View>
                    </View>
                    <T size={11} color={c.faint}>
                      Envoyé le{' '}
                      {new Date(b.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </T>
                  </Card>
                ))}
              </View>
            </>
          ) : null}

          <View style={{ height: space.lg }} />
          <SectionTitle title="Nos bureaux" subtitle="Trois fuseaux, une seule équipe" />
          <View style={{ paddingHorizontal: space.md, gap: 10 }}>
            {OFFICES.map((o) => (
              <Card key={o.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <T size={26}>{o.flag}</T>
                <View style={{ flex: 1 }}>
                  <T size={15} weight="800">
                    {o.city}
                  </T>
                  <T size={12.3} color={c.muted}>
                    {o.country} · {o.address}
                  </T>
                </View>
                <View style={[styles.tz, { backgroundColor: c.surfaceAlt, borderColor: c.border }]}>
                  <T size={11.5} weight="700" color={c.muted}>
                    {o.tz}
                  </T>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  quick: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  quickIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  success: { borderRadius: radius.xl, padding: 22, alignItems: 'flex-start' },
  successBtn: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  miniTag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tz: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
