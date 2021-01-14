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
                    email: email
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
            })
                .then(result => {
                    req.session.userid = result.dataValues.id;
                    res.status(200).json({ token, id: req.session.userid });
                })
                .catch(err => res.status(500).send(err));

            // return token;
        };

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.tokenId
            });
            const payload = ticket.getPayload();
            const email = payload['email'];

            user.findOne({
                attributes: ['token', 'id'],
                hooks: false,
                where: {
                    email: email
                }
            }).then(result => {
                let token;

                if (result !== null) {
                    // console.log('DB에 있는 유저');
                    token = updateToken(payload);
                    req.session.userid = result.id;
                    res.status(200).json({ token, id: req.session.userid });
                } else {
                    // console.log('DB에 없는 유저');
                    insertUserIntoDB(payload);
                }
            }).catch(err => res.status(500).send(err));
        };

        verify().then(() => { }).catch(err => res.status(500).send(err));
    }
};

