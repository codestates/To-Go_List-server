const { post, hashtag } = require('../../models');

module.exports = {
    get: async (req, res) => {
        const { userid } = req.session;

        if (userid) {
            await post.findAll({
                where: {
                    userid: userid
                },
                include: {
                    model: hashtag,
                    through: { attributes: [] }
                }
            }).then(result => res.status(200).json(result))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};