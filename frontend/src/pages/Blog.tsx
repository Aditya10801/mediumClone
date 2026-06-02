import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Blog() {
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBlog(response.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data || 'Resource down or node missing.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id, backendUrl]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-red-600 selection:text-white antialiased font-sans">
            <div className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
                <div className="mb-12 flex items-center justify-between border-b border-zinc-900 pb-6">
                    <Link
                        to="/blogs"
                        className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                        ← Exit Node
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 ${loading ? 'bg-zinc-700 animate-pulse' : 'bg-red-600'}`} />
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                            {loading ? 'STATUS: RECOVERY' : blog?.published ? 'STATUS: LIVE' : 'STATUS: CACHED'}
                        </span>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-24 text-zinc-600 font-black uppercase tracking-widest animate-pulse">
                        Parsing encrypted block...
                    </div>
                )}

                {error && (
                    <div className="border border-red-900 bg-red-950/20 p-12 text-center text-white">
                        <p className="text-sm font-black uppercase tracking-wider text-red-400">{error}</p>
                        <Link to="/blogs" className="mt-6 inline-block bg-zinc-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-950 hover:bg-red-500 hover:text-white transition-colors">
                            Return to stream
                        </Link>
                    </div>
                )}

                {!loading && !error && blog && (
                    <article className="bg-zinc-950 border border-zinc-900 p-8 sm:p-16">
                        <header className="border-b border-zinc-900 pb-8">
                            <h1 className="text-4xl font-black tracking-tighter uppercase text-white sm:text-5xl leading-none">
                                {blog.title}
                            </h1>
                            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-red-500">
                                IDENT_HASH // {blog.id}
                            </p>
                        </header>
                        
                        <div className="mt-12 text-zinc-300 text-base leading-relaxed font-medium whitespace-pre-line space-y-6">
                            {blog.content}
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
}