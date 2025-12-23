/**
 * Playwright global setup
 * Runs before all tests to ensure backend is ready
 */

import { healthCheck } from './utils/api';

const MAX_RETRIES = 30;
const RETRY_DELAY = 1000;

async function waitForBackend(): Promise<void> {
  console.log('Waiting for backend to be ready...');

  for (let i = 0; i < MAX_RETRIES; i++) {
    const isHealthy = await healthCheck();
    if (isHealthy) {
      console.log('Backend is ready!');
      return;
    }

    console.log(`Backend not ready, retrying... (${i + 1}/${MAX_RETRIES})`);
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
  }

  throw new Error('Backend did not become ready in time');
}

export default async function globalSetup(): Promise<void> {
  console.log('=== E2E Test Global Setup ===');

  // Check if we should skip backend check (for UI-only tests)
  if (process.env.SKIP_BACKEND_CHECK === 'true') {
    console.log('Skipping backend check (SKIP_BACKEND_CHECK=true)');
    return;
  }

  await waitForBackend();

  console.log('=== Global Setup Complete ===');
}
