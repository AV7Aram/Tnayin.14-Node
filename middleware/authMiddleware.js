const { sessionManager } = require('../helpers/sessionManager');
const { sendResponse } = require('../helpers/sendResponse');

const requireAuth = (req, res, next) => {
    const sessionId = req.headers['authorization'];
    if (!sessionId) {
        return sendResponse(res, 401, { message: 'Unauthorized: No session ID' });
    }

    const session = sessionManager.getSession(sessionId);
    if (!session) {
        return sendResponse(res, 403, { message: 'Session expired or invalid' });
    }
    req.user = session.userData;
    next();
};

const requireRole = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return sendResponse(res, 403, { message: 'Access denied: insufficient permissions' });
    }
    next();
};

module.exports = {
    requireAuth,
    requireRole
};
