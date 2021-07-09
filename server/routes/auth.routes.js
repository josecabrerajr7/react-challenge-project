const express 			= require('express');
const User 				= require('../models/user.model');

const router 			= express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', (req, res) => {
    try {
	    // if no login info exist return bad login info
	    if (!req.body || !req.body.email || !req.body.password) {
                res.status(401).json({ success: false, error: 'Bad login information' });
			return;
		} else {
		    // search mongodb
			User.find({email: req.body.email}, async (err, docs) => {
                // if doc exist return the doc
                if(docs.length) {
                    res.status(200).json({ success: true, email: docs[0].email, token: docs[0].token });
				} else {
				    // doc does not exist create a new one in the database using the schema model
					const loginObject = new User({
						email: req.body.email,
						password: req.body.password,
						token: '12345luggage'
                    });

                    // save to database
                    const databaseResponse = await loginObject.save();

                    // return save data
					if (databaseResponse && databaseResponse._id) {
					    res.status(200).json({ success: true, email:databaseResponse.email, token: databaseResponse.token });
					}

                }
            });
        }		
    } catch (error) {
        res.status(500).json({ success: false, error: 'Unknown error' });
    }
});

module.exports = router;