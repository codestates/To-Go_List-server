const { hashtag, post } = require('../../models');

module.exports = {
    get: (req, res) => {
        const { userid } = req.session;

        if (userid) {
            hashtag.findAll({
                where: { userId: userid }
            }).then(result => res.status(200).json(result))
                .catch(err => res.status(500).send(err));
        }
    }
};