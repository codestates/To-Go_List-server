const { user } = require('../../models');

module.exports = {
    post: (req, res) => {
        const { userid } = req.session;
        const { password } = req.body;

        if (userid) {
            user.findOne({
                where: {
                    id: userid,
                    password: password
                }
            }).then(result => {
                if (result === null) {
                    res.status(401).send('password incorrect');
                } else {
                    res.status(200).send('success');
                }
            }).catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};