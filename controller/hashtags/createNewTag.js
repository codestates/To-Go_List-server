const { hashtag, post_hashtag } = require('../../models');

module.exports = {
    post: async (req, res) => {
        const { userid } = req.session;
        const { postid, tag } = req.body;

        if (userid) {
            await hashtag.create({
                tag: tag
            }).then(result => {
                const tagid = result.id;
                post_hashtag.create({
                    postid: postid,
                    hashtagid: tagid
                });
                res.status(200).json(result);
            }).catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};