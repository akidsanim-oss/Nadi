import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Brief = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  deadline: string;
  message: string;
  createdAt: number;
  status: 'Envoyé' | 'En cours' | 'Rappel planifié';
};

export type Review = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  createdAt: number;
};

type Ctx = {
  ready: boolean;
  briefs: Brief[];
  addBrief: (b: Omit<Brief, 'id' | 'createdAt' | 'status'>) => Brief;
  removeBrief: (id: string) => void;
  saved: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  reviews: Review[];
  addReview: (r: Omit<Review, 'id' | 'createdAt'>) => void;
  liked: string[];
  toggleLike: (id: string) => void;
  selectedServices: string[];
  toggleService: (id: string) => void;
  setSelectedServices: (ids: string[]) => void;
};

const StoreCtx = createContext<Ctx>({} as Ctx);

const KEY = 'hw.store.v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) {
          const p = JSON.parse(raw);
          setBriefs(p.briefs ?? []);
          setSaved(p.saved ?? []);
          setReviews(p.reviews ?? []);
          setLiked(p.liked ?? []);
        }
      } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(KEY, JSON.stringify({ briefs, saved, reviews, liked })).catch(() => {});
  }, [ready, briefs, saved, reviews, liked]);

  const addBrief: Ctx['addBrief'] = useCallback((b) => {
    const brief: Brief = {
      ...b,
      id: `b_${Date.now()}`,
      createdAt: Date.now(),
      status: 'Envoyé',
    };
    setBriefs((prev) => [brief, ...prev]);
    return brief;
  }, []);

  const removeBrief = useCallback((id: string) => setBriefs((p) => p.filter((b) => b.id !== id)), []);

  const toggleSaved = useCallback(
    (id: string) => setSaved((p) => (p.includes(id) ? p.filter((x) => x !== id) : [id, ...p])),
    []
  );

  const toggleLike = useCallback(
    (id: string) => setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [id, ...p])),
    []
  );

  const addReview: Ctx['addReview'] = useCallback((r) => {
    setReviews((prev) => [{ ...r, id: `r_${Date.now()}`, createdAt: Date.now() }, ...prev]);
  }, []);

  const toggleService = useCallback(
    (id: string) =>
      setSelectedServices((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    []
  );

  const value = useMemo(
    () => ({
      ready,
      briefs,
      addBrief,
      removeBrief,
      saved,
      toggleSaved,
      isSaved: (id: string) => saved.includes(id),
      reviews,
      addReview,
      liked,
      toggleLike,
      selectedServices,
      toggleService,
      setSelectedServices,
    }),
    [ready, briefs, saved, reviews, liked, selectedServices, addBrief, removeBrief, toggleSaved, addReview, toggleLike, toggleService]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);
