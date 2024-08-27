export function fetchPriceSettings(client: any) {
  return client.from('price_configuration').select('*').single();
}

