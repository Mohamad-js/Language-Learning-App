import { createSupabaseServerClient } from '@/lib/supabaseServer';

const tableName =
  process.env.SUPABASE_PUSH_SUBSCRIPTIONS_TABLE || 'push_subscriptions';

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

function tablePath(searchParams) {
  return `/${tableName}${searchParams ? `?${searchParams}` : ''}`;
}

async function getSubscriptionCount(client) {
  const params = new URLSearchParams({ select: 'endpoint' });
  const { headers } = await client.request(tablePath(params), {
    headers: {
      Prefer: 'count=exact',
      Range: '0-0',
    },
  });
  const contentRange = headers.get('content-range');
  const count = contentRange?.split('/')?.[1];

  return Number.isFinite(Number(count)) ? Number(count) : 0;
}

export async function upsertSubscription(subscription, metadata = {}) {
  const normalized = validateSubscription(subscription);
  const client = createSupabaseServerClient();
  const now = new Date().toISOString();
  const params = new URLSearchParams({ on_conflict: 'endpoint' });

  const { data } = await client.request(tablePath(params), {
    method: 'POST',
    headers: {
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      endpoint: normalized.endpoint,
      subscription: normalized,
      user_agent: metadata.userAgent || null,
      updated_at: now,
    }),
  });

  return {
    subscription: data?.[0]?.subscription || normalized,
    count: await getSubscriptionCount(client),
  };
}

export async function getAllSubscriptions() {
  const client = createSupabaseServerClient();
  const params = new URLSearchParams({ select: 'subscription' });
  const { data } = await client.request(tablePath(params));

  return Array.isArray(data)
    ? data.map((item) => item.subscription).filter(Boolean)
    : [];
}

export async function deleteSubscription(endpoint) {
  if (!endpoint) return { removed: false, count: 0 };

  const client = createSupabaseServerClient();
  const params = new URLSearchParams({
    endpoint: `eq.${endpoint}`,
    select: 'endpoint',
  });

  const { data } = await client.request(tablePath(params), {
    method: 'DELETE',
    headers: {
      Prefer: 'return=representation',
    },
  });

  return {
    removed: Array.isArray(data) && data.length > 0,
    count: await getSubscriptionCount(client),
  };
}
