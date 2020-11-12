const { user } = require('../../models');

module.exports = {
    get: (req, res) => {
        const { userid } = req.session;

        if (userid) {
            user.findByPk(userid)
                .then(result => res.status(200).send(result))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};
