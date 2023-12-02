// EditQuote.tsx
import React, { useState, useEffect } from 'react';
import axiosApi from '../../firebaseService';
import { useParams } from 'react-router-dom';
import { useHistory } from 'history'; // Импортируем useHistory из 'history'
import { Quote } from '../../types';

const EditQuote: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [quote, setQuote] = useState<Quote | null>(null);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axiosApi.get(`/quotes/${id}.json`);
                if (response.status === 200 && response.data) {
                    setQuote({ id, ...response.data });
                    setAuthor(response.data.author);
                    setText(response.data.text);
                } else {
                    console.error('Quote not found');
                }
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        fetchQuote();
    }, [id]);

    const handleSaveChanges = async () => {
        if (!quote) return;

        try {
            await axiosApi.put(`/quotes/${quote.id}.json`, { author, text });
            // Обновляем цитату в списке
            setQuote((prevQuote) => (prevQuote ? { ...prevQuote, author, text } : null));
            // Используем history для перенаправления пользователя
            history.push('/');
        } catch (error) {
            console.error('Error updating quote:', error);
        }
    };

    if (!quote) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Edit Quote</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="authorInput">Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="authorInput"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="textInput">Text:</label>
                    <textarea
                        className="form-control"
                        id="textInput"
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditQuote;
