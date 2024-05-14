import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(8000),
  OPENAI_API_KEY: Joi.string().required(),
  OPENAI_ASSISTANT_ID: Joi.string().required(),
});
