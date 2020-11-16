require('dotenv').config();
const { user } = require('../../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.googleClientId);
const jwt = require('jsonwebtoken');

module.exports = {
    post: (req, res) => {
        const updateToken = payload => {
            const { sub, name, email } = payload;
            const token = jwt.sign({
                id: sub,
                name,
                email
            }, 'testSecret');

            user.update({
                token: token
            }, {
                where: {
                    googleId: sub
                }
            }).catch(err => console.log(err));

            return token;
        };

        const insertUserIntoDB = payload => {
            const { sub, name, email } = payload;
            const token = jwt.sign({
                id: sub,
                name,
                email
            }, 'testSecret');

            user.create({
                googleId: sub,
                email: email,
                username: name,
                token: token
            }).catch(err => console.log(err));

            return token;
        };

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.tokenId
            });
            const payload = ticket.getPayload();
            const googleId = payload['sub'];

            user.findOne({
                attributes: ['token']
            }, {
                where: {
                    googleId: googleId
                }
            }).then(result => {
                let token = '';
                console.log(result);
                if (result.length > 0) {
                    console.log('DB에 있는 유저');
                    token = updateToken(payload);
                } else {
                    console.log('DB에 없는 유저');
                    token = insertUserIntoDB(payload);
                }
                res.send({ token });
            }).catch(err => console.log(err));
        };

        verify().then(() => { }).catch(console.error);
    }
};

