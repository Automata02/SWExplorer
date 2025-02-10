/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ListRenderItem } from 'react-native';
import { Starship, fetchSpaceships } from '../../networking/swapi';
import InfiniteScrollList from './scrollList';

const StarshipScreen: React.FC = () => {
    const renderItem: ListRenderItem<Starship> = ({ item }) => (
        <View style={{ padding: 16 }}>
            <Text>{item.name}</Text>
            <Text>Model: {item.model}</Text>
            <Text>Class: {item.starship_class}</Text>
        </View>
    );

    return (
        <InfiniteScrollList
            queryKey="starships"
            fetchFn={fetchSpaceships}
            renderItem={renderItem}
        />
    );
};

export default StarshipScreen;
