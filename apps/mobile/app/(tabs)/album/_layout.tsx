import { useTheme } from '@/lib/theme/provider';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext, useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Pressable } from 'react-native';
import AppText from '@/lib/components/global/appText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function AlbumLayout() {
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
        const albumData = params.data ? JSON.parse(params.data as string) : null;
        const albumName = albumData?.title || 'Album';
        navigation.setOptions({
            title: albumName,
        } as any);
    }, [navigation, params.data]);
    
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* Bouton retour fixe */}
            <Pressable
                onPress={handleBack}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 20,
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
                        width: 87,
                    },
                    tabBarIndicatorContainerStyle: {
                        marginLeft: 4
                    },
                    tabBarStyle: {
                        backgroundColor: theme.colors.background2,
                        borderRadius: 25,
                        marginBottom: 10,
                        height: 36,
                        position: 'absolute',
                        bottom: 0,
                        width: 190,
                        alignSelf: 'center',
                        left: '50%',
                        marginLeft: -95
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
                    name="musiques"
                    options={{
                        title: 'Musiques',
                    }}
                />
                <MaterialTopTabs.Screen
                    name="community"
                    options={{
                        title: 'Communauté',
                    }}
                />
            </MaterialTopTabs>
        </View>
    );
}
