/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: 'string'
    },
    term: {
      type: "string"
    },
    transcription: {
      type: "string"
    },
    translation: {
      type: "object"
    },
    audio: {
      type: "string"
    },
    examples: {
      type: "array"
    }
  },
  getArticles: () => {
    return new Promise((resolve, reject) => {
      Article.find()
        .then(articles => {
          return resolve(articles);
        })
        .catch(error => {
          return reject(error);
        });
    });
  },
  createArticle: (article) => {
    return new Promise((resolve, reject) => {
      Article.create(article)
        .then(result => {
          return resolve(result);
        })
        .catch(error => {
          return reject(error);
        });
    });
  },
  updateArticle: (article, id) => {
    return new Promise((resolve, reject) => {
      Article.update(id, article)
        .then(result => {
          return resolve(result);
        })
        .catch(error => {
          return reject(error);
        });
    });
  }
};

