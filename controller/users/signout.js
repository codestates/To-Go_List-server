module.exports = {
    post: (req, res) => {
        const { userid } = req.session;

        if (userid) {
            req.session.destroy(err => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/');
        }
    }
};