"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerManager = void 0;
class LoggerManager {
    loggers = new Map();
    addLogger(logger) {
        this.loggers.set(logger.name, logger);
    }
    getLogger(name) {
        return this.loggers.get(name);
    }
    listen(task) {
        task.on('*', (data) => this.log(data));
    }
    async log(data) {
        for (const [id, logger] of this.loggers.entries()) {
            const severity = data.severity ? data.severity : 'info';
            if (data.sync)
                await logger.syncLog(severity, data);
            else
                logger.asyncLog(severity, data);
        }
    }
}
exports.LoggerManager = LoggerManager;
//# sourceMappingURL=logger.manager.js.map