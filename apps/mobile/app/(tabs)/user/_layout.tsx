import { useTheme } from '@/lib/theme/provider';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import AppText from '@/lib/components/global/appText';

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
            title: 'Compte',
            subtitle: '',
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
                        display: 'none',
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
                            style={{ display: "none" }}
                        >
                            {children}
                        </AppText>
                    ),
                    tabBarPressColor: 'transparent',
                    tabBarScrollEnabled: false,
                }}

            >
            </MaterialTopTabs>
        </View>
    );
}
