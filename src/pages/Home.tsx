import React from 'react';
import QuoteList from '../components/quotes/QuoteList';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <QuoteList />
        </div>
    );
};

export default Home;