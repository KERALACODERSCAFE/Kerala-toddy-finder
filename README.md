# 🍶 Toddy Shop Finder

> Discover authentic Kerala toddy shop experiences — where tradition meets taste.

---

## 🌴 Introduction

Kerala’s toddy shops have evolved into vibrant destinations offering **authentic cuisine, cultural richness, and quality experiences** for locals and tourists alike.

However, there is no centralized platform to discover the best toddy shops based on **hygiene, food quality, and overall experience**.

👉 **Toddy Shop Finder** bridges this gap by providing a modern, community-driven discovery platform.

---

## 🎯 Project Vision

> To become the most trusted platform for discovering authentic toddy shop experiences in Kerala.

---

## 🧭 Project Objectives

* 🔍 Help users find the best toddy shops
* 🧼 Promote hygiene and quality standards
* 📈 Support local businesses
* 🌍 Enhance tourism
* ⭐ Provide user-driven insights

---

## ✨ Key Features

* 🔎 Shop discovery by location
* ⭐ Ratings & reviews
* 🍛 Food highlights
* 🧼 Hygiene indicators
* 📸 Photo sharing
* 🌍 Tourist-friendly info
* ❤️ Favorites & recommendations

---

## 🏗️ Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Backend  | Django + DRF        |
| Frontend | Next.js + Tailwind  |
| Database | PostgreSQL          |

---

## 📂 Project Structure

```
toddy_shop_frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — fonts, navbar, footer, mobile nav
│   │   ├── page.tsx             # Landing page
│   │   ├── explore/
│   │   │   └── page.tsx         # Map-based shop explorer
│   │   ├── community/
│   │   │   └── page.tsx         # Heritage hub — stories, dish gallery, CTA
│   │   ├── shops/
│   │   │   └── [id]/page.tsx    # Individual shop detail
│   │   └── admin/
│   │       └── page.tsx         # Admin panel (placeholder)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedShops.tsx
│   │   │   ├── DistrictExplorer.tsx
│   │   │   ├── SignatureFlavors.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       ├── ShopCard.tsx
│   │       └── LeafChip.tsx
│   └── lib/
│       ├── constants.ts         # Shops, districts, dishes, stats
│       ├── explore-data.ts      # Map markers, recommended shops
│       └── community-data.ts    # Stories, dish gallery, connoisseurs
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

### Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero with search, featured shops, district explorer, signature flavors, animated how-it-works, CTA |
| `/explore` | Interactive map with floating search, shop markers, side drawer with recommendations |
| `/community` | Heritage hub — stories feed, bento dish gallery, top connoisseurs leaderboard, join CTA |
| `/shops/[id]` | Individual shop detail (placeholder, ready for API integration) |
| `/admin` | Admin panel (placeholder) |

### Design System

The frontend follows the project's **Tactile Minimalism** design language:

| Token | Value |
|-------|-------|
| Primary | Deep Forest Green `#003e1c` / `#1e5631` |
| Accent | Warm Ochre `#ffb148` / `#855300` |
| Surface | Earthy Cream `#fdf6e3` |
| Heading font | Cormorant Garamond (serif, editorial) |
| Body font | Nunito (rounded, modern) |
| Icons | Material Symbols Outlined |

### Frontend Setup

```bash
cd toddy_shop_frontend
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

---

## 📂 Backend Structure

```
toddy_shop_backend/
├── manage.py
├── pyproject.toml
│
├── config/                # Django project configuration
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── common/                # Shared infrastructure & utilities
│   ├── exceptions.py      # Custom exception handling
│   ├── middleware.py      # Request/response middleware
│   ├── pagination.py      # Common pagination logic
│   ├── responses.py       # Standard API response format
│   └── utils/             # Helper utilities
│
├── core/                  # Master / reference data (domain layer)
│   ├── models.py          # District, Place, Category, etc.
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
│
└── shops/                 # Transactional domain (business data)
    ├── models.py          # ToddyShop, License, ShopFoodMapping
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── migrations/
```

---

## ⚙️ Architecture Decisions


### 🔹 Layered Responsibility

| Layer  | Responsibility            |
| ------ | ------------------------- |
| core   | Master/reference data     |
| shops  | Business/transaction data |
| common | Shared utilities & infra  |
| config | Project configuration     |

---

## 🧩 Core Module Responsibilities

* District
* Place
* Food Category
* Shop Category
* Facility
* Hygiene Tags
* Rating Types
* Media Types
* License Types

---

## 🏪 Shops Module Responsibilities

* Toddy Shop Management
* License Handling
* Shop-Food Mapping
* Shop-related operations

---

## ⚙️ Development Rules

* ✅ Business logic in `views.py`
* ✅ Validation is mandatory
* ✅ Use common response format
* ✅ Use centralized exception handling
* ✅ Logging should be implemented

---

## 🤝 Contributing

We welcome all contributors ❤️

### 🔹 Steps

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Pick an open issue to work on
5. Make your changes and commit: `git commit -m "feat: your message"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request to `KERALACODERSCAFE/Kerala-toddy-finder:main`

See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup instructions.

---


## 🌟 Future Scope

* 📱 Mobile app integration
* 🗺️ Advanced search & filters
* ⭐ AI-based recommendations
* 🌍 Tourism integration

---

## 💡 Vision Beyond Code

> This project is about **preserving Kerala’s culture**, supporting local businesses, and delivering authentic experiences.

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

Thanks to all contributors building this platform together 🚀
