const { hashtag, post } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    post: async (req, res) => {
        const { userid } = req.session;
        const { query } = req.body;

        // if (userid) {
        await hashtag.findAll({
            where: {
                tag: {
                    [Op.like]: '%' + query + '%'
                }
            },
            include: {
                model: post,
                through: { attributes: [] }
            }
        })
            .then(result => result.map(record => record.get({ plain: true })))
            .then(result => {
                const temp = [];

                for (let el of result) {
                    temp.push(el.posts[0]);
                }

                const posts = temp.reduce((acc, cur) => {
                    if (!acc.some(obj => obj.id === cur.id)) {
                        acc.push(cur);
                    }
                    return acc;
                }, []);

                res.status(200).json(posts);

            }).catch(err => res.status(500).send(err));

        // }

    }
};