export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;

  providerId: string;
  categoryId: string;

  provider?: {
    id: string;
    shopName: string;
    address: string;
  };

  category?: {
    id: string;
    name: string;
  };
}
