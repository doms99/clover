export type GenreApi = {
  id: number,
  name: string,
  picture: string,
  picture_small: string,
  picture_medium: string,
  picture_big: string,
  picture_xl: string
}

export type AlbumApi = {
  id: number,
  title: string,
  cover: string,
  cover_small: string,
  cover_medium: string,
  cover_big: string,
  cover_xl: string,
}

export type ArtistApi = {
  id: number,
  name: string,
  link: string,
  picture: string,
  picture_small: string,
  picture_medium: string,
  picture_big: string,
  picture_xl: string,
  radio: boolean
}

export type TrackApi = {
  id: number,
  title: string,
  title_short: string,
  title_version: string,
  link: string,
  duration: number,
  rank: number,
  explicit_lyrics: boolean,
  preview: string,
  position: number,
  artist: ArtistApi,
  album: AlbumApi
}