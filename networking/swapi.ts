import axios from 'axios';

const API_URL = 'https://swapi.dev/api';

export interface Person {
    name: string;
    height: string;
}

export interface Planet {
    name: string;
    climate: string;
    population: string;
}

export interface ApiResponse<T> {
    results: T[];
    next?: string;
}

export const fetchPeople = async ({ pageParam = 1 }: { pageParam: number }): Promise<ApiResponse<Person>> => {
    const response = await axios.get(`${API_URL}/people/?page=${pageParam}`);
    return response.data;
};

export const fetchSpaceships = async ({ pageParam = 1 }) => {
    const response = await axios.get(`${API_URL}/starships/?page=${pageParam}`);
    return response.data;
};

// export const fetchPlanets = async ({ pageParam = 1 }) => {
//     const response = await axios.get(`${API_URL}/planets/?page=${pageParam}`);
//     return response.data;
// };
export const fetchPlanets = async ({ pageParam = 1 }: { pageParam: number }): Promise<ApiResponse<Planet>> => {
    const response = await axios.get(`${API_URL}/planets/?page=${pageParam}`);
    return response.data;
};