import { useTheme } from '@/lib/theme/provider';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext, useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Pressable } from 'react-native';
import AppText from '@/lib/components/appText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function ArtistLayout() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const from = params.from as string;

    const handleBack = () => {
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    useEffect(() => {
        const artistName = params.title as string || 'Artiste';
        navigation.setOptions({
            title: artistName,
        } as any);
    }, [navigation, params.title]);
    
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* Bouton retour fixe */}
            <Pressable
                onPress={handleBack}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 10,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
            </Pressable>

            <MaterialTopTabs
                tabBarPosition="bottom"
                screenOptions={{
                    swipeEnabled: false,
                    tabBarActiveTintColor: theme.colors.text,
                    tabBarInactiveTintColor: theme.colors.text2,
                    tabBarIndicatorStyle: {
                        backgroundColor: theme.colors.primary,
                        height: 28,
                        borderRadius: 20,
                        bottom: 4,
                        left: 4,
                        width: 80,
                    },
                    tabBarIndicatorContainerStyle: {
                        marginLeft: 4
                    },
                    tabBarStyle: {
                        backgroundColor: theme.colors.background2,
                        borderRadius: 25,
                        marginHorizontal: 15,
                        marginBottom: 10,
                        height: 36,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                    tabBarContentContainerStyle: {
                        alignItems: 'center',
                    },
                    tabBarItemStyle: {
                        borderRadius: 20,
                    },
                    tabBarLabel: ({ focused, children }) => (
                        <AppText 
                            size="sm" 
                            color={theme.colors.text}
                        >
                            {children}
                        </AppText>
                    ),
                    tabBarPressColor: 'transparent',
                    tabBarScrollEnabled: false,
                }}
            >
                <MaterialTopTabs.Screen
                    name="presentation"
                    options={{
                        title: 'Présentation',
                    }}
                />
                <MaterialTopTabs.Screen
                    name="projets"
                    options={{
                        title: 'Projets',
                    }}
                />
                <MaterialTopTabs.Screen
                    name="singles"
                    options={{
                        title: 'Singles',
                    }}
                />
                <MaterialTopTabs.Screen
                    name="morceaux"
                    options={{
                        title: 'Morceaux',
                    }}
                />
            </MaterialTopTabs>
        </View>
    );
}
