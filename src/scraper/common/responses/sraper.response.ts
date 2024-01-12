import { HTTP } from "./code.response";

export const SCRAP_MSG = {
    ERROR: `We're sorry, something went wrong.`,
    NO_DATA: `No data found for the provided selector and attribute.`,
    FORBIDDEN: `Access forbidden.`,
    NOT_FOUND: `URL not found.`,
    SUCCESS: `Successfully scraped data.`,
    INVALID_URL: `Invalid URL provided`
}

export const SCRAP_RESPONSE = {
    SUCCESS: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: SCRAP_MSG.SUCCESS,
    },
    NO_DATA: {
        httpCode: HTTP.SUCCESS,
        statusCode: HTTP.SUCCESS,
        message: SCRAP_MSG.NO_DATA,
    },
    FORBIDDEN: {
        httpCode: HTTP.FORBIDDEN,
        statusCode: HTTP.FORBIDDEN,
        message: SCRAP_MSG.FORBIDDEN,
    },
    NOT_FOUND: {
        httpCode: HTTP.NOT_FOUND,
        statusCode: HTTP.NOT_FOUND,
        message: SCRAP_MSG.NOT_FOUND,
    },
    ERROR: {
        httpCode: HTTP.INTERNAL_SERVER_ERROR,
        statusCode: HTTP.INTERNAL_SERVER_ERROR,
        message: SCRAP_MSG.ERROR,
    },
    INVALID_URL: {
        httpCode: HTTP.BAD_REQUEST,
        statusCode: HTTP.BAD_REQUEST,
        message: SCRAP_MSG.INVALID_URL,
    },
};