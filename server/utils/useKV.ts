import { ofetch, type FetchOptions } from 'ofetch';

const { accountId, apiToken, namespaceId } = process.env;

type KVValue = {
  name: string;
  metadata: { [index: string]: string };
  expiration: number;
};

type KVResponse<T> = {
  errors: { ode: number; message: string };
  messages: [];
  result: T;
  success: boolean;
};

const useKV = () => {
  // use KV API to store data, this function provides a simple wrapper for calling KV API
  const apiKV = async <T>(url: string, fetchOptions: FetchOptions<'json'>) => {
    const baseURL = `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}`;

    const options: FetchOptions<'json'> = {
      baseURL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      ...fetchOptions,
    };

    return ofetch<T>(url, options);
  };

  // https://developers.cloudflare.com/api/operations/workers-kv-namespace-write-key-value-pair-with-metadata
  const getKeys = async () => {
    const { result } = await apiKV<KVResponse<KVValue[]>>('/keys', {
      method: 'GET',
    });
    return result;
  };

  // https://developers.cloudflare.com/api/operations/workers-kv-namespace-write-key-value-pair-with-metadata
  const setKey = async (
    key: string,
    value: string | Buffer,
    metadata: { [index: string]: string },
  ) => {
    // construct form data
    const body = new FormData();
    body.append('value', value.toString('hex'));
    body.append('metadata', JSON.stringify(metadata));

    const { success } = await apiKV<KVResponse<{}>>(`/values/${key}`, {
      method: 'PUT',
      body,
    });
    return success;
  };

  // https://developers.cloudflare.com/api/operations/workers-kv-namespace-write-key-value-pair-with-metadata
  const getKey = async <T = string>(key: string): Promise<T> => {
    const data = await apiKV<T>(`/values/${key}`, {
      method: 'GET',
    });
    return data;
  };

  return {
    getKeys,
    setKey,
    getKey,
  };
};

export default useKV;
