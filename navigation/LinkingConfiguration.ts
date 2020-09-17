import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Dashboard: {
            screens: {
              DashboardScreen: 'Dashboard',
            },
          },
          Activity: {
            screens: {
              ActivityScreen: 'Activity',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'Search',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'Settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
