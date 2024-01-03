import { Coordinate } from "ol/coordinate";

export interface IFacade {
  readonly id: string;
  image: string | HTMLImageElement;
  title: string;
  order: number;
  isPublish: boolean;
  floors: FloorWrapper;
}

export type FloorWrapper = {
  countFloors: number;
  items: Floor[];
};

export type Floor = {
  readonly id: string;
  points: Point[];
  numberFloor: number;
  section: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Area = {
  id: string;
  points: Coordinate[];
  section?: string;
  floor?: string;
};
