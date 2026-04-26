export const DISTRICTS = [
  "Alappuzha",
  "Kottayam",
  "Ernakulam",
  "Thrissur",
  "Kollam",
  "Wayanad",
  "Idukki",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Kannur",
  "Kasaragod",
  "Pathanamthitta",
  "Trivandrum",
] as const;

export const FEATURED_SHOPS = [
  {
    id: "mullapanthal",
    name: "Mullapanthal",
    district: "Kottayam",
    rating: 4.9,
    badge: "Hygiene Verified",
    badgeColor: "bg-green-600",
    tag: "OPEN NOW",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDtRKnc2i9k7SEwueHB4tGtUJE4H7JgA8p6AWjdXjSEhsSSejTcjkfN6Z99ftEZ5ackKKtygL8KJZPjVCNfS_5cOb2K12dNfkkD9XlCpWLC5h8eOi1hzvnHAfmVJMcMu2n64nL8KULjhGKjEk2KYA_wSFoM4crYIX3Ff8P1YrdmwMzjjkwq1LjMIlXYhGQnLzySPW9Zv86vBoWJibZapYx_KOoNAzeiXqpKE5GOrdSIPRfdIodOik4xZm28U8GHHIIRJrJPsbMykY",
    alt: "Traditional thatched roof toddy shop in a lush coconut grove",
  },
  {
    id: "karimpumkala",
    name: "Karimpumkala",
    district: "Alappuzha",
    rating: 4.8,
    badge: "Top Rated",
    badgeColor: "bg-primary-container",
    tag: "FAMOUS FOR FOOD",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJu8Bvwb_h-7hVTXzQFamXklqT_2UuLbWLgpOTZK0DtmB1VYWa0A1ttTWVAA8tuOxoRhVt8kx_aJ9OLFaIUem6Md_mMoOJTikqY27G2ZGLp0Q805mIy2g8232EeBq6QKLc38vF7neFvviE35kcHoULlEQXPZsUgLSD3lYFgt7ndr7PUo3WfgxhLwlHFVjFpEtHuEsf3Nyql-Y_oYqiTRJ7M85Hpvog4DXU0BwSsfakArhwWh_DH2sHRm78Xh9b_aHqkePsOQ02G8c",
    alt: "Aerial view of traditional backwater toddy shop with red tiled roof",
  },
  {
    id: "puzhayoram",
    name: "Puzhayoram",
    district: "Ernakulam",
    rating: 4.7,
    badge: null,
    badgeColor: "",
    tag: "RIVER VIEW",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ73YOD94h6groYgqNCi1NHTRapRDwQgptbzZr_0GF8Y3wHaPJcau_twmPalbxA04lxKuOgsORakqWQ0jMG8FqDJ5PdBNilyCgyd6yW0OSu-DavnAHFqT88GYGnjp1jwsA_2ijjxomiCwNxDaF1bibjRb5Amqiu6fnrAoP7Lry66Tscr8w5soarY8y6wntrvCTp294qhPkBM5P3ulR7vsK7TEfUZt3l95m-atUn4buSF5ChD6UyMVPzzjDAXHqp0JRSe3VLOVrRUs",
    alt: "Interior of a rustic toddy shop with wooden benches and palm leaf decor",
  },
  {
    id: "kiliroor",
    name: "Kiliroor Shaap",
    district: "Kottayam",
    rating: 4.6,
    badge: null,
    badgeColor: "",
    tag: "OLD HERITAGE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBebhMv23641swdu2vkIIXss1Z0c4GBo7JRyaGVF6_lpLN8_R-7gcKL62glqGN4Ie4v56nm08aqHKzM609BJKwVGVni80otA9w5FtMAsi5gyH3rC6FpmRBF8e-jAh8OIWb9flNCjMkWPNisIVAyppsfnue7zAneOkrnxQ45TADVy_6uVImrnH0M317yjZGTvIiB01F6Qg0Z3rehDxXuRmCLtIjU0-N39UWpwroRFq4yZzWSfi2_9QzAlAY9xvhiRQI7G-SVpUtit1Q",
    alt: "Close up of a traditional earthen pot with toddy and spices",
  },
] as const;

