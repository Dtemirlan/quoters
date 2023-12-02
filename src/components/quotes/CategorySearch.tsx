// CategorySearch.tsx

import React, { useState, useEffect } from 'react';
import { getCategories } from '../../api';

interface CategorySearchProps {
    onCategorySelected: (category: string) => void;
}

const CategorySearch: React.FC<CategorySearchProps> = ({ onCategorySelected }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        onCategorySelected(selectedValue);
    };

    return (
        <div>
            <label htmlFor="category">Search by Category:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySearch;
