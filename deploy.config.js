/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
const env = dotenv.parse(fs.readFileSync(path.resolve(__dirname, './.env')));

module.exports = {
  oauthToken: 'y0__xDW_OoEGMHdEyCt54XZE7h3SOjELcT0CyLLXWM1iJI2xUzG',
  folderId: 'b1guptf0lgf50k5bubhn',
  functionName: 'tinkoff-robot',
  deploy: {
    files: [ 'package*.json', 'dist/**' ],
    handler: 'dist/serverless/cjs/index.handler',
    runtime: 'nodejs16',
    timeout: 5,
    memory: 128,
    account: 'tinkoff-robot-sa',
    environment: {
      NODE_ENV: 'production',
      TINKOFF_API_TOKEN: env.TINKOFF_API_TOKEN,
      REAL_ACCOUNT_ID: env.REAL_ACCOUNT_ID,
    },
  },
};
