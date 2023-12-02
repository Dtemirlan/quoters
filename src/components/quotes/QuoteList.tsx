// QuoteList.tsx
import React, { useState, useEffect } from 'react';
import axiosApi from '../../firebaseService';
import { Quote } from '../../types';
import { Link } from 'react-router-dom';

const QuoteList: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axiosApi.get('/quotes.json');
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
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quote List</h2>

            <ul className="list-group">
                {quotes.map((quote) => (
                    <li key={quote.id} className="list-group-item">
                        <strong>{quote.author}</strong>
                        <p className="mb-0">{quote.text}</p>
                        {/* Добавляем кнопку для перехода на страницу редактирования */}
                        <Link to={`/edit-quote/${quote.id}`} className="btn btn-primary mt-2">
                            Edit Quote
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuoteList;
