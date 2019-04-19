import Ajv from 'ajv';
import dotenv from 'dotenv';
import fs from 'fs';

export interface Env {
  EINSTEIN_VISION_ACCOUNT_ID: string;
  EINSTEIN_VISION_PRIVATE_KEY: string;
  EINSTEIN_VISION_URL: string;
  PORT: number;
}
const ENV_KEYS = [
  'EINSTEIN_VISION_ACCOUNT_ID',
  'EINSTEIN_VISION_PRIVATE_KEY',
  'EINSTEIN_VISION_URL',
  'PORT',
];
const ajv = new Ajv();
const ENV_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  required: ENV_KEYS,
  type: 'object',
};
const validateEnvironment = ajv.compile(ENV_SCHEMA);
const ENV_FILE = './.env';
if (fs.existsSync(ENV_FILE)) {
  ENV_KEYS.map((key: string) => delete process.env[key]);
  dotenv.config();
}
const validEnvironment = validateEnvironment(process.env);
if (!validEnvironment) {
  console.log('Invalid Environment');
  process.exit(1);
}
const {
  EINSTEIN_VISION_ACCOUNT_ID,
  EINSTEIN_VISION_PRIVATE_KEY,
  EINSTEIN_VISION_URL,
  PORT,
} = process.env;
export default {
  EINSTEIN_VISION_ACCOUNT_ID,
  EINSTEIN_VISION_PRIVATE_KEY,
  EINSTEIN_VISION_URL,
  PORT: parseInt(PORT, 10),
} as Env;
