const { user } = require('../../models');

module.exports = {
    post: (req, res) => {
        const { userid } = req.session;

        if (userid) {
            req.session.destroy();
            user.destroy({
                where: {
                    id: userid
                }
            }).then(result => res.status(200).send('user removed'))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};