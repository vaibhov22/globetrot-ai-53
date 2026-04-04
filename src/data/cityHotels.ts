export interface Hotel {
  name: string;
  area: string;
  pricePerNight: number;
}

export interface CityHotels {
  city: string;
  hotels: Hotel[];
}

export const CITY_HOTELS: CityHotels[] = [
  {
    city: "Varanasi",
    hotels: [
      { name: "Hotel Alka", area: "Near Dashashwamedh Ghat", pricePerNight: 1800 },
      { name: "BrijRama Palace", area: "Darbhanga Ghat", pricePerNight: 9500 },
      { name: "Hotel Ganges View", area: "Assi Ghat", pricePerNight: 3500 },
      { name: "Zostel Varanasi", area: "Shivala", pricePerNight: 800 },
      { name: "Taj Nadesar Palace", area: "Nadesar", pricePerNight: 18000 },
    ],
  },
  {
    city: "Lucknow",
    hotels: [
      { name: "Taj Mahal Lucknow", area: "Vipin Khand, Gomti Nagar", pricePerNight: 7500 },
      { name: "Hotel Gomti", area: "Sapru Marg", pricePerNight: 2200 },
      { name: "Vivanta Lucknow", area: "Gomti Nagar", pricePerNight: 6000 },
      { name: "Hotel Levana", area: "Hazratganj", pricePerNight: 3000 },
      { name: "FabHotel Awadh", area: "Aminabad", pricePerNight: 1200 },
    ],
  },
  {
    city: "Agra",
    hotels: [
      { name: "The Oberoi Amarvilas", area: "Taj East Gate Road", pricePerNight: 25000 },
      { name: "Hotel Atulyaa Taj", area: "Fatehabad Road", pricePerNight: 3500 },
      { name: "Crystal Sarovar Premiere", area: "Fatehabad Road", pricePerNight: 4500 },
      { name: "Zostel Agra", area: "Near Taj Mahal", pricePerNight: 700 },
      { name: "Hotel Sidhartha", area: "Western Gate, Taj Mahal", pricePerNight: 2000 },
    ],
  },
  {
    city: "Prayagraj",
    hotels: [
      { name: "Hotel Kanha Shyam", area: "Civil Lines", pricePerNight: 2500 },
      { name: "Hotel Yatrik", area: "Sardar Patel Marg", pricePerNight: 1800 },
      { name: "Hotel Milan Palace", area: "MG Marg", pricePerNight: 1500 },
      { name: "The Legend Hotel", area: "Civil Lines", pricePerNight: 3500 },
      { name: "Zostel Prayagraj", area: "Lukerganj", pricePerNight: 600 },
    ],
  },
];
