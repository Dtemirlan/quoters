import React, { useState } from 'react';
import { categories } from '../../ categories.ts';

interface CategorySearchProps {
    onCategorySelected: (category: string) => void;
}

const CategorySearch: React.FC<CategorySearchProps> = ({ onCategorySelected }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

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
                    <option key={category.id} value={category.id}>
                        {category.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySearch;