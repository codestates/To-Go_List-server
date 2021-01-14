const { post } = require('../../models');

module.exports = {
    post: async (req, res) => {
        const { userid } = req.session;
        const { location, mapimgpath, content } = req.body;

        if (userid) {
            await post.create({
                location: location,
                mapimgpath: mapimgpath,
                content: content,
                userid: userid
            }).then(result => res.status(200).json(result))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(401).send('로그인 정보가 없습니다.');
        }
    }
};