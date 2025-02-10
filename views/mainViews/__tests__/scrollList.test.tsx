import React from 'react';
import { Text, View } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InfiniteScrollList from '../scrollList';
import { ApiResponse } from '../../../networking/swapi';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

interface TestItem {
    name: string;
    id: number;
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe('InfiniteScrollList', () => {
    beforeEach(() => {
        queryClient.clear();
    });

    const mockFetchFn = jest.fn();
    const mockRenderItem = jest.fn(({ item }) => (
        <View testID="list-item">
            <Text>{item.name}</Text>
        </View>
    ));

    it('shows loading state initially', () => {
        const { getByTestId } = render(
            <InfiniteScrollList<TestItem>
                queryKey="test"
                fetchFn={mockFetchFn}
                renderItem={mockRenderItem}
            />,
            { wrapper }
        );

        expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('shows error state when fetch fails', async () => {
        mockFetchFn.mockRejectedValueOnce(new Error('Failed to fetch'));

        const { getByText } = render(
            <InfiniteScrollList<TestItem>
                queryKey="test"
                fetchFn={mockFetchFn}
                renderItem={mockRenderItem}
            />,
            { wrapper }
        );

        await waitFor(() => {
            expect(getByText('Error fetching data')).toBeTruthy();
        });
    });

    it('renders list items when fetch succeeds', async () => {
        const mockData: ApiResponse<TestItem> = {
            results: [
                { name: 'Item 1', id: 1 },
                { name: 'Item 2', id: 2 },
            ],
            next: undefined,
        };

        mockFetchFn.mockResolvedValueOnce(mockData);

        const { getAllByTestId, queryByTestId } = render(
            <InfiniteScrollList<TestItem>
                queryKey="test"
                fetchFn={mockFetchFn}
                renderItem={mockRenderItem}
            />,
            { wrapper }
        );

        await waitFor(() => {
            expect(getAllByTestId('list-item')).toHaveLength(2);
            expect(queryByTestId('activity-indicator')).toBeNull();
        });
    });
});
