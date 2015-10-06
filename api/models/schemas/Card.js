var Joi = require('joi');

module.exports = {
  'title' : Joi.string(),
  'description' : Joi.string(),
  'language' : Joi.string().allow(['xml', 'cs', 'bash', 'cmake', 'coffeescript', 'cpp', 'css', 'go', 'gradle', 'java', 'json', 'javascript', 'objectivec', 'powershell', 'sql', 'swift', 'typescript' ]),
  'tags' : Joi.array().items(Joi.string()),
  'snippet' : Joi.string()
};
