const { hashtag, post_hashtag, post } = require('../../models');

module.exports = {
    post: async (req, res) => {
        const { userid } = req.session;
        const { query } = req.body;

        if (userid) {
            await hashtag.findAll({
                where: { tag: query },
                include: {
                    model: post,
                    through: { attributes: [] }
                }
            }).then(result => {
                const posts = [];
                for (let el of result) {
                    posts.push(el.posts[0]);
                }
                res.status(200).json(posts);
            }).catch(err => res.status(500).send(err));
        }

    }
};