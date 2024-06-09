// types.ts
export type RootStackParamList = {
  PlanetList: undefined;
  PlanetDetail: {
    planet: {
      name: string;
      diameter: string;
      climate: string;
      terrain: string;
    };
  };
};
