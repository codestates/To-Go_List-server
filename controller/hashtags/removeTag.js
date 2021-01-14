const { hashtag, post_hashtag, post } = require('../../models');

module.exports = {
    post: async (req, res) => {
        const { userid } = req.session;
        const { postid, tag } = req.body;

        if (userid) {
            await post.findOne({
                where: { id: postid },
                include: {
                    model: hashtag
                }
            }).then(async result => {
                const { hashtags } = result;
                let tagid;

                for (let el of hashtags) {
                    if (el.dataValues.tag === tag) {
                        tagid = el.dataValues.id;
                    }
                }

                await hashtag.destroy({
                    where: {
                        id: tagid,
                        tag: tag
                    }
                }).catch(err => res.status(500).send(err));

                await post_hashtag.destroy({
                    where: {
                        postid: postid,
                        hashtagid: tagid
                    }
                }).catch(err => res.status(500).send(err));
            }).then(result => res.status(200).send('hashtag removed'));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};