export interface OptionalActivity {
  title: string;
  description: string;
  type: "hidden-gem" | "alternative" | "adventure";
}

export interface CityOptionalActivities {
  city: string;
  activities: OptionalActivity[];
}

export const CITY_OPTIONAL_ACTIVITIES: CityOptionalActivities[] = [
  {
    city: "Varanasi",
    activities: [
      { title: "Ramnagar Fort", description: "18th-century fort across the Ganges with a vintage car museum and Tulsi Manas Mandir nearby", type: "hidden-gem" },
      { title: "Sarnath Deer Park", description: "Where Buddha gave his first sermon — peaceful ruins, museum, and Dhamek Stupa", type: "alternative" },
      { title: "Silk Weaving Workshops", description: "Visit local weavers in Sarai Mohana to see Banarasi silk being handwoven", type: "hidden-gem" },
      { title: "Morning Boat Ride at Assi Ghat", description: "Sunrise boat ride to witness rituals and the ghats waking up — quieter than Dashashwamedh", type: "alternative" },
      { title: "Chunar Fort Day Trip", description: "An ancient fort 40 km from Varanasi with panoramic Ganges views", type: "adventure" },
      { title: "Bharat Kala Bhavan Museum", description: "BHU campus museum with rare miniature paintings, sculptures, and ancient textiles", type: "hidden-gem" },
    ],
  },
  {
    city: "Lucknow",
    activities: [
      { title: "La Martiniere College", description: "Stunning colonial-era school with Indo-European architecture — one of the most beautiful buildings in India", type: "hidden-gem" },
      { title: "Old Lucknow Heritage Walk", description: "Walk through Chowk's narrow lanes discovering old havelis, Shia imambaras, and street food", type: "alternative" },
      { title: "Ambedkar Memorial Park at Night", description: "The illuminated sandstone park is stunning after dark — often missed by tourists", type: "hidden-gem" },
      { title: "Kukrail Forest Reserve", description: "A peaceful green escape on the city outskirts with a crocodile rehabilitation centre", type: "adventure" },
      { title: "Constantia House", description: "The original La Martiniere building, one of the finest examples of 18th-century architecture", type: "hidden-gem" },
      { title: "Nawabi Cuisine Cooking Class", description: "Learn to make galouti kebabs and biryani with local chefs in Old Lucknow", type: "alternative" },
    ],
  },
  {
    city: "Agra",
    activities: [
      { title: "Mehtab Bagh Sunset", description: "Garden across the Yamuna with the best sunset views of the Taj Mahal — far fewer crowds", type: "alternative" },
      { title: "Keetham Lake (Sur Sarovar)", description: "Bird sanctuary and lake 20 km from Agra — great for a peaceful half-day trip", type: "adventure" },
      { title: "Marble Inlay Workshop", description: "Watch artisans create Pietra Dura (marble inlay) using the same technique as the Taj Mahal", type: "hidden-gem" },
      { title: "Jama Masjid Agra", description: "Built by Shah Jahan's daughter — impressive but less touristy than the Taj complex", type: "hidden-gem" },
      { title: "Fatehpur Sikri Day Trip", description: "Mughal ghost city 40 km away with stunning Buland Darwaza and Panch Mahal", type: "alternative" },
      { title: "Chambal River Safari", description: "Spot gharials, dolphins, and migratory birds on a boat safari — 70 km from Agra", type: "adventure" },
    ],
  },
  {
    city: "Allahabad (Prayagraj)",
    activities: [
      { title: "Anand Bhawan Museum", description: "Nehru family's ancestral home turned museum — fascinating political history exhibits", type: "hidden-gem" },
      { title: "Khusro Bagh", description: "Walled Mughal garden with three stunning sandstone tombs, often empty of tourists", type: "hidden-gem" },
      { title: "Boat Ride at Triveni Sangam", description: "Ride to the exact confluence of Ganga, Yamuna, and mythical Saraswati rivers", type: "alternative" },
      { title: "Allahabad University Campus Walk", description: "Beautiful colonial-era buildings and the Muir Central College — architectural marvel", type: "hidden-gem" },
      { title: "Shringverpur (Ramayan Site)", description: "Ancient site 35 km away where Lord Ram crossed the Ganga — peaceful and spiritual", type: "adventure" },
      { title: "Chandrasekhar Azad Park", description: "Historic park where freedom fighter Azad made his last stand — beautiful for evening walks", type: "alternative" },
    ],
  },
];
