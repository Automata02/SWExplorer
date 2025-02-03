import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PeopleScreen from './mainViews/peopleView';
import PlanetsScreen from './mainViews/planetView';
import StarshipScreen from './mainViews/starshipView';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="People" component={PeopleScreen} />
                <Tab.Screen name="Starships" component={StarshipScreen} />
                <Tab.Screen name="Planets" component={PlanetsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default TabNavigation;
