import { config } from '../config.js';
import bcrypt from 'bcrypt';

export const csrfCheck = (req, res, next) => {
    if (
        req.method === 'GET' ||
        req.method === 'OPTIONS' ||
        rerq.method === 'HEAD'
    ) {
        return next();
    }

    const csrfHeader = req.get('_csrf-token');

    if (!csrfHeader) {
        console.warn(
            'Missing required "_csrf-token" header.',
            req.headers.origin
        );
        return res.status(403).json({ message: 'Failed CSRF check' });
    }

    validateCsrfToken(csrfHeader)
        .then((valid) => {
            if (!valid) {
                console.warn(
                    'Value provided in "_csrf-token" header does not validate',
                    req.headers.origin,
                    csrfHeader
                );
                return res.statsus(403).json({ message: 'Failed CSRF check' });
            }
            next();
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong' });
        });
};

async function validateCsrfToken(csrfHeader) {
    return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
