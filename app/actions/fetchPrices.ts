export function fetchPrices(client, id: string) {
    return client
      .from('prices')
      .select(`*`)
    
  }