
import React, { useState, useEffect } from 'react';
import axiosApi from '../../firebaseService';
import { useParams, useNavigate } from 'react-router-dom';
import { Quote } from '../../types';

interface EditQuoteProps {}

const EditQuote: React.FC<EditQuoteProps> = () => {
    const navigate = useNavigate(); // Инициализация объекта navigate
    const { id } = useParams<{ id: string }>();

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
            setQuote((prevQuote) => (prevQuote ? { ...prevQuote, author, text } : null));
            navigate('/');
        } catch (error) {
            console.error('Error updating quote:', error);
        }
    };

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
