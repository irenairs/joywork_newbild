export interface IView {
  name: string;
  value: string;
  icon: string;
}

export interface IRoom {
  name: string;
  value: string;
}

export interface IFilters {
  rooms: IRoom[];
  price: {
    min: string;
    max: string;
  };
  square: {
    min: string;
    max: string;
  };
  hiddenPrice: boolean;
  onlyFree: boolean;
  view?: IView;
}
