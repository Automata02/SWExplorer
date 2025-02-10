/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { Person, fetchPeople } from '../../networking/swapi';
import InfiniteScrollList from './scrollList';
import { ListRenderItem } from 'react-native';

const PeopleScreen: React.FC = () => {
    const renderItem: ListRenderItem<Person> = ({ item }) => (
        <View style={{ padding: 16 }}>
            <Text>{item.name}</Text>
            <Text>Height: {item.height}</Text>
        </View>
    );

    return (
        <InfiniteScrollList
            queryKey="people"
            fetchFn={fetchPeople}
            renderItem={renderItem}
        />
    );
};

export default PeopleScreen;

