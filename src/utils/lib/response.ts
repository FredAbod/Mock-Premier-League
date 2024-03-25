import { Response } from 'express';

/**
 * Sends an error response with the specified status code and message.
 * @param res The Express response object.
 * @param code The HTTP status code for the response.
 * @param message The error message to send.
 */
const errorResMsg = (res: Response, code: number, message: string) =>
  res.status(code).json({ status: 'error', message });

/**
 * Sends a success response with the specified status code, message, and data.
 * @param res The Express response object.
 * @param code The HTTP status code for the response.
 * @param responseData The data to include in the response.
 */
const successResMsg = (res: Response, code: number, responseData: { message: string, [key: string]: any }) => {
  const { message, ...data } = responseData;
  return res.status(code).json({ status: 'success', message, data });
};

/**
 * Redirects the client to the specified URL.
 * @param res The Express response object.
 * @param url The URL to redirect to.
 */
const redirect = (res: Response, url: string) => res.status(302).redirect(url);

export { errorResMsg, successResMsg, redirect };
