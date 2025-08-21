const activeSessions = new Map();

const sessionManager = {
    createSession: (userId, userData) => {
        const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const sessionData = {
            userId,
            userData,
            expiresAt: Date.now() + 3600000
        };

        activeSessions.set(sessionId, sessionData);
        return sessionId;
    },

    getSession: (sessionId) => {
        const session = activeSessions.get(sessionId);
        if (!session || session.expiresAt < Date.now()) {
            activeSessions.delete(sessionId);
            return null;
        }
        return session;
    },

    deleteSession: (sessionId) => {
        activeSessions.delete(sessionId);
    },
};

module.exports = { sessionManager };
