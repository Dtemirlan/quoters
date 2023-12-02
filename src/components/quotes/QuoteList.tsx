// QuoteList.tsx

import React, { useState, useEffect } from 'react';
import axiosApi from '../../firebaseService';
import { Quote } from '../../types';
import {Link} from "react-router-dom";

interface QuoteListProps {
    onEditQuote: (quoteId: string) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ onEditQuote }) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                let url = '/quotes.json';

                // Если выбрана категория, обновите URL для запроса категорий
                if (selectedCategory) {
                    url += `?orderBy="category"&equalTo="${selectedCategory}"`;
                }

                const response = await axiosApi.get(url);

                if (response.status === 200 && response.data) {
                    const quotesArray: Quote[] = Object.entries(response.data).map(([key, value]) => ({
                        id: key,
                        ...value,
                    }));
                    setQuotes(quotesArray);
                }
            } catch (error) {
                console.error('Error fetching quotes:', error);
            }
        };

        fetchQuotes();
    }, [selectedCategory]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDeleteQuote = async (quoteId: string) => {
        try {
            // Отправка запроса на удаление цитаты из API
            await axiosApi.delete(`/quotes/${quoteId}.json`);

            // Обновление локального состояния после удаления
            const updatedQuotes = quotes.filter((quote) => quote.id !== quoteId);
            setQuotes(updatedQuotes);
        } catch (error) {
            console.error('Error deleting quote:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quote List</h2>

            {/* Компонент для выбора категории */}
            <div className="mb-4">
                <label className="mr-2">Filter by Category:</label>
                {/* ... (ваш существующий код) */}
            </div>

            {quotes.length === 0 ? (
                <p>No quotes found.</p>
            ) : (
                <ul className="list-group">
                    {quotes.map((quote) => (
                        <li key={quote.id} className="list-group-item">
                            <strong>{quote.author}</strong>
                            <p className="mb-0">{quote.text}</p>
                            {/* Используйте Link для перехода на страницу редактирования */}
                            <   Link to={`/edit-quote/${quote.id}`} className="btn btn-primary mr-2">
                                Edit
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteQuote(quote.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuoteList;
