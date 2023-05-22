import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const CoreApi = createApi({
  reducerPath: 'CoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({ query: () => '/genres' }),
    getTracksByGenre: builder.query({query: (genre) => `/genres/${genre}/tracks`}),
    getTracks: builder.query({ query: (page) => `/tracks?page=${page || 1}` }),
    getChart: builder.query({ query: () => '/tracks/chart/3' }),
    getArtists: builder.query({query: () => '/artists'}),
    getArtistsTop: builder.query({query: (limit) => `/artists/top/${limit}`}),
    getTrack: builder.query({query: (songid) => `/tracks/${songid}`}),
    getRelated: builder.query({query: (songid) => `/tracks/related/${songid}`}),
    getArtist: builder.query({query: (id) => `/artists/${id}`}),
    getTracksByArtist: builder.query({query: (id) => `/artists/${id}/tracks`}),
    getTracksBySearch: builder.query({query: (searchTerm) => `/search/?term=${searchTerm}`}),

    /*search: builder.query({
      query: (query) => ({
        url: '/search',
        method: 'POST',
        body: {
          query
        }
      }),
    })*/
  }),
});

export const {
  useGetGenresQuery,
  useGetTracksByGenreQuery,
  useGetTracksQuery,
  useGetChartQuery,
  useGetArtistsTopQuery,
  useGetTrackQuery,
  useGetRelatedQuery,
  useGetArtistQuery,
  useGetTracksByArtistQuery,
  //useSearchQuery,
  useGetTracksBySearchQuery,
} = CoreApi;
