A professional **README.md** is essential for documenting your tech stack, explaining how to handle the API integration, and detailing the Expo Router structure.

Here is a comprehensive README designed specifically for your **React Native Movie App**.

---

# 🎬 FLIX - TMDB Movie Discovery App

A high-performance, minimalist movie discovery application built with **React Native** and **Expo Router**. This app features a high-density grid layout, real-time search with debouncing, and an offline-persistent watchlist.

## 🚀 Features

* **Minimalist Movie Grid:** A 3-column responsive grid maximizing content visibility.
* **Real-time Search:** Optimized search functionality using custom debounce hooks to prevent API rate-limiting.
* **Persistent Watchlist:** Save your favorite movies locally using **Zustand** and `AsyncStorage`.
* **Dynamic Routing:** File-based routing for seamless navigation between Home, Search, and Details.
* **Advanced Data Fetching:** Optimized server-state management with **TanStack Query** for automatic caching.

## 🛠️ Tech Stack

* **Framework:** Expo (React Native)
* **Navigation:** Expo Router (File-based)
* **API:** TMDB (The Movie Database)
* **State Management:** Zustand (with Persist middleware)
* **Data Fetching:** TanStack Query & Axios
* **Styling:** React Native StyleSheet

## 📂 Project Structure

```text
/app                # Expo Router directory (Tabs & Dynamic Routes)
/src
  /api              # Axios configuration & TMDB services
  /components       # Reusable UI (MovieCard, Loader)
  /hooks            # Custom hooks (useHomeData, useDebounce)
  /store            # Zustand global state (Favorites)
  /types            # TypeScript interfaces for TMDB data
  /utils            # Formatters (Date, Currency, Image URLs)

```

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/flix-movie-app.git
cd flix-movie-app

```

### 2. Install dependencies

```bash
npm install

```

### 3. Configure TMDB API

1. Obtain an **API Read Access Token** from [TMDB Settings](https://www.google.com/search?q=https://www.themoviedb.org/settings/api).
2. Navigate to `src/api/axiosInstance.ts` and paste your token.

### 4. Run the app

```bash
npx expo start

```

## 📦 Building for Production (APK)

This project is configured for **EAS Build**. To generate an installable Android APK:

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Build: `eas build -p android --profile preview`

