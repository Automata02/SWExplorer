/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ListRenderItem } from 'react-native';
import { Planet, fetchPlanets } from '../../networking/swapi';
import InfiniteScrollList from './scrollList';

const PlanetsScreen: React.FC = () => {
    const renderItem: ListRenderItem<Planet> = ({ item }) => (
        <View style={{ padding: 16 }}>
            <Text style={{ fontWeight: 'bold' }}> {item.name} </Text>
            < Text > Climate: {item.climate} </Text>
            < Text > Population: {item.population} </Text>
        </View>
    );

    return (
        <InfiniteScrollList
            queryKey="planets"
            fetchFn={fetchPlanets}
            renderItem={renderItem}
        />
    );
};

export default PlanetsScreen;
