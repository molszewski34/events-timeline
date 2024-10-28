export function fetchPrices(client: any) {
  return client.from('prices').select(`*`);
}
