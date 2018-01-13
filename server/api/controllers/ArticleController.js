/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: (req, res) => {
    if (req.session.loggedIn) {
      const article = Object.assign({}, req.body.Article);
      delete article.id;
      Article.createArticle(article)
        .then(result => {
          return res.send({ result });
        })
        .catch(error => {
          return res.status(error.status).send(error.message);
        });
    } else {
      return res.status(401).send("User is not authorized for thos action");
    }
  },
  update: (req, res) => {
    if (req.session.loggedIn) {
      const id = req.body.Article.id;
      const article = Object.assign({}, req.body.Article);
      delete article.id;
      Article.updateArticle(article, id)
        .then(result => {
          return res.send({ result });
        })
        .catch(error => {
          return res.status(error.status).send(error.message);
        });
    } else {
      return res.status(401).send("User is not authorized for thos action");
    }
  }
};
