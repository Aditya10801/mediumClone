import { Link } from 'react-router-dom'

export default function Index() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <Link to="/" className="text-2xl font-semibold tracking-tight">
                    MediumClone
                </Link>
                <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
                    <Link to="/blogs" className="hover:text-slate-900">
                        Blogs
                    </Link>
                    <Link to="/create" className="hover:text-slate-900">
                        Create
                    </Link>
                    <Link to="/signin" className="rounded-full border border-slate-300 px-4 py-2 hover:bg-slate-100">
                        Sign in
                    </Link>
                    <Link to="/signup" className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
                        Sign up
                    </Link>
                </nav>
            </header>

            <main className="mx-auto grid max-w-6xl gap-10 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl lg:p-14">
                    <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Write, read, and grow</p>
                    <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                        Discover and share amazing blogs
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                        Join our community of passionate writers and readers. Share your thoughts, ideas, and stories with the world.
                    </p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Browse Blogs
                        </Link>
                        <Link
                            to="/create"
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Create Post
                        </Link>
                    </div>
                </section>

                <div className="h-80 rounded-[2rem] bg-[url('/images/index.png')] bg-cover bg-center shadow-xl sm:h-[520px] lg:h-[650px]"></div>
            </main>
        </div>
    )
}
