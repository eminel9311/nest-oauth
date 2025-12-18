import Joi from 'joi';

export const validationSchema = Joi.object({
  // App config
  APP_ID: Joi.string().uuid({ version: 'uuidv4' }).required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  DOMAIN: Joi.string().domain().required(),
  URL: Joi.string().uri().required(),

  // Database
  DATABASE_URL: Joi.string().required(),

  // Redis
  REDIS_URL: Joi.string().required(),

  // JWT
  JWT_ACCESS_TIME: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_TIME: Joi.number().required(),
  JWT_CONFIRMATION_SECRET: Joi.string().required(),
  JWT_CONFIRMATION_TIME: Joi.number().required(),
  JWT_RESET_PASSWORD_SECRET: Joi.string().required(),
  JWT_RESET_PASSWORD_TIME: Joi.number().required(),

  // Cookie
  REFRESH_COOKIE: Joi.string().required(),
  COOKIE_SECRET: Joi.string().required(),

  // Email (optional for now)
  EMAIL_HOST: Joi.string().optional(),
  EMAIL_PORT: Joi.number().optional(),
  EMAIL_SECURE: Joi.bool().optional(),
  EMAIL_USER: Joi.string().optional(),
  EMAIL_PASSWORD: Joi.string().optional(),

  // Throttler
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(10),
});
