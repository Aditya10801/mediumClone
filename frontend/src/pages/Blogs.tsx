import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface BlogType {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}

export default function Blogs() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

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
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data || 'Failed to sync index files.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [backendUrl]);

    return (
        <div className="min-h-screen bg-[#fcfbf9] text-zinc-900 selection:bg-zinc-900 selection:text-white antialiased font-sans">
            <div className="mx-auto max-w-5xl px-6 py-16">
                <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200 pb-8">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 block">The public feed</span>
                        <h1 className="mt-2 text-4xl font-black tracking-tight uppercase text-zinc-900 leading-none sm:text-5xl">
                            Essays & Logs
                        </h1>
                    </div>
                    <Link
                        to="/create"
                        className="inline-flex items-center justify-center bg-zinc-900 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors"
                    >
                        New Entry
                    </Link>
                </div>

                {loading && (
                    <div className="space-y-12">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="border-b border-zinc-100 pb-12 space-y-4">
                                <div className="h-8 bg-zinc-200/60 w-2/3 animate-pulse" />
                                <div className="h-4 bg-zinc-200/60 w-full animate-pulse" />
                                <div className="h-4 bg-zinc-200/60 w-4/5 animate-pulse" />
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="border border-zinc-200 bg-white p-6 text-center text-xs font-bold uppercase tracking-wider text-zinc-500">
                        {error}
                    </div>
                )}

                {!loading && !error && blogs.length === 0 && (
                    <div className="border border-dashed border-zinc-300 bg-white/50 p-16 text-center">
                        <p className="font-medium text-sm text-zinc-400 uppercase tracking-wider">No catalog records stored.</p>
                        <Link to="/create" className="mt-4 inline-block bg-zinc-900 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors">
                            Initialize First Entry
                        </Link>
                    </div>
                )}

                {!loading && !error && blogs.length > 0 && (
                    <div className="space-y-16">
                        {blogs.map((blog) => (
                            <article key={blog.id} className="group border-b border-zinc-200 pb-12 last:border-none">
                                <div className="grid gap-6 md:grid-cols-[1fr_2fr] items-start">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 md:pt-2">
                                        REF // {blog.id.substring(0, 8)}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 hover:text-zinc-700 transition-colors leading-tight">
                                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                                        </h2>
                                        <p className="mt-4 text-zinc-600 text-base leading-relaxed font-normal line-clamp-4">
                                            {blog.content}
                                        </p>
                                        <div className="mt-6">
                                            <Link to={`/blog/${blog.id}`} className="text-xs font-bold uppercase tracking-widest text-zinc-900 group-hover:underline">
                                                Read Entry →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}