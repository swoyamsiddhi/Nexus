import { prisma } from "../src/lib/prisma";
import { slugify } from "../src/lib/utils";

async function main() {
    console.log("🌱 Seeding database...");

    // Create demo users
    const user1 = await prisma.user.upsert({
        where: { email: "alice@university.edu" },
        update: {},
        create: {
            name: "Alice Johnson",
            email: "alice@university.edu",
            major: "Computer Science",
            graduationYear: 2026,
            role: "STUDENT",
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: "bob@university.edu" },
        update: {},
        create: {
            name: "Bob Chen",
            email: "bob@university.edu",
            major: "Electrical Engineering",
            graduationYear: 2025,
            role: "STUDENT",
        },
    });

    // Create demo clubs
    const clubs = [
        {
            name: "Robotics & AI Society",
            description:
                "A multidisciplinary club for students passionate about robotics, machine learning, and artificial intelligence. We build autonomous robots, compete in national competitions, and host workshops.",
            shortBio: "Building the future of intelligent machines.",
            category: "STEM",
            tags: ["robotics", "AI", "machine learning", "engineering"],
        },
        {
            name: "Photography Club",
            description:
                "Capture the world through your lens. We offer darkroom access, photography walks, exhibitions, and mentorship from professional photographers.",
            shortBio: "Seeing the world differently, one frame at a time.",
            category: "Arts",
            tags: ["photography", "art", "darkroom", "exhibitions"],
        },
        {
            name: "Debate Society",
            description:
                "Sharpen your critical thinking and public speaking skills. We compete in regional and national debate tournaments across parliamentary, policy, and Lincoln-Douglas formats.",
            shortBio: "Win arguments. Change minds.",
            category: "Academic",
            tags: ["debate", "public speaking", "critical thinking", "competitions"],
        },
        {
            name: "Sustainability Collective",
            description:
                "Driving campus sustainability initiatives — from community gardens and zero-waste campaigns to renewable energy advocacy.",
            shortBio: "Making our campus greener, one project at a time.",
            category: "Environment",
            tags: ["sustainability", "environment", "green", "activism"],
        },
    ];

    for (const clubData of clubs) {
        const slug = slugify(clubData.name);
        await prisma.club.upsert({
            where: { slug },
            update: {},
            create: {
                ...clubData,
                slug,
                founderId: user1.id,
                isVerified: true,
                memberships: {
                    create: [
                        { userId: user1.id, role: "PRESIDENT", status: "ACTIVE" },
                        { userId: user2.id, role: "MEMBER", status: "ACTIVE" },
                    ],
                },
            },
        });
    }

    console.log(`✅ Seeded ${clubs.length} clubs and 2 demo users.`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
