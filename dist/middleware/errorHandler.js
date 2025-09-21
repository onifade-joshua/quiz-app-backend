"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
// 404 handler
const notFoundHandler = (req, res, next) => {
    res.status(404).json({ message: "Route not found" });
};
exports.notFoundHandler = notFoundHandler;
// Generic error handler
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map