export const UP_CITIES = [
  "Agra", "Aligarh", "Allahabad (Prayagraj)", "Ambedkar Nagar", "Amethi",
  "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat",
  "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki",
  "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun",
  "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah",
  "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar (Noida)",
  "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur",
  "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur",
  "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj",
  "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow",
  "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau",
  "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit",
  "Pratapgarh", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal",
  "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar",
  "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
] as const;

export type UPCity = typeof UP_CITIES[number];

// Major train & bus routes between UP cities
export interface TransportRoute {
  from: string;
  to: string;
  trainName?: string;
  trainNumber?: string;
  duration: string;
  frequency: string;
  type: "train" | "bus";
  fare: string;
}

export const TRANSPORT_ROUTES: TransportRoute[] = [
  // Train Routes
  { from: "Lucknow", to: "Varanasi", trainName: "Lucknow Mail", trainNumber: "14235", duration: "5h 30m", frequency: "Daily", type: "train", fare: "₹250–₹1200" },
  { from: "Lucknow", to: "Agra", trainName: "Lucknow Agra Express", trainNumber: "14853", duration: "5h 45m", frequency: "Daily", type: "train", fare: "₹200–₹1000" },
  { from: "Lucknow", to: "Kanpur Nagar", trainName: "Shatabdi Express", trainNumber: "12003", duration: "1h 15m", frequency: "Daily", type: "train", fare: "₹150–₹800" },
  { from: "Lucknow", to: "Gorakhpur", trainName: "Gorakhdham Express", trainNumber: "12555", duration: "5h 30m", frequency: "Daily", type: "train", fare: "₹250–₹1100" },
  { from: "Lucknow", to: "Allahabad (Prayagraj)", trainName: "Prayagraj Express", trainNumber: "12417", duration: "3h 30m", frequency: "Daily", type: "train", fare: "₹200–₹900" },
  { from: "Lucknow", to: "Bareilly", trainName: "Lucknow Bareilly Express", trainNumber: "15909", duration: "4h 30m", frequency: "Daily", type: "train", fare: "₹200–₹850" },
  { from: "Lucknow", to: "Jhansi", trainName: "Pushpak Express", trainNumber: "12533", duration: "5h", frequency: "Daily", type: "train", fare: "₹250–₹1100" },
  { from: "Lucknow", to: "Meerut", trainName: "Lucknow Meerut Express", trainNumber: "14117", duration: "7h", frequency: "Daily", type: "train", fare: "₹300–₹1200" },
  { from: "Agra", to: "Mathura", trainName: "EMU Local", trainNumber: "64181", duration: "1h", frequency: "Multiple daily", type: "train", fare: "₹30–₹150" },
  { from: "Agra", to: "Jhansi", trainName: "Bhopal Shatabdi", trainNumber: "12001", duration: "2h", frequency: "Daily", type: "train", fare: "₹400–₹1200" },
  { from: "Varanasi", to: "Allahabad (Prayagraj)", trainName: "Vande Bharat Express", trainNumber: "22436", duration: "2h", frequency: "Daily", type: "train", fare: "₹400–₹1500" },
  { from: "Varanasi", to: "Gorakhpur", trainName: "Intercity Express", trainNumber: "15017", duration: "4h 30m", frequency: "Daily", type: "train", fare: "₹200–₹800" },
  { from: "Varanasi", to: "Jaunpur", trainName: "Passenger", trainNumber: "54252", duration: "1h 30m", frequency: "Multiple daily", type: "train", fare: "₹40–₹200" },
  { from: "Kanpur Nagar", to: "Allahabad (Prayagraj)", trainName: "Sangam Express", trainNumber: "14863", duration: "4h", frequency: "Daily", type: "train", fare: "₹180–₹800" },
  { from: "Gorakhpur", to: "Ayodhya", trainName: "Saket Express", trainNumber: "14235", duration: "3h", frequency: "Daily", type: "train", fare: "₹150–₹600" },
  { from: "Meerut", to: "Ghaziabad", trainName: "DEMU", trainNumber: "74043", duration: "45m", frequency: "Multiple daily", type: "train", fare: "₹25–₹100" },
  { from: "Agra", to: "Firozabad", trainName: "Passenger", trainNumber: "54461", duration: "1h 15m", frequency: "Daily", type: "train", fare: "₹30–₹150" },
  { from: "Moradabad", to: "Bareilly", trainName: "Intercity", trainNumber: "15011", duration: "1h 30m", frequency: "Daily", type: "train", fare: "₹60–₹300" },
  { from: "Saharanpur", to: "Meerut", trainName: "Janata Express", trainNumber: "19031", duration: "2h 30m", frequency: "Daily", type: "train", fare: "₹100–₹450" },
  { from: "Allahabad (Prayagraj)", to: "Mirzapur", trainName: "Passenger", trainNumber: "54112", duration: "1h 30m", frequency: "Daily", type: "train", fare: "₹40–₹200" },

  // Bus Routes
  { from: "Lucknow", to: "Varanasi", duration: "6h", frequency: "Every 30 min", type: "bus", fare: "₹400–₹900" },
  { from: "Lucknow", to: "Agra", duration: "6h", frequency: "Every hour", type: "bus", fare: "₹350–₹800" },
  { from: "Lucknow", to: "Kanpur Nagar", duration: "1h 30m", frequency: "Every 15 min", type: "bus", fare: "₹150–₹350" },
  { from: "Lucknow", to: "Gorakhpur", duration: "6h", frequency: "Every hour", type: "bus", fare: "₹400–₹850" },
  { from: "Lucknow", to: "Allahabad (Prayagraj)", duration: "4h", frequency: "Every 30 min", type: "bus", fare: "₹300–₹700" },
  { from: "Lucknow", to: "Ayodhya", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹200–₹500" },
  { from: "Lucknow", to: "Bareilly", duration: "5h", frequency: "Every hour", type: "bus", fare: "₹350–₹750" },
  { from: "Lucknow", to: "Jhansi", duration: "6h", frequency: "Every 2 hours", type: "bus", fare: "₹400–₹900" },
  { from: "Agra", to: "Mathura", duration: "1h 15m", frequency: "Every 20 min", type: "bus", fare: "₹50–₹150" },
  { from: "Agra", to: "Firozabad", duration: "1h 30m", frequency: "Every 30 min", type: "bus", fare: "₹60–₹180" },
  { from: "Varanasi", to: "Allahabad (Prayagraj)", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹250–₹600" },
  { from: "Varanasi", to: "Gorakhpur", duration: "5h 30m", frequency: "Every hour", type: "bus", fare: "₹350–₹750" },
  { from: "Varanasi", to: "Jaunpur", duration: "1h 30m", frequency: "Every 30 min", type: "bus", fare: "₹80–₹200" },
  { from: "Varanasi", to: "Azamgarh", duration: "2h 30m", frequency: "Every hour", type: "bus", fare: "₹150–₹400" },
  { from: "Kanpur Nagar", to: "Allahabad (Prayagraj)", duration: "5h", frequency: "Every hour", type: "bus", fare: "₹300–₹650" },
  { from: "Gorakhpur", to: "Ayodhya", duration: "3h 30m", frequency: "Every hour", type: "bus", fare: "₹200–₹500" },
  { from: "Gorakhpur", to: "Kushinagar", duration: "1h 30m", frequency: "Every 30 min", type: "bus", fare: "₹60–₹180" },
  { from: "Meerut", to: "Ghaziabad", duration: "1h", frequency: "Every 15 min", type: "bus", fare: "₹50–₹150" },
  { from: "Meerut", to: "Muzaffarnagar", duration: "1h 30m", frequency: "Every 30 min", type: "bus", fare: "₹80–₹200" },
  { from: "Gautam Buddha Nagar (Noida)", to: "Agra", duration: "3h 30m", frequency: "Every hour", type: "bus", fare: "₹300–₹700" },
  { from: "Moradabad", to: "Bareilly", duration: "2h", frequency: "Every 30 min", type: "bus", fare: "₹100–₹250" },
  { from: "Saharanpur", to: "Meerut", duration: "3h", frequency: "Every hour", type: "bus", fare: "₹150–₹400" },
  { from: "Allahabad (Prayagraj)", to: "Chitrakoot", duration: "4h", frequency: "Every 2 hours", type: "bus", fare: "₹250–₹550" },
  { from: "Bareilly", to: "Shahjahanpur", duration: "1h 30m", frequency: "Every 30 min", type: "bus", fare: "₹80–₹200" },
];
