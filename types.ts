
export interface CompanyDetail {
  id: string;
  name: string;
  product: string;
  role: string;
  email: string;
  details: string;
}

export interface MarketInsight {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

export interface SearchResponse {
  companies: CompanyDetail[];
  insights: MarketInsight[];
}
