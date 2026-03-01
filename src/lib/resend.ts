import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@nexus-clubs.com";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Nexus";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// =====================
// Email templates
// =====================

export async function sendWelcomeEmail(to: string, name: string) {
    return resend.emails.send({
        from: FROM,
        to,
        subject: `Welcome to ${APP_NAME}! 🎉`,
        html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Welcome to ${APP_NAME}, ${name}!</h1>
        <p>We're excited to have you join our community of college clubs.</p>
        <p>Start exploring clubs, events, and connect with fellow students.</p>
        <a href="${APP_URL}/explore" style="
          display: inline-block;
          background: #4f46e5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 16px;
        ">Explore Clubs →</a>
      </div>
    `,
    });
}

export async function sendClubInviteEmail(
    to: string,
    inviterName: string,
    clubName: string,
    inviteUrl: string
) {
    return resend.emails.send({
        from: FROM,
        to,
        subject: `You've been invited to join ${clubName} on ${APP_NAME}`,
        html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Club Invitation</h1>
        <p><strong>${inviterName}</strong> has invited you to join <strong>${clubName}</strong>.</p>
        <a href="${inviteUrl}" style="
          display: inline-block;
          background: #4f46e5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 16px;
        ">Accept Invitation →</a>
      </div>
    `,
    });
}

export async function sendEventReminderEmail(
    to: string,
    eventTitle: string,
    eventDate: Date,
    eventUrl: string
) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(eventDate);

    return resend.emails.send({
        from: FROM,
        to,
        subject: `Reminder: ${eventTitle} is happening soon!`,
        html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Event Reminder</h1>
        <h2>${eventTitle}</h2>
        <p>📅 ${formattedDate}</p>
        <a href="${eventUrl}" style="
          display: inline-block;
          background: #4f46e5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 16px;
        ">View Event →</a>
      </div>
    `,
    });
}

export async function sendMembershipApprovedEmail(
    to: string,
    userName: string,
    clubName: string,
    clubUrl: string
) {
    return resend.emails.send({
        from: FROM,
        to,
        subject: `Your membership to ${clubName} has been approved! 🎊`,
        html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f46e5;">Membership Approved!</h1>
        <p>Hi ${userName}, your request to join <strong>${clubName}</strong> has been approved.</p>
        <a href="${clubUrl}" style="
          display: inline-block;
          background: #4f46e5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 16px;
        ">Visit Club →</a>
      </div>
    `,
    });
}
