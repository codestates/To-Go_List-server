const { user } = require('../../models');

module.exports = {
    post: (req, res) => {
        if (req.body.email) {
            const { email, password } = req.body;

            user.findOne({
                where: {
                    email: email,
                    password: password
                }
            }).then(result => {
                if (result === null) {
                    res.status(401).send('Invalid user');
                } else {
                    req.session.userid = result.id;
                    res.status(200).json({ id: req.session.userid });
                }
            }).catch(err => res.status(500).send(err));
        }

    }
};
