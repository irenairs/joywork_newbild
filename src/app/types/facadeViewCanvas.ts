import View from "ol/View";
import Collection from "ol/Collection";
import Map from "ol/Map";
import ImageLayer from "ol/layer/Image";
import VectorLayer from "ol/layer/Vector";
import { Projection } from "ol/proj";
import Static from "ol/source/ImageStatic";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Polygon } from "ol/geom";
import Style from "ol/style/Style";
import Overlay from "ol/Overlay";
import Modify from "ol/interaction/Modify";
import Select from "ol/interaction/Select";
import Draw from "ol/interaction/Draw";
import { Coordinate } from "ol/coordinate";

export type TOlMap = {
  map: Map;
  target: string;
  imageElement: HTMLImageElement;
  imageLayer: ImageLayer<Static>;
  vector: VectorLayer<VectorSource>;
  sourceVector: VectorSource;
  features: Collection<Feature<Polygon>>;
  overlay: Overlay;
  opacity: number;
  color: string;
  modify: TModify;
  select: TSelect;
  hovered: boolean;
  selectFeature: Feature<Polygon>;
  onImageLoad: () => void;
  createMap: (imageElement: HTMLImageElement, target: string) => void;
  createImageLayer: (imageElement: HTMLImageElement) => ImageLayer<Static>;
  createImageStatic: (imageElement: HTMLImageElement) => Static;
  createView: (
    imageElement: HTMLImageElement,
    targetElement: HTMLElement
  ) => View;
  createProjection: (imageElement: HTMLImageElement) => Projection;
  createVector: () => VectorLayer<VectorSource>;
  createSourceVector: () => VectorSource;
  createStyle: () => Style;
  createOverlay: (container: HTMLElement) => Overlay;
  addInteractionsToMap: (map: Map, vector: VectorLayer<VectorSource>) => void;
  addEvents: () => void;
  hexToRgba: (color: string, opacity?: number) => string;
  removeStyleFromFeatures: (currentFeature?: Feature) => void;
  resize: () => void;
  setColor: (color: string, opacity?: number) => void;
};

export type TModify = {
  interaction: Modify;
  setActive: (active: boolean) => void;
};

export type TSelect = {
  interaction: Select;
  setEvents: () => void;
  setActive: (active: boolean) => void;
  clear: () => void;
};

export type TDraw = {
  interaction: Draw;
  setActive: (active: boolean) => void;
  coordToString: (coordXY: Coordinate) => string;
  isOnePoint: (coords: Coordinate[]) => boolean;
  getFeature: () => Feature;
};

export type Area = {
  id: string;
  points: Coordinate[];
  section?: string;
  floor?: string;
};

export interface MyFeature<T extends Polygon> extends Feature<T> {
  floor: string;
  section: string;
}
