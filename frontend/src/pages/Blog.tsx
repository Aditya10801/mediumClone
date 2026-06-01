import { Link } from 'react-router-dom'

export default function Blog() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-4xl px-6 py-10">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Featured story</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">How to make your writing feel alive</h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            A clear story, thoughtful structure, and simple language can help your ideas reach more people.
                        </p>
                    </div>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Back to stories
                    </Link>
                </div>
                <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">By Author Name • January 1, 2024</p>
                    <div className="mt-8 space-y-6 text-slate-700">
                        <p>
                            Writing doesn't have to be perfect. It should feel honest, clear, and easy to follow. Start with a strong opening that tells readers why your story matters.
                        </p>
                        <p>
                            Share practical examples, personal moments, and actionable ideas. The best posts help readers learn something new while feeling connected to the author.
                        </p>
                        <p>
                            Finish with a helpful takeaway so your story sticks. Then share it with your community and invite others to join the conversation.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    )
}
