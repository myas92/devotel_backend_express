const { unlinkSync } = require('fs');

function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (req.file) {
        unlinkSync(req.file.path);
    }

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        error: process.env.ENVIRONMENT == 'DEV' ? err.message : 'Internal Server Error'
    });
}

module.exports = errorHandler;
