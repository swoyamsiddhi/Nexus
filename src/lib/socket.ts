import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import type { NextApiResponse } from "next";
import type { ClientToServerEvents, ServerToClientEvents } from "@/types";

export type NextApiResponseWithSocket = NextApiResponse & {
    socket: {
        server: NetServer & {
            io?: SocketIOServer<ClientToServerEvents, ServerToClientEvents>;
        };
    };
};

let io: SocketIOServer<ClientToServerEvents, ServerToClientEvents> | undefined;

export function getSocketServer(
    res: NextApiResponseWithSocket
): SocketIOServer<ClientToServerEvents, ServerToClientEvents> {
    if (!res.socket.server.io) {
        console.log("🔌 Initializing Socket.io server...");
        const ioServer = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
            res.socket.server,
            {
                path: "/api/socket",
                addTrailingSlash: false,
                cors: {
                    origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
                    methods: ["GET", "POST"],
                },
            }
        );

        ioServer.on("connection", (socket) => {
            console.log(`✅ Client connected: ${socket.id}`);

            socket.on("joinRoom", (roomId) => {
                socket.join(roomId);
                console.log(`➡️  Socket ${socket.id} joined room: ${roomId}`);
            });

            socket.on("leaveRoom", (roomId) => {
                socket.leave(roomId);
                console.log(`⬅️  Socket ${socket.id} left room: ${roomId}`);
            });

            socket.on("disconnect", () => {
                console.log(`❌ Client disconnected: ${socket.id}`);
            });
        });

        res.socket.server.io = ioServer;
        io = ioServer;
    }

    return res.socket.server.io!;
}

// Emit a notification to a specific user room
export function emitNotification(
    userId: string,
    notification: Parameters<ServerToClientEvents["notification"]>[0]
) {
    io?.to(`user:${userId}`).emit("notification", notification);
}
