import Link from "next/link";
import { ArrowRight, Users, Calendar, Zap, Globe } from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-nexus-950 via-nexus-900 to-slate-900 px-6 py-32 text-white">
                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-nexus-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-nexus-400/10 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-nexus-400/30 bg-nexus-500/10 px-4 py-1.5 text-sm text-nexus-300">
                        <Zap className="h-3.5 w-3.5" />
                        <span>Your campus, connected.</span>
                    </div>

                    <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                        Where campus{" "}
                        <span className="bg-gradient-to-r from-nexus-300 to-nexus-500 bg-clip-text text-transparent">
                            clubs come alive
                        </span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
                        Nexus is the all-in-one platform for discovering clubs, attending events, and building
                        your college community — all in one place.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="/explore"
                            className="inline-flex items-center gap-2 rounded-xl bg-nexus-500 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-nexus-400 hover:shadow-lg hover:shadow-nexus-500/25"
                        >
                            Explore Clubs <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/auth/signin"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-b bg-card px-6 py-12">
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">
                    {[
                        { label: "Active Clubs", value: "200+" },
                        { label: "Students", value: "15K+" },
                        { label: "Events This Month", value: "80+" },
                        { label: "Categories", value: "20+" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-3xl font-bold text-nexus-600">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-4 text-center text-3xl font-bold">Everything your club needs</h2>
                    <p className="mb-16 text-center text-muted-foreground">
                        From discovery to community — Nexus has you covered.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Globe,
                                title: "Discover Clubs",
                                description:
                                    "Browse 200+ clubs by category, search by interest, and find your community.",
                            },
                            {
                                icon: Calendar,
                                title: "Event Management",
                                description:
                                    "Create, RSVP, and get reminders for club events. Online or in-person.",
                            },
                            {
                                icon: Users,
                                title: "Member Management",
                                description:
                                    "Manage membership roles, approve requests, and communicate with your club.",
                            },
                            {
                                icon: Zap,
                                title: "Real-time Notifications",
                                description:
                                    "Get instant updates on club activity, event changes, and membership approvals.",
                            },
                            {
                                icon: ArrowRight,
                                title: "Rich Club Profiles",
                                description:
                                    "Custom banners, bios, social links, and activity feeds for every club.",
                            },
                            {
                                icon: Globe,
                                title: "Cross-club Discovery",
                                description:
                                    "Explore related clubs and events. Get personalized recommendations.",
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="club-card rounded-2xl border bg-card p-6 shadow-sm"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-nexus-50 dark:bg-nexus-950">
                                    <feature.icon className="h-6 w-6 text-nexus-600" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-nexus-950 px-6 py-24 text-white">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold">Ready to join the community?</h2>
                    <p className="mb-8 text-nexus-200">
                        Sign up for free and start exploring clubs today.
                    </p>
                    <Link
                        href="/auth/signin"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-nexus-900 transition-all hover:bg-nexus-50"
                    >
                        Get Started — It&apos;s Free <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
