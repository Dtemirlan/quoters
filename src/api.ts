import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://dzhaparov-temirlan-js20-default-rtdb.europe-west1.firebasedatabase.app/',
});

export const getCategories = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<{ [key: string]: string }> = await instance.get('/categories.json');

        if (response.status === 200 && response.data) {
            return Object.values(response.data);
        }

        return [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};
