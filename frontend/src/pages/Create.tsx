import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Create() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
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
            setError(err.response?.data || 'Failed to dispatch transmission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-red-600 selection:text-white antialiased font-sans">
            <div className="mx-auto max-w-4xl px-6 py-12">
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-800 pb-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">Drafting</p>
                        <h1 className="mt-2 text-4xl font-black tracking-tighter uppercase text-white">Create Broadcast</h1>
                    </div>
                    <Link
                        to="/blogs"
                        className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-50 transition-colors"
                    >
                        Cancel Transmission
                    </Link>
                </div>
                
                <div className="border border-zinc-900 bg-zinc-950 p-8 sm:p-12">
                    {error && (
                        <div className="mb-6 border border-red-900 bg-red-950/20 p-4 text-xs font-bold uppercase tracking-wider text-red-400">
                            {error}
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Manifest Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                required
                                disabled={loading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="THE NEXT SYSTEM PARADIGM..."
                                className="mt-3 block w-full border border-zinc-800 bg-zinc-900/20 px-5 py-4 text-lg font-black tracking-tight text-white uppercase outline-none transition-all placeholder:text-zinc-700 focus:bg-transparent focus:border-red-600 focus:ring-0 disabled:opacity-60"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Body Content Payload
                            </label>
                            <textarea
                                id="content"
                                rows={14}
                                required
                                disabled={loading}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="BEGIN DATA INPUT..."
                                className="mt-3 block w-full border border-zinc-800 bg-zinc-900/20 px-5 py-5 text-base font-medium text-zinc-300 outline-none transition-all placeholder:text-zinc-700 focus:bg-transparent focus:border-red-600 focus:ring-0 resize-none leading-relaxed disabled:opacity-60"
                            ></textarea>
                        </div>
                        <div className="flex justify-end pt-6 border-t border-zinc-900">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-red-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-red-500 transition-colors disabled:bg-zinc-800 disabled:text-zinc-600"
                            >
                                {loading ? 'Broadcasting...' : 'Publish Payload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}