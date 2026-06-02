import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Blogs() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlogs(response.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data || 'Failed to fetch stories from the network cluster.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [backendUrl]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-red-600 selection:text-white antialiased">
            <div className="mx-auto max-w-5xl px-6 py-16">
                {/* Sharp Editorial Heading Block */}
                <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-800 pb-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">Repository</p>
                        <h1 className="mt-2 text-4xl font-black tracking-tighter uppercase text-white leading-none sm:text-5xl">
                            The Feed
                        </h1>
                        <p className="mt-4 max-w-md text-sm font-medium text-zinc-400 leading-relaxed">
                            A decentralized stream of manifestos, tech write-ups, and raw perspective pieces.
                        </p>
                    </div>
                    <Link
                        to="/create"
                        className="inline-flex items-center justify-center bg-red-600 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-red-500 transition-colors"
                    >
                        New Entry
                    </Link>
                </div>

                {loading && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="border border-zinc-900 bg-zinc-900/20 p-8 space-y-4">
                                <div className="h-6 bg-zinc-800 w-3/4 animate-pulse" />
                                <div className="h-4 bg-zinc-800 w-full animate-pulse" />
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="border border-red-950 bg-red-950/20 p-6 text-center text-xs font-bold uppercase tracking-wider text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && blogs.length === 0 && (
                    <div className="border border-dashed border-zinc-800 bg-zinc-900/10 p-16 text-center">
                        <p className="font-bold text-sm uppercase tracking-wider text-zinc-500">No active transmissions found.</p>
                        <Link to="/create" className="mt-4 inline-block bg-zinc-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-950 hover:bg-red-500 hover:text-white transition-colors">
                            Initialize Broadcast
                        </Link>
                    </div>
                )}

                {/* Grid Layout featuring ultra-clean cards with sharp red accent tags */}
                {!loading && !error && blogs.length > 0 && (
                    <div className="grid gap-px bg-zinc-900 border border-zinc-900 md:grid-cols-2">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.id}
                                to={`/blog/${blog.id}`}
                                className="group flex flex-col justify-between bg-zinc-950 p-8 transition-colors hover:bg-zinc-900/40"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-none group-hover:bg-red-500 transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                                            LOG_NODE // {blog.id.substring(0, 5)}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors leading-tight">
                                        {blog.title}
                                    </h2>
                                    <p className="mt-4 text-zinc-400 text-sm leading-relaxed font-medium line-clamp-3">
                                        {blog.content}
                                    </p>
                                </div>
                                <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                                    Open Terminal payload ↗
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}