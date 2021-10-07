export const STANDART_SELECT_VALUE = 'none';
export type GraphQlResultType = {
  status?: string;
  species: string;
  gender: string;
  type: string;
};
export type PersonOutputType = {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  id: string;
  location: {
    name: string;
  };
  episode: { name: string }[];
};
