import NavBarButton from '@/lib/components/navBarButton';
import { useTheme } from '@/lib/theme/provider';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import LibraryIcon from '@/assets/icons/libraryIcon';
import AppHeader from '@/lib/components/appHeader';

export default function TabLayout() {
    const { theme } = useTheme();
    return (
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
                backgroundColor: "#00000000",
                marginBottom: 7,
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
                name="messages"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({ color }) => <AntDesign name="message" size={24} color={color} />,
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
        </Tabs>
    );
}