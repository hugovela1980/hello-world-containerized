const writeHttpLogsToFile = (req, data) => {
    if (data.level === 'ERROR') req.log.error(data.message);
    if (data.level === 'FATAL') req.log.fatal(data.message);
    if (data.level === 'CUSTOM') req.log.custom(data.message);
};

module.exports = { writeHttpLogsToFile };