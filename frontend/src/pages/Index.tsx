import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(localStorage.getItem('token')));

    function handleLogout(): void {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] text-zinc-900 selection:bg-zinc-900 selection:text-white antialiased font-sans">
            <header className="border-b border-zinc-200 bg-[#fcfbf9]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <Link to="/" className="text-2xl font-black tracking-tight uppercase">
                        SORTIE
                    </Link>
                    <nav className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
                        {isAuthenticated ? (
                            <>
                                <Link to="/blogs" className="hover:text-zinc-900 transition-colors">Notebooks</Link>
                                <Link to="/create" className="hover:text-zinc-900 transition-colors">Compose</Link>
                                <button onClick={handleLogout} className="text-zinc-900 hover:text-zinc-600 transition-colors font-bold uppercase tracking-widest">
                                    Disconnect
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="hover:text-zinc-900 transition-colors">Sign In</Link>
                                <Link to="/signup" className="bg-zinc-900 px-5 py-2.5 text-white hover:bg-zinc-800 transition-colors tracking-widest">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
                <section className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4 block">Volume I // Issue I</span>
                    <h1 className="text-5xl font-black tracking-tighter uppercase sm:text-7xl leading-[0.85] text-zinc-900">
                        A catalog of <br />
                        <span className="italic font-light tracking-normal text-zinc-800 lowercase">unfiltered</span> ideas.
                    </h1>
                    <p className="mt-8 max-w-lg text-base leading-relaxed text-zinc-500 font-medium">
                        A clean, distraction-free environment for writers and long-form creators to archive documentation, stories, and technical reviews.
                    </p>
                    <div className="mt-10">
                        <Link
                            to={isAuthenticated ? "/blogs" : "/signin"}
                            className="inline-flex items-center justify-center bg-zinc-900 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 transition-all duration-200"
                        >
                            {isAuthenticated ? "Enter Feed" : "Begin Writing"}
                        </Link>
                    </div>
                </section>

                <div className="relative aspect-[4/5] bg-zinc-100 border border-zinc-200/80 overflow-hidden shadow-sm">
                    <img 
                        src="/images/signup.png" 
                        alt="Editorial presentation" 
                        className="h-full w-full object-cover object-center grayscale contrast-115 mix-blend-multiply" 
                    />
                </div>
            </main>
        </div>
    );
}