const express       = require('express');
const router        = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', (req, res) => {
    try {
        // if not content in body or email empty or password empty return bad login information
        if (!req.body || !req.body.email || !req.body.password) {
                res.status(401).json({ success: false, error: 'Bad login information' });
            return;
        }
            // if login success return token with content
            res.status(200).json({ success: true, email: req.body.email, token: '12345luggage' });
    } catch (error) {
        // server does not know what the problem is and we would have to debug
        res.status(500).json({ success: false, error: 'Unknown error' });
    }
});

module.exports = router;