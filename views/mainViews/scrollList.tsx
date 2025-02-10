import React from 'react';
import { Text, FlatList, ActivityIndicator, ListRenderItem } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ApiResponse } from '../../networking/swapi.ts';

interface InfiniteScrollListProps<T> {
    queryKey: string;
    fetchFn: (params: { pageParam: number }) => Promise<ApiResponse<T>>;
    renderItem: ListRenderItem<T>;
}

function InfiniteScrollList<T extends { name: string }>({
    queryKey,
    fetchFn,
    renderItem,
}: InfiniteScrollListProps<T>) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: ({ pageParam }) => fetchFn({ pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) { return undefined; }
            const nextPageNumber = parseInt(lastPage.next.split('=').pop() || '', 10);
            return !isNaN(nextPageNumber) ? nextPageNumber : undefined;
        },
    });

    switch (status) {
        case 'pending':
            return <ActivityIndicator testID="activity-indicator" />;
        case 'error':
            return <Text>Error fetching data</Text>;
        case 'success':
            return (
                <FlatList<T>
                    testID="flat-list"
                    data={data.pages.flatMap(page => page.results)}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
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
}

export default InfiniteScrollList;
