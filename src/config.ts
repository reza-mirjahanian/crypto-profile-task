import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue ? : string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Environment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const SERVER_PORT: number = parseInt(checkEnv("SERVER_PORT"), 10);
export const SERVER_URL: string = checkEnv("SERVER_URL");
export const DBURL: string = checkEnv("DBURL");
export const DB_NAME: string = checkEnv("DB_NAME");
export const CORS_ORIGINS = [`${SERVER_URL}:${SERVER_PORT}`];
export const NODE_ENV = process.env.NODE_ENV || checkEnv("NODE_ENV") || 'development';