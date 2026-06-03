import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Create() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${backendUrl}/blog`,
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/blogs');
        } catch (err) {
            console.error(err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data || 'Failed to commit draft.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfbf9] text-zinc-900 selection:bg-zinc-900 selection:text-white antialiased font-sans">
            <div className="mx-auto max-w-4xl px-6 py-12">
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200 pb-8">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 block">Workspace</span>
                        <h1 className="mt-2 text-4xl font-black tracking-tighter uppercase text-zinc-900">Compose Entry</h1>
                    </div>
                    <Link
                        to="/blogs"
                        className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        Discard Draft
                    </Link>
                </div>
                
                <div className="border border-zinc-200 bg-white p-8 sm:p-12 shadow-sm">
                    {error && (
                        <div className="mb-6 border border-zinc-200 bg-zinc-50 p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                            {error}
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                                Document Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                required
                                disabled={loading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="ENTER TITLE HEADLINE..."
                                className="mt-3 block w-full border-b-2 border-zinc-200 bg-transparent py-4 text-xl font-black tracking-tight text-zinc-900 uppercase outline-none transition-all placeholder:text-zinc-300 focus:border-zinc-900 disabled:opacity-60"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Narrative Body
                            </label>
                            <textarea
                                id="content"
                                rows={14}
                                required
                                disabled={loading}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write without constraints..."
                                className="mt-3 block w-full border border-zinc-200 bg-[#fcfbf9]/40 p-5 text-base font-medium text-zinc-800 outline-none transition-all placeholder:text-zinc-300 focus:bg-white focus:border-zinc-900 resize-none leading-relaxed disabled:opacity-60"
                            ></textarea>
                        </div>
                        <div className="flex justify-end pt-6 border-t border-zinc-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-zinc-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:bg-zinc-300"
                            >
                                {loading ? 'Processing...' : 'Publish Entry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}