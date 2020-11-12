const { user } = require('../../models');

module.exports = {
    patch: (req, res) => {
        const { userid } = req.session;
        const { password, username, phonenum } = req.body;

        if (userid) {
            user.update({
                username: username,
                password: password,
                phonenum: phonenum
            }, {
                where: {
                    id: userid
                }
            })
                .then(result => res.status(200).send('update success'))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};
