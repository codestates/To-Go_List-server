const { post } = require('../../models');

module.exports = {
    post: (req, res) => {
        const { userid } = req.session;
        const { id } = req.body;

        if (userid) {
            post.destroy({
                where: {
                    id: id,
                    userid: userid
                }
            }).then(result => res.status(200).json('post removed'))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};