import React, { useState, useEffect } from 'react';
import axiosApi from '../../firebaseService';
import { Quote } from '../../types';
import { Link } from 'react-router-dom';

interface QuoteListProps {
    onQuoteDeleted: () => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ onQuoteDeleted }) => {
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axiosApi.get('/quotes.json');
                if (response.status === 200 && response.data) {
                    const quotesArray: Quote[] = Object.entries(response.data).map(([key, value]) => ({
                        id: key,
                        ...(typeof value === 'object' ? value : {}), // Используйте typeof для проверки на объект
                    }));
                    filterQuotesByCategory(selectedCategory, quotesArray);
                }
            } catch (error) {
                console.error('Error fetching quotes:', error);
            }
        };

        fetchQuotes();
    }, [selectedCategory]);

    const filterQuotesByCategory = (category: string, quotesArray: Quote[]) => {
        if (category) {
            const filtered = quotesArray.filter((quote) => quote.category.toLowerCase() === category.toLowerCase());
            setFilteredQuotes(filtered);
        } else {
            setFilteredQuotes(quotesArray);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDeleteClick = async (quoteId: string) => {
        try {
            await axiosApi.delete(`/quotes/${quoteId}.json`);
            onQuoteDeleted();
        } catch (error) {
            console.error('Error deleting quote:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quote List</h2>

            <div className="mb-4">
                <label className="mr-2">Filter by Category:</label>
                <select
                    className="form-control"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Star Wars">Star Wars</option>
                    <option value="Famous People">Famous People</option>
                    <option value="Saying">Saying</option>
                    <option value="Humour">Humour</option>
                    <option value="Motivational">Motivational</option>
                </select>
            </div>

            {filteredQuotes.length === 0 ? (
                <p>No quotes found.</p>
            ) : (
                <ul className="list-group">
                    {filteredQuotes.map((quote) => (
                        <li key={quote.id} className="list-group-item">
                            <strong>{quote.author}</strong>
                            <p className="mb-0">{quote.text}</p>
                            <Link to={`/edit-quote/${quote.id}`} className="btn btn-warning mr-2">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDeleteClick(quote.id)}
                                className="btn btn-danger"
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
