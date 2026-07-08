const requiredEnv = {
  url: 'SUPABASE_URL',
  serviceRoleKey: 'SUPABASE_SERVICE_ROLE_KEY',
};

function getSupabaseConfig() {
  const url = process.env[requiredEnv.url];
  const serviceRoleKey = process.env[requiredEnv.serviceRoleKey];

  if (!url || !serviceRoleKey) {
    throw new Error(
      `${requiredEnv.url} and ${requiredEnv.serviceRoleKey} are required`
    );
  }

  return {
    url: url.replace(/\/$/, ''),
    serviceRoleKey,
  };
}

export function createSupabaseServerClient() {
  const { url, serviceRoleKey } = getSupabaseConfig();

  return {
    async request(path, options = {}) {
      const response = await fetch(`${url}/rest/v1${path}`, {
        ...options,
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(data?.message || data?.error || response.statusText);
      }

      return {
        data,
        headers: response.headers,
        status: response.status,
      };
    },
  };
}
