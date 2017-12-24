module.exports = {
  getState: (req, res) => {
    console.log(req.session);
    Article.getArticles()
      .then(articles => {
        return res.send({
          data: articles,
          loggedIn: req.session.loggedIn ? req.session.loggedIn : false,
          user: {
            userId: req.session.userId ? req.session.userId : 0,
            username: req.session.userName ? req.session.userName : "guest"
          }
        });
      })
      .catch(error => {
        return res.status(error.status).send(error.message);
      });
  }
};
