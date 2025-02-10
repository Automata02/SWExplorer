import axios from 'axios';
import { fetchPeople, fetchSpaceships, fetchPlanets } from '../../networking/swapi.ts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SWAPI API Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchPeople', () => {
        it('should fetch people data successfully', async () => {
            const mockResponse = {
                data: {
                    results: [{ name: 'Luke Skywalker', height: '172' }],
                    next: 'https://swapi.dev/api/people/?page=2',
                },
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await fetchPeople({ pageParam: 1 });

            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/?page=1');
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('fetchSpaceships', () => {
        it('should fetch spaceship data successfully', async () => {
            const mockResponse = {
                data: {
                    results: [{ name: 'CR90 corvette', class: 'corvette' }],
                    next: 'https://swapi.dev/api/starships/?page=2',
                },
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await fetchSpaceships({ pageParam: 1 });

            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/?page=1');
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('Planets', () => {
        it('should fetch planet data successfully', async () => {
            const mockResponse = {
                data: {
                    results: [{ name: 'Tatooine', climate: 'arid' }],
                    next: 'https://swapi.dev/api/planets/?page=2',
                },
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await fetchPlanets({ pageParam: 1 });

            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/?page=1');
            expect(result).toEqual(mockResponse.data);
        });
    });
});
