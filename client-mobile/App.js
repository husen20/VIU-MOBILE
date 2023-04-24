import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Detail from './screens/Detail';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }}
              name="Detail"
              component={Detail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({});
