import NavBarButton from '@/lib/components/navBarButton';
import { useTheme } from '@/lib/theme/provider';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import LibraryIcon from '@/assets/icons/libraryIcon';
import AppHeader from '@/lib/components/appHeader';
import MiniPlayer from '@/lib/components/miniPlayer';
import PlayerModal from '@/lib/components/playerModal';
import { View } from 'react-native';

export default function TabLayout() {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Tabs screenOptions={{
            tabBarActiveTintColor: theme.colors.text,
            tabBarInactiveTintColor: theme.colors.primaryLight,
            tabBarActiveBackgroundColor: theme.colors.background2,
            tabBarLabelStyle: {
                fontSize: 11,
                fontFamily: 'Kanit',
                fontWeight: 300,
            },
            tabBarStyle: {
                backgroundColor: theme.colors.background,
                paddingBottom: 7,
                borderTopColor: theme.colors.primary
            },
            header: (props) => (
                <AppHeader
                    title={(props.options.title as string) ?? ""}
                    subtitle={(props.options as any).subtitle}
                />
            ),
            tabBarButton: (props) => { return <NavBarButton href={props.href} children={props.children} selected={props['aria-selected']}></NavBarButton> }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({ color }) => <Octicons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: 'Découvrir',
                    tabBarIcon: ({ color }) => <Entypo name="compass" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: 'Bibliothèque',
                    tabBarIcon: ({ color }) => <LibraryIcon size={26} strokeColor={color} />,
                }}
            />
            <Tabs.Screen
                name="detail"
                options={{
                    href: null,
                    title: 'Détails',
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="artist"
                options={{
                    href: null,
                    title: 'Artiste',
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    href: null,
                    title: 'Compte',
                }}
            />
            </Tabs>
            <MiniPlayer />
            <PlayerModal />
        </View>
    );
}