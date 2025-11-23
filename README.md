# SkyTune - Music Streaming App

A music streaming application built with **React Native**, **Expo**, **Redux Toolkit**, and **React Navigation**.

## Features

### Authentication
- **Login & Register** screens with full validation
- Email and password validation
- Persistent authentication using Redux Persist
- Dummy API integration for demo purposes

### Music Streaming
- Browse music library with beautiful cards
- Search functionality for songs and artists
- View detailed music information
- Music categorization (Trending, New, Popular)
- Pull-to-refresh for latest content
- API integration with DummyJSON

### Favourites Management
- Add/remove songs to favourites
- Persistent storage of favourite songs
- Quick access to favourite music
- Clear all favourites option

### User Profile
- View user information
- **Dark/Light Mode Toggle** 
- View favourite count and stats
- Logout functionality

### Theme System
- **Sky Blue** primary color (#4DBFFF)
- Complete Light Mode (White + Sky Blue)
- Complete Dark Mode (Black + Sky Blue)
- Smooth theme transitions
- Persistent theme preference

## Tech Stack

- **Framework:** React Native + Expo
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **State Management:** Redux Toolkit
- **Persistence:** Redux Persist + AsyncStorage
- **API:** DummyJSON (Mock Music API)
- **Icons:** Expo Vector Icons (Ionicons)
- **UI/UX:** Custom themed components

## Project Structure

```
SkyTune-Music-Streaming-App/
├── src/
│   ├── api/
│   │   ├── authApi.js          # Authentication API
│   │   └── musicApi.js         # Music data API
│   ├── components/
│   │   ├── FavouriteButton.js  # Add to favourites button
│   │   ├── HeaderBar.js        # Custom header component
│   │   ├── LoadingSpinner.js   # Loading indicator
│   │   ├── MusicCard.js        # Music display card
│   │   ├── PlayButton.js       # Play music button
│   │   ├── SearchBar.js        # Search input
│   │   └── ThemeToggleSwitch.js # Dark mode toggle
│   ├── navigation/
│   │   ├── AppNavigator.js     # Main navigation
│   │   ├── AuthNavigator.js    # Auth stack
│   │   └── BottomTabNavigator.js # Bottom tabs
│   ├── redux/
│   │   ├── authSlice.js        # Auth state
│   │   ├── favouriteSlice.js   # Favourites state
│   │   ├── musicSlice.js       # Music data state
│   │   ├── themeSlice.js       # Theme state
│   │   └── store.js            # Redux store config
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Favourites/
│   │   │   └── FavouritesScreen.js
│   │   ├── Home/
│   │   │   ├── HomeScreen.js
│   │   │   └── MusicDetailsScreen.js
│   │   └── Profile/
│   │       └── ProfileScreen.js
│   ├── theme/
│   │   └── colors.js           # Theme colors & tokens
│   └── utils/
│       └── validators.js       # Input validation
├── App.js                      # Main app entry
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── babel.config.js             # Babel config
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Clone the repository**
```bash
cd d:\Projects\SkyTune\SkyTune-Music-Streaming-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on your device**
- Download **Expo Go** app on your phone
- Scan the QR code from the terminal
- Or press `a` for Android emulator / `i` for iOS simulator

## App Flow

1. **Launch App** → Login/Register Screen
2. **Login** → Validate credentials → Home Screen
3. **Browse Music** → Search & filter songs
4. **View Details** → See full song information
5. **Add to Favourites** → Saved persistently
6. **Favourites Tab** → View all favourite songs
7. **Profile Tab** → Toggle dark mode, view stats, logout

## Color Palette

### Light Mode
- Primary: `#4DBFFF` (Sky Blue)
- Background: `#FFFFFF` (White)
- Text: `#1E1E1E` (Dark)
- Cards: Sky blue borders

### Dark Mode
- Primary: `#4DBFFF` (Sky Blue)
- Background: `#000000` (Black)
- Text: `#FFFFFF` (White)
- Cards: Sky blue outlines

## Key Features Breakdown

### Authentication (Login & Register)
- Email validation
- Password validation (min 6 characters)
- Error handling
- Persistent login state

### Navigation
- Stack Navigator for auth flow
- Bottom Tab Navigator for main app
- Smooth transitions

### API Integration
- DummyJSON products API
- Transformed to music data
- Error handling
- Loading states

### State Management
- Redux Toolkit slices
- Redux Persist for data persistence
- Async storage integration

### UI/UX
- Sky blue theme throughout
- Responsive design
- Touch feedback
- Loading indicators
- Empty states

### Bonus: Dark Mode
- Complete dark theme
- Sky blue accents
- Persistent theme preference
- Toggle switch in profile

## Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web browser
```

## Dependencies

```json
{
  "expo": "~49.0.0",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/stack": "^6.3.17",
  "@react-navigation/bottom-tabs": "^6.5.8",
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.1.2",
  "redux-persist": "^6.0.0",
  "@react-native-async-storage/async-storage": "1.18.2",
  "axios": "^1.4.0"
}
```

## Usage Tips

1. **Login Credentials**
   - Email: Any valid email format
   - Password: Any password (min 6 chars)
   - The app uses mock authentication

2. **Dark Mode**
   - Go to Profile tab
   - Toggle the Dark Mode switch
   - Theme persists across app restarts

3. **Adding Favourites**
   - Tap the heart icon on any music card
   - Or use the "Add to Favourites" button in details

4. **Search Music**
   - Use the search bar on Home screen
   - Search by song name or artist

---

**Enjoy streaming with SkyTune!**
