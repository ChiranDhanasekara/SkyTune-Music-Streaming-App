// 🎵 Music API Service

import axios from 'axios';

// Using Deezer API - Real Music Data, No Auth Required!
const MUSIC_BASE_URL = 'https://api.deezer.com';

// Transform Deezer data into SkyTune format
const transformToMusicData = (tracks) => {
  const categories = ['Trending', 'New', 'Popular'];
  
  return tracks.map((track, index) => ({
    id: track.id,
    title: track.title || track.title_short || 'Unknown Title',
    artist: track.artist?.name || 'Unknown Artist',
    album: track.album?.title || 'Unknown Album',
    coverImage: track.album?.cover_big || track.album?.cover_medium || track.album?.cover_xl || 'https://via.placeholder.com/400',
    description: `${track.title} by ${track.artist?.name || 'Unknown Artist'} from the album ${track.album?.title || 'Unknown'}. ${track.rank ? 'Popular track with high ranking!' : 'Great music to enjoy!'}`,
    rating: track.rank ? Math.min(5, Math.max(3.5, (track.rank / 200000))) : 4.5,
    status: categories[index % 3],
    duration: track.duration ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}` : '3:30',
    releaseYear: track.album?.release_date ? new Date(track.album.release_date).getFullYear() : 2024,
    genre: track.type || 'Music',
    previewUrl: track.preview || null,
  }));
};

export const musicApi = {
  // Fetch all music 
  fetchAllMusic: async () => {
    try {
      const response = await axios.get(`${MUSIC_BASE_URL}/chart/0/tracks`, {
        params: { limit: 50 }
      });
      return {
        success: true,
        data: transformToMusicData(response.data.data || []),
      };
    } catch (error) {
      console.error('Error fetching music:', error);
      return {
        success: false,
        error: 'Failed to fetch music',
        data: [],
      };
    }
  },

};
