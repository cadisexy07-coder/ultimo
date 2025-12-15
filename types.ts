
export enum View {
  HOME = 'HOME',
  FLIGHTS = 'FLIGHTS',
  HOTELS = 'HOTELS',
  PASSPORT = 'PASSPORT',
  CHECKIN = 'CHECKIN',
  PROFILE = 'PROFILE',
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  imageUrl: string;
  description: string;
  amenities: string[];
}

export interface Flight {
  id: string;
  airline: string;
  logoUrl: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}
