const writeLogsToConsole = (data, logger) => {
    if (data.level === 'TRACE') logger.trace(data.message);
    if (data.level === 'DEBUG') logger.debug(data.message);
    if (data.level === 'INFO') logger.info(data.message);
    if (data.level === 'WARN') logger.warn(data.message);
    if (data.level === 'ERROR') logger.error(data.message);
    if (data.level === 'FATAL') logger.fatal(data.message);
    if (data.level === 'CUSTOM') logger.custom(data.message);
};

module.exports = { writeLogsToConsole };