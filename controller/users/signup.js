const { user } = require('../../models');

module.exports = {
    post: (req, res) => {
        const { email, password, username, phonenum } = req.body;
        user.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                password: password,
                username: username,
                phonenum: phonenum
            }
        })
            .then(async ([user, created]) => {
                if (!created) {
                    return res.status(409).send('existing email');
                }
                const data = await user.get({ plain: true });
                res.status(201).json(data);
            })
            .catch(err => {
                console.log(err);
                res.sendStats(500);
            })
    }
};