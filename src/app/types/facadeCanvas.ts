import Collection from "ol/Collection";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import View from "ol/View";
import { Coordinate } from "ol/coordinate";
import { Polygon } from "ol/geom";
import Draw from "ol/interaction/Draw";
import Modify from "ol/interaction/Modify";
import Select from "ol/interaction/Select";
import Snap from "ol/interaction/Snap";
import ImageLayer from "ol/layer/Image";
import VectorLayer from "ol/layer/Vector";
import { Projection } from "ol/proj";
import Static from "ol/source/ImageStatic";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";

export type TDraw = {
  interaction: Draw;
  sketchFeature_: null | Feature<Polygon>;
  setActive: (active: boolean) => void;
  coordToString: (coordXY: Coordinate) => string;
  isOnePoint: (coords: Coordinate[]) => boolean;
  getFeature: () => Feature;
  isEmpty: () => boolean;
};

export type TSelect = {
  interaction: Select;
  setEvents: () => void;
  setActive: (active: boolean) => void;
  clear: () => void;
};

export type TModify = {
  interaction: Modify;
  setActive: (active: boolean) => void;
};

export type Facades = {
  id: string;
  floor_position: string;
  points: Coordinate[];
};

export type TOlMap = {
  map: Map;
  features: Collection<Feature<Polygon>>;
  sourceVector: VectorSource;
  draw: TDraw;
  modify: TModify;
  select: TSelect;
  snap: Snap;
  imageElement: HTMLImageElement;
  imageLayer: ImageLayer<Static>;
  target: string;
  vector: VectorLayer<VectorSource>;
  overlay: Overlay;
  color: string;
  opacity: number;
  hovered: boolean;
  selectFeature: Feature<Polygon>;
  onImageLoad: () => void;
  createMap: (imageElement: HTMLImageElement, target: string) => void;
  addInteractionsToMap: (map: Map, vector: VectorLayer<VectorSource>) => void;
  setColor: (color: string, opacity: number) => void;
  hexToRgba: (hex: string, opacity?: number) => string;
  addEvents: () => void;
  removeStyleFromFeatures: (currentFeature?: Feature) => void;
  createVector: () => VectorLayer<VectorSource>;
  createSourceVector: () => VectorSource;
  createStyle: () => Style;
  createView: (
    imageElement: HTMLImageElement | HTMLElement,
    target?: HTMLElement
  ) => View;
  createProjection: (
    imageElement: HTMLImageElement | HTMLElement,
    target?: HTMLElement
  ) => Projection;
  createImageLayer: (
    imageElement: HTMLImageElement,
    view?: View
  ) => ImageLayer<Static>;
  createImageStatic: (imageElement: HTMLImageElement, view?: View) => Static;
  createOverlay: (container: HTMLElement) => Overlay;
};
