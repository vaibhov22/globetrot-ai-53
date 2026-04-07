export interface Place {
  id: string;
  name: string;
  rating: number;
  description: string;
  category: "historical" | "religious" | "nature" | "cultural" | "market" | "food";
}

export interface CityPlaces {
  city: string;
  places: Place[];
}

export const CITY_PLACES: CityPlaces[] = [
  {
    city: "Varanasi",
    places: [
      { id: "v1", name: "Kashi Vishwanath Temple", rating: 4.8, description: "One of the 12 Jyotirlingas, most sacred Shiva temple", category: "religious" },
      { id: "v2", name: "Dashashwamedh Ghat", rating: 4.7, description: "Famous for the spectacular Ganga Aarti ceremony every evening", category: "religious" },
      { id: "v3", name: "Sarnath", rating: 4.6, description: "Where Buddha delivered his first sermon after enlightenment", category: "historical" },
      { id: "v4", name: "Assi Ghat", rating: 4.5, description: "Southernmost ghat, popular for morning yoga and boat rides", category: "cultural" },
      { id: "v5", name: "Manikarnika Ghat", rating: 4.4, description: "Ancient cremation ghat, one of the holiest places in Hinduism", category: "religious" },
      { id: "v6", name: "Ramnagar Fort", rating: 4.3, description: "18th-century fort with museum of vintage cars and royal artifacts", category: "historical" },
      { id: "v7", name: "Tulsi Manas Mandir", rating: 4.4, description: "Modern marble temple where Ramcharitmanas was written", category: "religious" },
      { id: "v8", name: "Bharat Kala Bhavan Museum", rating: 4.3, description: "BHU museum with rare miniature paintings and sculptures", category: "cultural" },
      { id: "v9", name: "Banaras Hindu University (BHU)", rating: 4.5, description: "One of Asia's largest residential universities, beautiful campus", category: "cultural" },
      { id: "v10", name: "Durga Temple (Monkey Temple)", rating: 4.2, description: "Vibrant red temple dedicated to Goddess Durga", category: "religious" },
      { id: "v11", name: "Godowlia Market", rating: 4.1, description: "Bustling market for silk sarees, handicrafts, and street food", category: "market" },
      { id: "v12", name: "Blue Lassi Shop", rating: 4.6, description: "Legendary lassi shop with 80+ flavors near Manikarnika Ghat", category: "food" },
      { id: "v13", name: "Chunar Fort", rating: 4.0, description: "Ancient fort 40 km away with panoramic Ganges views", category: "historical" },
      { id: "v14", name: "Alamgir Mosque", rating: 4.1, description: "Mughal-era mosque overlooking Panchganga Ghat", category: "historical" },
      { id: "v15", name: "Sankat Mochan Hanuman Temple", rating: 4.5, description: "Popular Hanuman temple known for its laddoo prasad", category: "religious" },
      { id: "v16", name: "Dhamek Stupa (Sarnath)", rating: 4.5, description: "Massive 5th-century stupa marking Buddha's first sermon spot", category: "historical" },
      { id: "v17", name: "Evening Boat Ride on Ganges", rating: 4.7, description: "Witness the Ganga Aarti from a boat — magical experience", category: "cultural" },
      { id: "v18", name: "Vishwanath Gali", rating: 4.2, description: "Narrow lane with shops selling puja items, silk, and street food", category: "market" },
      { id: "v19", name: "Kedar Ghat", rating: 4.3, description: "Peaceful ghat with colorful steps and Kedareshwar temple", category: "religious" },
      { id: "v20", name: "Silk Weaving Workshop", rating: 4.4, description: "Watch artisans handweave famous Banarasi silk sarees", category: "cultural" },
    ],
  },
  {
    city: "Agra",
    places: [
      { id: "a1", name: "Taj Mahal", rating: 4.9, description: "UNESCO World Heritage Site — one of the Seven Wonders of the World", category: "historical" },
      { id: "a2", name: "Agra Fort", rating: 4.7, description: "Massive red sandstone fort with palatial chambers and mosques", category: "historical" },
      { id: "a3", name: "Fatehpur Sikri", rating: 4.6, description: "Mughal ghost city with Buland Darwaza, 40 km from Agra", category: "historical" },
      { id: "a4", name: "Mehtab Bagh", rating: 4.5, description: "Garden across Yamuna with best sunset views of Taj Mahal", category: "nature" },
      { id: "a5", name: "Itimad-ud-Daulah's Tomb", rating: 4.5, description: "Baby Taj — delicate marble tomb with intricate inlay work", category: "historical" },
      { id: "a6", name: "Jama Masjid Agra", rating: 4.3, description: "Built by Shah Jahan's daughter, impressive but less touristy", category: "historical" },
      { id: "a7", name: "Kinari Bazaar", rating: 4.1, description: "Vibrant market for traditional items, sweets, and handicrafts", category: "market" },
      { id: "a8", name: "Marble Inlay Workshop", rating: 4.4, description: "Watch artisans create Pietra Dura using Taj Mahal technique", category: "cultural" },
      { id: "a9", name: "Akbar's Tomb (Sikandra)", rating: 4.3, description: "Grand tomb of Emperor Akbar set in beautiful gardens", category: "historical" },
      { id: "a10", name: "Panchi Petha Store", rating: 4.2, description: "Iconic store for Agra's famous petha sweet in many varieties", category: "food" },
      { id: "a11", name: "Chambal River Safari", rating: 4.4, description: "Spot gharials, dolphins, and birds — 70 km from Agra", category: "nature" },
      { id: "a12", name: "Taj Museum", rating: 4.2, description: "Museum inside Taj complex with Mughal-era artifacts", category: "cultural" },
      { id: "a13", name: "Sur Sarovar (Keetham Lake)", rating: 4.1, description: "Bird sanctuary and lake for a peaceful half-day trip", category: "nature" },
      { id: "a14", name: "Guru Ka Taal Gurudwara", rating: 4.3, description: "Beautiful Sikh gurudwara with a large sacred pool", category: "religious" },
      { id: "a15", name: "Chini Ka Rauza", rating: 4.0, description: "Persian-style tomb with remnants of glazed tile decoration", category: "historical" },
      { id: "a16", name: "Anguri Bagh (Agra Fort)", rating: 4.4, description: "Geometric Mughal garden inside Agra Fort complex", category: "nature" },
      { id: "a17", name: "Sadar Bazaar", rating: 4.0, description: "Local market for leather goods, handicrafts, and street food", category: "market" },
      { id: "a18", name: "Dayal Bagh Temple", rating: 4.2, description: "Ongoing marble masterpiece with incredible carving work", category: "religious" },
      { id: "a19", name: "Taj Mahal Sunrise View", rating: 4.8, description: "Experience the Taj at dawn — fewer crowds, golden light", category: "cultural" },
      { id: "a20", name: "Mughal Heritage Walk", rating: 4.3, description: "Guided walk through old Agra's Mughal-era lanes and monuments", category: "cultural" },
    ],
  },
  {
    city: "Ayodhya",
    places: [
      { id: "ay1", name: "Ram Janmabhoomi Temple", rating: 4.9, description: "Newly built grand temple at Lord Ram's birthplace", category: "religious" },
      { id: "ay2", name: "Hanuman Garhi", rating: 4.7, description: "Hilltop Hanuman temple with 76 steps, panoramic city views", category: "religious" },
      { id: "ay3", name: "Kanak Bhawan", rating: 4.6, description: "Temple gifted to Sita by Kaikeyi, beautiful golden idols", category: "religious" },
      { id: "ay4", name: "Saryu River Ghat", rating: 4.5, description: "Sacred river for ritual bathing, beautiful evening aarti", category: "religious" },
      { id: "ay5", name: "Nageshwarnath Temple", rating: 4.4, description: "Ancient Shiva temple believed to be established by Kush", category: "religious" },
      { id: "ay6", name: "Treta Ke Thakur", rating: 4.3, description: "Temple marking the spot where Lord Ram performed Ashwamedha Yagna", category: "religious" },
      { id: "ay7", name: "Ram Ki Paidi", rating: 4.5, description: "Series of ghats on Saryu River, lit beautifully at night", category: "cultural" },
      { id: "ay8", name: "Gulab Bari", rating: 4.2, description: "Mughal rose garden with tomb of Nawab Shuja-ud-Daula", category: "historical" },
      { id: "ay9", name: "Ayodhya Research Institute", rating: 4.1, description: "Museum with ancient manuscripts, sculptures, and artifacts", category: "cultural" },
      { id: "ay10", name: "Mani Parvat", rating: 4.0, description: "Small hill believed to be where a piece of Sanjeevani fell", category: "nature" },
      { id: "ay11", name: "Dashrath Mahal", rating: 4.3, description: "Palace of King Dashrath, Ram's father — ornate temple now", category: "religious" },
      { id: "ay12", name: "Sita Ki Rasoi", rating: 4.2, description: "Ancient kitchen believed to be where Sita cooked", category: "cultural" },
      { id: "ay13", name: "Tulsi Smarak Bhawan", rating: 4.1, description: "Memorial of poet Tulsidas with literary exhibitions", category: "cultural" },
      { id: "ay14", name: "Company Gardens", rating: 4.0, description: "British-era garden, peaceful spot for evening walks", category: "nature" },
      { id: "ay15", name: "Bahu Begum Ka Maqbara", rating: 4.1, description: "Grand tomb of Nawab's wife, fine Mughal architecture", category: "historical" },
      { id: "ay16", name: "Choti Devkali Mandir", rating: 4.0, description: "Small ancient temple with mythological significance", category: "religious" },
      { id: "ay17", name: "Ayodhya Deepotsav Walk", rating: 4.6, description: "Walk through the illuminated city during Diwali celebrations", category: "cultural" },
      { id: "ay18", name: "Guptar Ghat", rating: 4.3, description: "Ghat where Lord Ram is believed to have taken Jal Samadhi", category: "religious" },
      { id: "ay19", name: "Local Sattvik Food Trail", rating: 4.4, description: "Experience pure vegetarian temple cuisine and local sweets", category: "food" },
      { id: "ay20", name: "Ramkatha Museum", rating: 4.2, description: "Interactive museum showcasing the Ramayana through art", category: "cultural" },
    ],
  },
];
