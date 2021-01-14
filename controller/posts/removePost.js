const { hashTagsController } = require('..');
const { post, post_hashtag, hashtag } = require('../../models');

module.exports = {
    post: async (req, res) => {
        const { userid } = req.session;
        const { postid } = req.body;

        if (userid) {
            await post.findOne({
                where: {
                    id: postid
                },
                include: {
                    model: hashtag,
                    through: { attributes: [] }
                }
            }).then(async result => {
                const { hashtags } = result;
                let tagIdArr = [];

                for (let el of hashtags) {
                    tagIdArr.push(el.id);
                }

                await post.destroy({
                    where: {
                        id: postid,
                        userid: userid
                    }
                }).catch(err => console.log(err));

                await hashtag.destroy({
                    where: {
                        id: tagIdArr
                    }
                }).catch(err => console.log(err));

                await post_hashtag.destroy({
                    where: {
                        postid: postid
                    }
                }).catch(err => console.log(err));
            }).then(result => res.status(200).json('post removed'));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};