export const SIGNATURE_DISHES = [
  {
    name: "Fish Pollichathu",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSNozBLNqSaLWM2KUlgSBwB33LXTRHzLMwy47_m7_7J6HySLPL7HdVG2RB98OjdSkWrGdHAzkg9YE73zDfqD_5kbDqsSBGGRIHqGZk6lmJk7e_S2Q5IZyo_JzUeacbdbt3PjtX9vZW0YanNIA_EEsAjuQlDndvgwoFGBxU1Xc1-X17mLnZdqT9gd-H21LL6a97VaKKtW1-utoinTtkVNUz7aJxcHHjQK5GEx049v41QxBsWcU67PyttX_FUJaoqW-o1fdgZf4kmjs",
    alt: "Spicy Kerala pearl spot fish curry with red gravy and curry leaves",
  },
  {
    name: "Kappa & Meen",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzYtu2qg3mXxnYFGBz_ni-Lw6DuE4hr-qp_Z4cifBuMo_xFsbToH0C2kzY8yH1urmUDUNMB_7BTqA75W9pCrd-uHrR_c1macxBjziSDCMUWkhu-FALWW89gfuWAbk_Pzy9SCKFqnaV1-GGpSpMjEBhI-OWNerUc0qMlRSjEStyxPRSBL3E6uovauItdl94KVK8X2mSBigKEObkp7iiI9J-jp8Er0jsfKklJ5n8DxzCOtCbFJx9ls81Oi9ZenW_3WJKFF2fY3f8Wy4",
    alt: "Steamed tapioca and spicy fish curry served on a banana leaf",
  },
  {
    name: "Beef Roast",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAE6xdeXkixE_ATJIRhg07Q01Wd2H0HYvSGTmh6qQ8hi31r0NbRKU6V2MMuHWcBy2Wjtdqt7VLvvG20lDCa9wCxEejRtAnD7tmJmV1Wt5EBRtXp7vxfUSY7w7w5ikNswlrIqmLZafIHamcHbjCzrSlWgT9BbhdeHZlbmAK9lIT-kCU4GUYLnLwVv502H63a91VJ8TaeztxpvV7YIpHAcMds-IeYpBfhPo2GZS8SVJMZRXYUczermw6Ci0tZAIyUrvco7kA189Q5t7A",
    alt: "Slow cooked beef roast with coconut slivers and curry leaves",
  },
  {
    name: "Prawns Fry",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgBxKVgPApMqaXnT3qg6ZTfTSwFSPBWpvfe6cYDIY-htv73eyDuQoFcSqJPMlTVohnvvMwi9fUQOQS5Tyat5wdK8R9QL6L40Az52f-fT8b0JuwFFlObUtMYq7FCLu5LsnlHeULdJYwZyA7989ey6PKT-g_g9Tz5GL4lfFQuVB2drdPcn9esOQHVrAAPftwyq-VjIkOQT7HK9YoUwbRzvgJeY2odKlLN1t1FqkKPGySk2v5H6H3rIvqX071AoFJWtCxiteiXc9n4z8",
    alt: "Kerala style prawns fry with coconut oil and green chillies",
  },
  {
    name: "Duck Roast",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIOjrTTkEr3d13qCZJ8UPUfHb7NwtzPcZaoW4g0LBfeGLnXk_nYzwPwHrFoXFPhDbTW_rpj3aXwtIIwax8Tx0itbu06Gm1kZVk585n3-lofy6_wPYmI849tX4OkviIBHSklKaWK1LhVQVAoYQQEBM6e5_LV032Wn8qqeZ-5P7ZAuuzKskBAIbi0o0Y9K4hW1tI31wEdNPrjNjSGJEWOzQz26I6R_bTV-Dz2uWyvSdtQcHpGiOQs6pxWIfPeBZDidjUxc7n-Tpwl8A",
    alt: "Kerala style duck roast in thick spicy brown gravy",
  },
  {
    name: "Sweet Toddy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByWtzoSMHwuPAE5SwybdjfH4s8fCzaRtG92QK7RbDj3-3hslHlOr0ogv_8TSO9l5AoJu5bnny3Up-1xtaUDeg9poKKCysyqy7LcncMSsCAv9weZqmvsBTij8-RvAMP8LgLjVTu9zm5yBfCxkGTlcx_yANDzp3c5hr8AJkBunHlh90kpPK3dMlsg7h02gBwNiOZseSrPqDOZ6zw4f74oh6yi1NVme9zGKBiFUFx0tfDjtUcR9eaaSgUMtTE8c0dHBoZNOktAeG4aG8",
    alt: "Fresh white coconut toddy in a traditional glass with clay pot",
  },
] as const;

export const LEADERBOARD = [
  { name: "Mullapanthal Toddy Shop", rating: 4.9 },
  { name: "Karimpumkala Shaap", rating: 4.8 },
  { name: "Nettoor Puzhayoram", rating: 4.7 },
] as const;

export const STATS = [
  { value: "524+", label: "Verified Shops" },
  { value: "14", label: "Districts Covered" },
  { value: "13K+", label: "Expert Reviews" },
  { value: "8.4K", label: "Active Users" },
] as const;

export const HOW_IT_WORKS = [
  {
    icon: "location_on",
    title: "Locate",
    description: "Find verified shops near your current location.",
  },
  {
    icon: "menu_book",
    title: "Check Menu",
    description: "See today's fresh catch and signature dishes.",
  },
  {
    icon: "verified_user",
    title: "Verified Taste",
    description: "Read community reviews and hygiene ratings.",
  },
  {
    icon: "celebration",
    title: "Enjoy",
    description: "Experience authentic Kerala heritage flavors.",
  },
] as const;
