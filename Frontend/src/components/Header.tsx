import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">MoviesFinder</h1>
            <button
                onClick={toggleDarkMode}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                {isDarkMode ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
            </button>
        </header>
    );
};

export default Header;