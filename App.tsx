import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, useTheme } from './lib/theme';
import { StoreProvider } from './lib/store';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectDetailScreen from './screens/ProjectDetailScreen';
import TestimonialsScreen from './screens/TestimonialsScreen';
import ContactScreen from './screens/ContactScreen';
import EstimatorScreen from './screens/EstimatorScreen';
import ProcessScreen from './screens/ProcessScreen';
import AboutScreen from './screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICONS: Record<string, [string, string]> = {
  Accueil: ['home', 'home-outline'],
  Services: ['layers', 'layers-outline'],
  Projets: ['albums', 'albums-outline'],
  Avis: ['star', 'star-outline'],
  Contact: ['chatbubble-ellipses', 'chatbubble-ellipses-outline'],
};

function Tabs() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.faint,
        tabBarLabelStyle: { fontSize: 10.5, fontWeight: '700', marginTop: -2 },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: c.tabBar,
          borderTopColor: c.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 62 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
        tabBarIcon: ({ focused, color }) => {
          const [on, off] = ICONS[route.name] ?? ['ellipse', 'ellipse-outline'];
          return <Ionicons name={(focused ? on : off) as any} size={21} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Projets" component={ProjectsScreen} />
      <Tab.Screen name="Avis" component={TestimonialsScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

function Root() {
  const { c, isDark } = useTheme();
  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme : DefaultTheme).colors,
      background: c.bg,
      card: c.bg,
      text: c.text,
      border: c.border,
      primary: c.primary,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={navTheme as any}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: c.bg },
            animation: Platform.OS === 'web' ? 'fade' : 'slide_from_right',
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
          <Stack.Screen name="Process" component={ProcessScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen
            name="Estimator"
            component={EstimatorScreen}
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StoreProvider>
            <Root />
          </StoreProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
