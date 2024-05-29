import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserTypeScreen from '../screens/UserTypeScreen';
import CustomerLoginScreen from '../screens/CustomerLoginScreen';
import VendorLoginScreen from '../screens/VendorLoginScreen';
import VendorHomeScreen from '../screens/VendorHomeScreen';
import BookingScreen from '../screens/BookingScreen';
import VendorList from '../components/VendorList';
import ServicesScreen from '../screens/ServicesScreen';
import CompanyRegistrationForm from '../components/CompanyRegistrationForm';
import NewServiceScreen from '../screens/NewServiceScreen';
import VendorBookingsScreen from '../screens/VendorBookingsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserType">
        <Stack.Screen name="UserType" component={UserTypeScreen} />
        <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
        <Stack.Screen name="VendorLogin" component={VendorLoginScreen} />
        <Stack.Screen name="CustomerHome" component={CategoriesScreen} />
        <Stack.Screen name="VendorHome" component={VendorHomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="VendorList" component={VendorList} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="CompanyRegistration" component={CompanyRegistrationForm} />
        <Stack.Screen name="NewService" component={NewServiceScreen} />
        <Stack.Screen name="VendorBookings" component={VendorBookingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
