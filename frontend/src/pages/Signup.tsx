import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${backendUrl}/user/signup`, { name, email, password });
            const token = response.data;
            localStorage.setItem('token', token);
            navigate('/blogs');
        }
        catch (err) {
            setError('Registration rejected.');
            console.error(err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data || 'Registration structural error.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9] text-zinc-900 px-4 selection:bg-zinc-900 selection:text-white font-sans">
            <div className="w-full max-w-md py-8">
                <div className="border border-zinc-200 bg-white p-8 sm:p-12 shadow-sm">
                    <div className="mb-10 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 block">Registration</span>
                        <h1 className="mt-2 text-3xl font-black tracking-tighter uppercase text-zinc-900">Create Profile</h1>
                    </div>

                    {error && (
                        <div className="mb-6 border border-zinc-200 bg-zinc-50 p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Signature Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                disabled={loading}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="mt-2 block w-full border-b border-zinc-200 bg-transparent px-1 py-3.5 text-base font-medium outline-none transition-all placeholder:text-zinc-300 focus:border-zinc-900 disabled:opacity-50 text-zinc-900"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Target Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                disabled={loading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.com"
                                className="mt-2 block w-full border-b border-zinc-200 bg-transparent px-1 py-3.5 text-base font-medium outline-none transition-all placeholder:text-zinc-300 focus:border-zinc-900 disabled:opacity-50 text-zinc-900"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Profile Security Access Key
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                disabled={loading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-2 block w-full border-b border-zinc-200 bg-transparent px-1 py-3.5 text-base font-medium outline-none transition-all placeholder:text-zinc-300 focus:border-zinc-900 disabled:opacity-50 text-zinc-900"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-900 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 transition-colors disabled:bg-zinc-300"
                        >
                            {loading ? 'Processing...' : 'Register Keys'}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-zinc-100 pt-6 text-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                            Already Registered?{' '}
                            <Link to="/signin" className="text-zinc-900 font-black underline hover:text-zinc-600 transition-colors ml-1">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}