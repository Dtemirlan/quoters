import React from 'react';
import QuoteList from '../components/quotes/QuoteList';


interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const handleEditQuote = (quoteId: string) => {
        console.log(`Edit quote with ID: ${quoteId}`);
    };

    const handleDeleteQuote = (quoteId: string) => {
        console.log(`Delete quote with ID: ${quoteId}`);
    };

    return (
        <div>
            <QuoteList onEditQuote={handleEditQuote} onDeleteQuote={handleDeleteQuote} />
        </div>
    );
};

export default Home;
