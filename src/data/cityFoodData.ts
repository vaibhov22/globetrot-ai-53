export interface FoodItem {
  dish: string;
  place: string;
  address: string;
  description?: string;
  type: "veg" | "non-veg";
}

export interface CityFood {
  city: string;
  items: FoodItem[];
}

export const CITY_FOOD_DATA: CityFood[] = [
  {
    city: "Varanasi",
    items: [
      { dish: "Blue Lassi", place: "Blue Lassi Shop", address: "Near Manikarnika Ghat, Varanasi", description: "Legendary thick lassi in over 80 flavors, served in clay cups", type: "veg" },
      { dish: "Kachori Sabzi", place: "Ram Bhandar", address: "Thatheri Bazaar, Varanasi", description: "Crispy kachori with spicy aloo sabzi — a Varanasi breakfast staple", type: "veg" },
      { dish: "Tamatar Chaat", place: "Deena Chaat Bhandar", address: "Godowlia Chowk, Varanasi", description: "Tangy tomato-based chaat unique to Varanasi", type: "veg" },
      { dish: "Malaiyo", place: "Street vendors at Godowlia", address: "Godowlia, Varanasi", description: "Foamy saffron milk dessert, seasonal winter delicacy", type: "veg" },
      { dish: "Banarasi Paan", place: "Keshav Tambul Bhandar", address: "Vishwanath Gali, Varanasi", description: "Iconic betel leaf preparation with sweet fillings", type: "veg" },
      { dish: "Thandai", place: "Godowlia Market", address: "Godowlia Chowk, Varanasi", description: "Chilled spiced milk drink, especially popular during Holi", type: "veg" },
      { dish: "Kebabs & Biryani", place: "Haji Biryani", address: "Madanpura, Varanasi", description: "Authentic Mughlai biryani and seekh kebabs", type: "non-veg" },
      { dish: "Seekh Kebab", place: "Lazzat Restaurant", address: "Bhelupur, Varanasi", description: "Juicy minced meat kebabs grilled over charcoal", type: "non-veg" },
      { dish: "Chicken Tikka", place: "Mughals Restaurant", address: "Sigra, Varanasi", description: "Tandoori chicken tikka with mint chutney", type: "non-veg" },
    ],
  },
  {
    city: "Lucknow",
    items: [
      { dish: "Galouti Kebab", place: "Tunday Kababi", address: "Aminabad, Lucknow", description: "Melt-in-mouth minced meat kebabs, 100+ year old recipe", type: "non-veg" },
      { dish: "Basket Chaat", place: "Royal Cafe", address: "Hazratganj, Lucknow", description: "Chaat served in a crispy edible basket, a Lucknow original", type: "veg" },
      { dish: "Lucknawi Biryani", place: "Idris Biryani", address: "Chowk, Lucknow", description: "Slow-cooked dum biryani with fragrant spices", type: "non-veg" },
      { dish: "Kulfi Faluda", place: "Prakash Ki Kulfi", address: "Aminabad, Lucknow", description: "Dense creamy kulfi with rose faluda noodles", type: "veg" },
      { dish: "Sheermal & Nihari", place: "Raheem's", address: "Chowk, Lucknow", description: "Saffron-laced bread with slow-cooked stew, a Nawabi breakfast", type: "non-veg" },
      { dish: "Makkhan Malai", place: "Street vendors", address: "Chowk area, Lucknow", description: "Airy saffron-topped milk foam, winter-only delicacy", type: "veg" },
      { dish: "Chole Bhature", place: "Sardar Ji Ke Mashoor Chole Bhature", address: "Lalbagh, Lucknow", description: "Fluffy fried bread with spicy chickpea curry", type: "veg" },
      { dish: "Kakori Kebab", place: "Dastarkhwan", address: "Multiple outlets, Lucknow", description: "Ultra-smooth minced lamb kebab, a Lucknow specialty", type: "non-veg" },
    ],
  },
  {
    city: "Agra",
    items: [
      { dish: "Petha", place: "Panchi Petha", address: "Hari Parvat Crossing, Agra", description: "Iconic translucent sweet made from ash gourd, Agra's signature", type: "veg" },
      { dish: "Bedai & Jalebi", place: "Deviram Sweets", address: "Kinari Bazaar, Agra", description: "Crispy stuffed bread with potato curry and hot jalebis", type: "veg" },
      { dish: "Mughlai Paratha", place: "Mama Chicken Mama Franky", address: "Sadar Bazaar, Agra", description: "Stuffed paratha with minced meat filling", type: "non-veg" },
      { dish: "Dalmoth", place: "Bhagat Halwai", address: "Sadar Bazaar, Agra", description: "Crunchy spiced lentil snack mix, Agra's famous namkeen", type: "veg" },
      { dish: "Chaat", place: "Chaat Wali Gali", address: "Near Jama Masjid, Agra", description: "Diverse street chaat including dahi puri and aloo tikki", type: "veg" },
      { dish: "Chicken Seekh Roll", place: "Al Jawahar", address: "Taj Nagri Phase 1, Agra", description: "Juicy seekh kebab wrapped in roomali roti", type: "non-veg" },
      { dish: "Tandoori Chicken", place: "Pinch of Spice", address: "Fatehabad Road, Agra", description: "Classic tandoori chicken in a fine dining setting", type: "non-veg" },
    ],
  },
  {
    city: "Prayagraj",
    items: [
      { dish: "Kachori Sabzi", place: "Netram", address: "Katra, Prayagraj", description: "Famous crispy kachori with spicy potato curry since 1865", type: "veg" },
      { dish: "Samosa", place: "Loknath Ki Galliyan Chaat", address: "Civil Lines, Prayagraj", description: "Crispy samosas with tangy chutney and spices", type: "veg" },
      { dish: "Chaat", place: "Kamdhenu Sweets", address: "Civil Lines, Prayagraj", description: "Papdi chaat and dahi bhalla in a clean shop setting", type: "veg" },
      { dish: "Lassi & Rabri", place: "Netram Moolchand Lassi", address: "Katra, Prayagraj", description: "Thick creamy lassi topped with malai, a Prayagraj staple", type: "veg" },
      { dish: "Jalebi", place: "Ganga Jamuna Sweets", address: "MG Marg, Prayagraj", description: "Hot crispy jalebis dunked in sugar syrup", type: "veg" },
      { dish: "Kebab Paratha", place: "El Chico", address: "Civil Lines, Prayagraj", description: "Mughlai-style kebab rolls and parathas", type: "non-veg" },
      { dish: "Biryani", place: "Nawab Sahab Restaurant", address: "Mutthiganj, Prayagraj", description: "Hyderabadi-style dum biryani popular among locals", type: "non-veg" },
    ],
  },
  {
    city: "Ayodhya",
    items: [
      { dish: "Kachori Sabzi", place: "Ram Janaki Bhojanalaya", address: "Near Hanuman Garhi, Ayodhya", description: "Traditional crispy kachori with spicy potato curry", type: "veg" },
      { dish: "Jalebi", place: "Shri Ram Mishthan Bhandar", address: "Naya Ghat Road, Ayodhya", description: "Hot crispy jalebis — a must-try after temple visit", type: "veg" },
      { dish: "Sattvik Thali", place: "Janaki Mahal Restaurant", address: "Near Ram Janmabhoomi, Ayodhya", description: "Pure vegetarian thali with dal, sabzi, roti, rice, and sweets", type: "veg" },
      { dish: "Peda & Laddoo", place: "Ayodhya Prasad Bhandar", address: "Hanuman Garhi Market, Ayodhya", description: "Temple-style sweets made with pure ghee and milk", type: "veg" },
      { dish: "Lassi", place: "Saryu Ghat Stalls", address: "Near Saryu River, Ayodhya", description: "Thick creamy lassi served in clay cups", type: "veg" },
      { dish: "Chaat", place: "Gali Chaat Corner", address: "Near Kanak Bhawan, Ayodhya", description: "Papdi chaat, gol gappe, and aloo tikki — evening favorites", type: "veg" },
      { dish: "Poori Sabzi", place: "Bhojanalaya Near Dashrath Mahal", address: "Dashrath Mahal Road, Ayodhya", description: "Fluffy pooris with aloo sabzi, a pilgrim breakfast staple", type: "veg" },
    ],
  },
];
