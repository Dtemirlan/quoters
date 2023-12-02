import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import AddQuote from './components/quotes/AddQuote';
import EditQuote from "./components/quotes/EditQuote.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">
                        Quotes
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add-quote" className="nav-link">
                                    Submit new quote
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Routes>
                    <Route path="/add-quote" element={<AddQuote />} />
                    <Route path="/category/:category" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/edit-quote/:id" element={<EditQuote />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
