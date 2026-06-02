import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
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
            setError(err.response?.data || 'Registration rejected.');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 px-4 selection:bg-red-600 selection:text-white font-sans">
            <div className="w-full max-w-md py-8">
                <div className="border border-zinc-900 bg-zinc-950 p-8 sm:p-12">
                    <div className="mb-10 text-center">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-red-500">Node Generation</p>
                        <h1 className="mt-2 text-3xl font-black tracking-tighter uppercase text-white">Register</h1>
                    </div>

                    {error && (
                        <div className="mb-6 border border-red-900 bg-red-950/20 p-4 text-xs font-bold uppercase tracking-wider text-red-400">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Handle Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                disabled={loading}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="mt-2 block w-full border border-zinc-800 bg-zinc-900/20 px-4 py-3.5 text-base font-medium outline-none transition-all placeholder:text-zinc-800 focus:bg-transparent focus:border-red-600 disabled:opacity-50 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Network Address (Email)
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                disabled={loading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.com"
                                className="mt-2 block w-full border border-zinc-800 bg-zinc-900/20 px-4 py-3.5 text-base font-medium outline-none transition-all placeholder:text-zinc-800 focus:bg-transparent focus:border-red-600 disabled:opacity-50 text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-zinc-400">
                                Security Key (Password)
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                disabled={loading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-2 block w-full border border-zinc-800 bg-zinc-900/20 px-4 py-3.5 text-base font-medium outline-none transition-all placeholder:text-zinc-800 focus:bg-transparent focus:border-red-600 disabled:opacity-50 text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-50 py-4 text-xs font-black uppercase tracking-widest text-zinc-950 hover:bg-red-600 hover:text-white transition-colors disabled:bg-zinc-800 disabled:text-zinc-600"
                        >
                            {loading ? 'Provisioning...' : 'Generate Node'}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-zinc-900 pt-6 text-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                            Linked node exists?{' '}
                            <Link to="/signin" className="text-zinc-50 font-black underline hover:text-red-500 transition-colors ml-1">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}