const { sendDataToProcessId } = require('pm2');
const { hashtag, post } = require('../../models');

module.exports = {
    get: async (req, res) => {
        const { userid } = req.session;

        if (userid) {
            await hashtag.findAll({
                where: { userId: userid }
            }).then(result => {
                const tags = result.reduce((acc, cur) => {
                    if (!acc.some(obj => obj.tag === cur.tag)) {
                        acc.push(cur);
                    }
                    return acc;
                }, []);

                res.status(200).json(tags);
            }).catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};