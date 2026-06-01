import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-4xl px-6 py-10">
                <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl sm:p-12">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Join the community</p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Create your account</h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                                Sign up to publish stories, follow writers, and connect with a community of readers.
                            </p>
                        </div>
                        <Link
                            to="/signin"
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your full name"
                                className="mt-2 block w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                className="mt-2 block w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Choose a strong password"
                                className="mt-2 block w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Create account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
