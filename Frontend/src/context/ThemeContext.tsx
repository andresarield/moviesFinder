import { createContext, useState, useEffect } from 'react';

// Crea el contexto
export const ThemeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => { },
});

// Proveedor del contexto
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Estado para el modo oscuro
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Cargar el tema desde localStorage al iniciar
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Función para alternar el modo oscuro
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};