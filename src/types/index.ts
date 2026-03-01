import type {
    User,
    Club,
    Membership,
    Event,
    Post,
    Comment,
    Notification,
    MembershipRole,
    MembershipStatus,
    EventStatus,
    NotificationType,
    PostType,
    Role,
    EventRsvp,
    PostLike,
} from "@prisma/client";

// =====================
// Re-exports
// =====================
export type {
    User,
    Club,
    Membership,
    Event,
    Post,
    Comment,
    Notification,
    MembershipRole,
    MembershipStatus,
    EventStatus,
    NotificationType,
    PostType,
    Role,
    EventRsvp,
    PostLike,
};

// =====================
// Enriched/composed types
// =====================

export type UserWithMemberships = User & {
    memberships: (Membership & { club: Club })[];
};

export type ClubWithDetails = Club & {
    founder: Pick<User, "id" | "name" | "image">;
    memberships: (Membership & { user: Pick<User, "id" | "name" | "image"> })[];
    _count: {
        memberships: number;
        events: number;
        posts: number;
    };
};

export type ClubSummary = Pick<
    Club,
    "id" | "name" | "slug" | "description" | "logoUrl" | "bannerUrl" | "category" | "tags" | "isPrivate" | "isVerified"
> & {
    _count: { memberships: number; events: number };
};

export type EventWithClub = Event & {
    club: Pick<Club, "id" | "name" | "slug" | "logoUrl">;
    _count: { rsvps: number };
};

export type PostWithDetails = Post & {
    author: Pick<User, "id" | "name" | "image">;
    club: Pick<Club, "id" | "name" | "slug">;
    _count: { comments: number; likes: number };
};

export type NotificationWithSender = Notification & {
    sender: Pick<User, "id" | "name" | "image"> | null;
    club: Pick<Club, "id" | "name" | "logoUrl"> | null;
};

export type MembershipWithUser = Membership & {
    user: Pick<User, "id" | "name" | "email" | "image" | "major" | "graduationYear">;
};

// =====================
// API Response types
// =====================

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ApiError {
    error: string;
    code?: string;
    details?: unknown;
}

export interface ApiSuccess<T = void> {
    success: true;
    data?: T;
    message?: string;
}

// =====================
// Form/input types
// =====================

export interface CreateClubInput {
    name: string;
    description?: string;
    shortBio?: string;
    category: string;
    tags?: string[];
    isPrivate?: boolean;
    website?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    discord?: string;
}

export interface UpdateClubInput extends Partial<CreateClubInput> {
    logoUrl?: string;
    bannerUrl?: string;
}

export interface CreateEventInput {
    title: string;
    description?: string;
    location?: string;
    isOnline?: boolean;
    meetingLink?: string;
    startDate: Date;
    endDate?: Date;
    maxCapacity?: number;
    clubId: string;
}

export interface CreatePostInput {
    content: string;
    title?: string;
    type?: PostType;
    imageUrls?: string[];
    clubId: string;
    eventId?: string;
}

// =====================
// Socket.io event types
// =====================

export interface ServerToClientEvents {
    notification: (notification: NotificationWithSender) => void;
    newPost: (post: PostWithDetails) => void;
    memberJoined: (data: { clubId: string; user: Pick<User, "id" | "name" | "image"> }) => void;
    eventUpdated: (event: EventWithClub) => void;
}

export interface ClientToServerEvents {
    joinRoom: (roomId: string) => void;
    leaveRoom: (roomId: string) => void;
    markNotificationRead: (notificationId: string) => void;
}
