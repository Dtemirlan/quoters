import React, { useState, useEffect } from 'react';
import axiosApi from '../../firebaseService';
import { Quote } from '../../types';

interface QuoteCategoryProps {
    category: string;
}

const QuoteCategory: React.FC<QuoteCategoryProps> = ({ category }) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        const fetchQuotesByCategory = async () => {
            try {
                const response = await axiosApi.get('/quotes.json', {
                    params: { orderBy: 'category', equalTo: category },
                });

                if (response.status === 200 && response.data) {
                    const quotesArray: Quote[] = Object.entries(response.data).map(([key, value]) => ({
                        id: key,
                        ...value,
                    }));
                    setQuotes(quotesArray);
                }
            } catch (error) {
                console.error('Error fetching quotes by category:', error);
            }
        };

        fetchQuotesByCategory();
    }, [category]);

    return (
        <div>
            <h2>{category} Quotes</h2>
            <ul>
                {quotes.map((quote) => (
                    <li key={quote.id}>
                        <strong>{quote.author}</strong>
                        <p>{quote.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuoteCategory;
