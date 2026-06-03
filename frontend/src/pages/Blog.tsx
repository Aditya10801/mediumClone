import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

interface BlogType {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}

export default function Blog() {
    const { id } = useParams<{ id: string }>();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [blog, setBlog] = useState<BlogType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

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
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data || 'Target record missing.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id, backendUrl]);

    return (
        <div className="min-h-screen bg-[#fcfbf9] text-zinc-900 selection:bg-zinc-900 selection:text-white antialiased font-sans">
            <div className="mx-auto max-w-3xl px-6 py-16">
                <div className="mb-12 flex items-center justify-between border-b border-zinc-200 pb-6">
                    <Link
                        to="/blogs"
                        className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        ← Index
                    </Link>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        {loading ? 'Syncing' : blog?.published ? 'Status: Document Live' : 'Status: Archive'}
                    </span>
                </div>

                {loading && (
                    <div className="text-center py-24 text-zinc-400 font-bold uppercase tracking-widest animate-pulse">
                        Parsing index tree node...
                    </div>
                )}

                {error && (
                    <div className="border border-zinc-200 bg-white p-12 text-center text-zinc-500">
                        <p className="text-sm font-bold uppercase tracking-wider">{error}</p>
                        <Link to="/blogs" className="mt-6 inline-block bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors">
                            Return to Feed
                        </Link>
                    </div>
                )}

                {!loading && !error && blog && (
                    <article className="py-4">
                        <header className="border-b border-zinc-200 pb-8">
                            <h1 className="text-4xl font-black tracking-tighter uppercase text-zinc-900 sm:text-6xl leading-[0.95]">
                                {blog.title}
                            </h1>
                            <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                Manifest ID // {blog.id}
                            </p>
                        </header>
                        
                        <div className="mt-12 text-zinc-800 text-lg leading-relaxed font-normal whitespace-pre-line space-y-6">
                            {blog.content}
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
}