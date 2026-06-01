import { Link } from 'react-router-dom'

export default function Blogs() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Stories from the community</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Explore fresh writing</h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Read stories from authors who are sharing new ideas, guides, and personal experiences.
                        </p>
                    </div>
                    <Link
                        to="/create"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Write a story
                    </Link>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    {['A fresh start for your workflow', 'How to write better every day', 'Lessons from the latest research'].map((title, index) => (
                        <Link
                            key={title}
                            to="/blog/1"
                            className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-slate-800">{title}</h2>
                            <p className="mt-3 text-sm uppercase tracking-[0.32em] text-slate-500">By Author Name</p>
                            <p className="mt-4 text-slate-600">
                                {index === 0
                                    ? 'Discover practical tips and ideas that can help you improve your daily routine with writing and thinking clearly.'
                                    : index === 1
                                    ? 'Explore simple habits that make your writing more consistent, creative, and confident.'
                                    : 'Read how thoughtful storytelling can help you connect with readers and share your point of view.'}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
