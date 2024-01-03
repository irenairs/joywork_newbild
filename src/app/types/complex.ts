export type TTypeGrid = Record<string, string>;

export type TStatus = Record<string, string>;

export type TTypeObject = Record<string, string>;

export type TCountry = Record<string, string>;

export type TSubject = Record<string, string>;

export type TMetro = Record<string, string>;

export type TTypeToMetro = Record<string, string>;

export type TVideo = Record<string, string>;

export type TUniqueOffer = {
  title: string;
  description: string;
};

export type TComplex = {
  _id?: string;
  idDomClick: string;
  type: TTypeObject;
  country: TCountry;
  region: string;
  adress: string;
  metro: TMetro;
  timeToMetro: {
    time: number;
    typeToMetro: TTypeToMetro;
  };
  title: string;
  mainDescription: {
    title: string;
    text: string;
  };
  secondaryDescription?: {
    title: string;
    text: string;
  };
  video?: string;
  typeVideo?: TVideo;
  uniqueOffer?: TUniqueOffer[] | string[];
  image: string;
  stocks?: string;
  queue?: string;
};

export type TComplexNew = {
  _id?: string;
  type: string;
  idDomClick: string;
  country: string;
  region: string;
  address: string;
  metro: string;
  title: string;
  uniqueOffer: TUniqueOffer[];
};
