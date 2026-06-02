import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Index() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('token')));

    function handleLogout() {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-red-600 selection:text-white antialiased">
            {/* Minimalist Borderless Header */}
            <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link to="/" className="text-xl font-black tracking-tighter uppercase group">
                        SORTIE
                    </Link>
                    <nav className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
                        {isAuthenticated ? (
                            <>
                                <Link to="/blogs" className="hover:text-zinc-50 transition-colors">Blogs</Link>
                                <Link to="/create" className="hover:text-zinc-50 transition-colors">Create</Link>
                                <button onClick={handleLogout} className="text-red-500 hover:text-red-400 transition-colors font-bold uppercase tracking-widest">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="hover:text-zinc-50 transition-colors">Sign In</Link>
                                <Link to="/signup" className="bg-red-600 px-4 py-2 text-zinc-50 hover:bg-red-500 transition-colors tracking-widest">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Heavy Typography Hero Section */}
            <main className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-32">
                <section className="flex flex-col justify-center">
                    <p className="text-xs font-black uppercase tracking-[0.5em] text-red-500 mb-4">The Writing Network</p>
                    <h1 className="text-5xl font-black tracking-tighter uppercase sm:text-7xl leading-[0.9] text-white">
                        Discover & share <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-white">
                            Amazing Blogs
                        </span>
                    </h1>
                    <p className="mt-8 max-w-lg text-base leading-relaxed text-zinc-400 font-medium">
                        A raw, high-contrast platform for developers and creators to broadcast updates, document ideas, and share perspectives without the noise.
                    </p>
                    <div className="mt-10">
                        <Link
                            to={isAuthenticated ? "/blogs" : "/signin"}
                            className="inline-flex items-center justify-center bg-zinc-50 px-8 py-4 text-xs font-black uppercase tracking-widest text-zinc-950 border border-zinc-50 hover:bg-transparent hover:text-red-500 hover:border-red-500 transition-all duration-300"
                        >
                            {isAuthenticated ? "Go to Blogs" : "Get Started"}
                        </Link>
                    </div>
                </section>

                {/* High Contrast Grayscale Presentation Image */}
                <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden border border-zinc-800 bg-zinc-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                    <img 
                        src="/images/signup.png" 
                        alt="Index Hero" 
                        className="h-full w-full object-cover object-center grayscale brightness-75 contrast-125 mix-blend-luminosity transition-transform duration-500 hover:scale-105" 
                    />
                </div>
            </main>
        </div>
    );
}