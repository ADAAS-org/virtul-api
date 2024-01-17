import { IVAPILoggerErrorParams } from './logger.types'




export const DEFAULT_LOGGER_MANAGER_ERRORS = {
    METHOD_NOT_IMPLEMENTED: {
        name: 'METHOD_NOT_IMPLEMENTED',
        code: 'VAPI-LOGGER-ERR-0000',
        message: 'Called method is not implemented',
        description: 'Please make sure that the method you\'re calling is implemented',
    } as IVAPILoggerErrorParams,
    TARGET_LOGGER_NOT_FOUND: {
        name: 'TARGET_LOGGER_NOT_FOUND',
        code: 'VAPI-LOGGER-ERR-0001',
        message: 'Unable to find and initialize target logger',
        description: 'Please make sure that parameters passed correctly or contact support',
    } as IVAPILoggerErrorParams
}

