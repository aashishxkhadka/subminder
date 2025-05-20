import cron from 'node-cron';
import { checkExpiringSubscriptions } from './check-expiring-subscriptions.js';
import dotenv from "dotenv";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

console.log('Starting subscription reminder scheduler...');

// Schedule the job to run at 15:35 every day
cron.schedule('37 15 * * *', async () => {
  console.log('Running scheduled subscription check...');
  await checkExpiringSubscriptions();
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Stopping scheduler...');
  process.exit(0);
}); 