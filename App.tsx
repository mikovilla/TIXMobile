import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { WelcomeScreen } from './TM.Screen/WelcomeScreen';
import { RegisterScreen } from './TM.Screen/RegisterScreen';
import { LoginScreen } from './TM.Screen/LoginScreen';
import { TacScreen } from './TM.Screen/TacScreen';
import { Ionicons } from '@expo/vector-icons';
import { ContactScreen } from './TM.Screen/ContactScreen';
import { HomeScreen } from './TM.Screen/HomeScreen';
import { SettingsScreen } from './TM.Screen/SettingsScreen';
import { NewRequestScreen } from './TM.Screen/NewRequestScreen';
import { ViewRequestScreen } from './TM.Screen/ViewRequestScreen';
import { ViewRequestIdScreen } from './TM.Screen/ViewRequestIdScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator ()

function TabNavigator(){
  return(
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Contact Us') {
          iconName = focused ? 'mail' : 'mail-outline';
        } else if (route.name === 'TIX Mobile') {
          iconName = focused ? 'home' : 'home-outline';
        }
        {/*// @ts-ignore */}
        return <Ionicons size={size} color={color} name={iconName} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#4070D1',
      inactiveTintColor: 'gray',
    }}
    >
        <Tab.Screen name="TIX Mobile" component={StackNavigator} />
        <Tab.Screen name="Contact Us" component={ContactScreen} />
      </Tab.Navigator>
  );
}

function StackNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="TIX Mobile" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Terms and Conditions" component={TacScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="New Request" component={NewRequestScreen} />
      <Stack.Screen name="View Requests" component={ViewRequestScreen} />
      <Stack.Screen name="View Request" component={ViewRequestIdScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}