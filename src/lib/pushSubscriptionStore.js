import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const storePath =
  process.env.PUSH_SUBSCRIPTIONS_FILE ||
  path.join(process.cwd(), 'database', 'push-subscriptions.json');

function validateSubscription(subscription) {
  if (!subscription || typeof subscription !== 'object') {
    throw new Error('Subscription must be an object.');
  }

  if (!subscription.endpoint || typeof subscription.endpoint !== 'string') {
    throw new Error('Subscription endpoint is missing.');
  }

  if (
    !subscription.keys ||
    typeof subscription.keys.p256dh !== 'string' ||
    typeof subscription.keys.auth !== 'string'
  ) {
    throw new Error('Subscription keys are missing.');
  }

  return {
    endpoint: subscription.endpoint,
    expirationTime: subscription.expirationTime ?? null,
    keys: {
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  };
}

async function readSubscriptions() {
  try {
    const raw = await readFile(storePath, 'utf8');
    const subscriptions = JSON.parse(raw);
    return Array.isArray(subscriptions) ? subscriptions : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeSubscriptions(subscriptions) {
  await mkdir(path.dirname(storePath), { recursive: true });
  await writeFile(storePath, `${JSON.stringify(subscriptions, null, 2)}\n`);
}

export async function upsertSubscription(subscription, metadata = {}) {
  const normalized = validateSubscription(subscription);
  const subscriptions = await readSubscriptions();
  const now = new Date().toISOString();
  const existingIndex = subscriptions.findIndex(
    (item) => item.endpoint === normalized.endpoint
  );

  const savedSubscription = {
    ...normalized,
    userAgent: metadata.userAgent || null,
    createdAt:
      existingIndex >= 0 ? subscriptions[existingIndex].createdAt || now : now,
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    subscriptions[existingIndex] = savedSubscription;
  } else {
    subscriptions.push(savedSubscription);
  }

  await writeSubscriptions(subscriptions);

  return {
    subscription: savedSubscription,
    count: subscriptions.length,
  };
}

export async function getAllSubscriptions() {
  return readSubscriptions();
}

export async function deleteSubscription(endpoint) {
  if (!endpoint) return { removed: false, count: 0 };

  const subscriptions = await readSubscriptions();
  const filtered = subscriptions.filter((item) => item.endpoint !== endpoint);

  if (filtered.length !== subscriptions.length) {
    await writeSubscriptions(filtered);
  }

  return {
    removed: filtered.length !== subscriptions.length,
    count: filtered.length,
  };
}
