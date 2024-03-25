import Joi, { Schema, ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';

/**
 * Interface for validated requests extending Express Request interface.
 */
interface ValidatedRequest extends Request {
  value?: any; 
}

/**
 * Middleware function to validate request bodies against a provided schema.
 * @param schema The Joi schema to validate the request body against.
 * @returns Middleware function to be used in Express route handlers.
 */
const validateRequest = (schema: Schema) => {
  return (req: ValidatedRequest, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // Joi validation error occurred
      const errorMessage = (error as ValidationError).details[0].message;
      return res.status(400).json({ message: errorMessage });
    }
    if (!req.value) {
      req.value = {}; // create an empty object if the request value doesn't exist yet
    }
    req.value["body"] = req.body;
    next();
  };
};

/**
 * Interface for a collection of Joi schemas.
 */
interface Schemas {
  [key: string]: Schema;
}

/**
 * Collection of Joi schemas.
 */
const schemas: Schemas = {
  authSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(10).required(),
  }),
};

/**
 * Joi schema for sign-up requests.
 */
const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).trim().required().messages({
    "string.pattern.base": `Password should be 6 characters and contain letters or numbers only`,
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,
  }),
});

/**
 * Joi schema for login requests.
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).trim().required().messages({
    "string.pattern.base": `Password should be 6 characters and contain letters or numbers only`,
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,
  }),
});
/**
 * Joi schema for Saving A Fixture.
 */
const fixtureSchema = Joi.object({
  homeTeam: Joi.string().required(),
  awayTeam: Joi.string().required(),
  location: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed').required(),
    result: Joi.object({
    homeTeamScore: Joi.number().integer().min(0).required(),
    awayTeamScore: Joi.number().integer().min(0).required(),
  }),
});






// const fixtureSchema: Joi.object({
//   homeTeam: Joi.string().required(),
//   awayTeam: Joi.string().required(),
//   startTime: Joi.date().iso().required(),
//   location: Joi.string().required(),
//   status: Joi.string().valid('pending', 'completed').required(),
//   result: Joi.object({
//     homeTeamScore: Joi.number().integer().min(0).required(),
//     awayTeamScore: Joi.number().integer().min(0).required(),
//   }).optional(),
// }),
// };


export { validateRequest,loginSchema, signUpSchema, schemas };
