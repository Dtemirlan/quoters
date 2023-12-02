import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../firebaseService';
import { categories } from '../../ categories.ts';

const AddQuote: React.FC = () => {
    const navigate = useNavigate();

    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState(categories[0].id);
    const [text, setText] = useState('');

    const handleAddQuote = async () => {
        try {
            const response = await axiosApi.post('/quotes.json', {
                author,
                category,
                text,
            });

            if (response.status === 200) {
                navigate('/');
            } else {
                console.error('Error adding quote');
            }
        } catch (error) {
            console.error('Error adding quote:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">Add New Quote</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">
                                Author:
                            </label>
                            <input
                                type="text"
                                id="author"
                                className="form-control"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category:
                            </label>
                            <select
                                id="category"
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">
                                Quote Text:
                            </label>
                            <textarea
                                id="text"
                                className="form-control"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddQuote}
                        >
                            Add Quote
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddQuote;