import Queue from 'bull';
import redisConfig from '../config/redis';

import AlertMail from '../jobs/AlertMail';

// @ts-ignore
export const mailQueue = new Queue(AlertMail.key, redisConfig);
