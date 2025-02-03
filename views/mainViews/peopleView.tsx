/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { Person, ApiResponse, fetchPeople } from '../../networking/swapi';

const PeopleScreen: React.FC = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<ApiResponse<Person>, Error, InfiniteData<ApiResponse<Person>>, string[], number>({
        queryKey: ['people'],
        queryFn: ({ pageParam }) => fetchPeople({ pageParam }),
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
            return <Text>Error fetching data</Text>;
        case 'success':
            return (
                <FlatList<Person>
                    data={data.pages.flatMap(page => page.results)}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={{ padding: 16 }}>
                            <Text>{item.name}</Text>
                            <Text>Height: {item.height}</Text>
                        </View>
                    )}
                    onEndReached={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isFetchingNextPage ? <ActivityIndicator /> : null
                    }
                />
            );
    }
};

export default PeopleScreen;

