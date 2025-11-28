import { useTheme } from '@/lib/theme/provider';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import AppText from '@/lib/components/appText';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function LibraryLayout() {
    const { theme } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'Bibliothèque',
            subtitle: 'Playlists',
        } as any);
    }, [navigation]);
    
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
            screenListeners={{
                state: (e) => {
                    const state = e.data.state as TabNavigationState<ParamListBase>;
                    const route = state.routes[state.index];
                    const subtitles: { [key: string]: string } = {
                        playlists: 'Playlists',
                        albums: 'Albums',
                        artists: 'Artistes',
                        liked: 'Likés',
                    };
                    navigation.setOptions({
                        subtitle: subtitles[route.name] || 'Playlists',
                    } as any);
                },
            }}
        >
            <MaterialTopTabs.Screen
                name="aaplaylists"
                options={{
                    title: 'Playlists',
                }}
            />
            <MaterialTopTabs.Screen
                name="albums"
                options={{
                    title: 'Albums',
                }}
            />
            <MaterialTopTabs.Screen
                name="artists"
                options={{
                    title: 'Artistes',
                }}
            />
            <MaterialTopTabs.Screen
                name="liked"
                options={{
                    title: 'Likés',
                }}
            />
            </MaterialTopTabs>
        </View>
    );
}
