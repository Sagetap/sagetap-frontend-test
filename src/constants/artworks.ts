export type Artwork = {
  id: number;
  disabled: boolean;
  config?: any;
  data?: any;
  info?: any;
  newRating?: string;
  loading?: boolean;
};

export const ARTWORKS_LIST: Artwork[] = [
  { id: 27992, disabled: false },
  { id: 27998, disabled: false },
  { id: 27999, disabled: false },
  { id: 27997, disabled: true },
  { id: 27993, disabled: false },
];