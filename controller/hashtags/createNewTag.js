const { hashtag } = require('../../models');

module.exports = {
    post: (req, res) => {
        const { tag } = req.body;

        if (tag) {
            hashtag.create({
                tag: tag
            }).then(result => res.status(201).json(result))
                .catch(err => res.status(500).send(err));
        }
    }
};