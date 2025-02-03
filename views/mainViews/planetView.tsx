/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { Planet, ApiResponse, fetchPlanets } from '../../networking/swapi';

const PlanetsScreen: React.FC = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<ApiResponse<Planet>, Error, InfiniteData<ApiResponse<Planet>>, string[], number>({
        queryKey: ['planets'],
        queryFn: ({ pageParam }) => fetchPlanets({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) {return undefined;}
            const nextPageNumber = parseInt(lastPage.next.split('=').pop() || '', 10);
            return !isNaN(nextPageNumber) ? nextPageNumber : undefined;
        },
    });

    switch (status) {
        case 'pending':
            return <ActivityIndicator />;
        case 'error':
            return <Text>Error fetching data </Text>;
        case 'success':
            return (
                <FlatList<Planet>
                    data= { data.pages.flatMap(page => page.results) }
            keyExtractor = {(item) => item.name}
renderItem = {({ item }) => (
    <View style= {{ padding: 16 }}>
        <Text style={ { fontWeight: 'bold' } }> { item.name } </Text>
            < Text > Climate: { item.climate } </Text>
                < Text > Population: { item.population } </Text>
                    </View>
                    )}
onEndReached = {() => {
    if (hasNextPage) {
        fetchNextPage();
    }
}}
onEndReachedThreshold = { 0.5}
ListFooterComponent = {
    isFetchingNextPage ? <ActivityIndicator /> : null
                    }
                />
            );
    }
};

export default PlanetsScreen;
