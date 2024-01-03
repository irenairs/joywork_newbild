import Map from "ol/Map";
import ZoomSlider from "ol/control/ZoomSlider";
import Zoom from "ol/control/Zoom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Collection from "ol/Collection";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Circle from "ol/style/Circle";
import View from "ol/View";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";
import { getCenter } from "ol/extent";
import { Projection } from "ol/proj";
import Overlay from "ol/Overlay";
import OlModify from "ol/interaction/Modify";
import { shiftKeyOnly, singleClick } from "ol/events/condition";
import OlSelect from "ol/interaction/Select";
import OlDraw from "ol/interaction/Draw";
import { Coordinate, toStringXY } from "ol/coordinate";
import OlSnap from "ol/interaction/Snap";
import { Geometry, Point, Polygon } from "ol/geom";
import Feature, { FeatureLike } from "ol/Feature";
import { Pixel } from "ol/pixel";
import { Area, TDraw, TModify, TSelect } from "@/app/types/facadeViewCanvas";
import { ref } from "vue";

type TOlMap = {
  map: Map;
  features: any;
  sourceVector: VectorSource;
  draw: TDraw;
  modify: TModify;
  select: TSelect;
  snap: OlSnap;
  imageElement: HTMLImageElement;
  imageLayer: ImageLayer<Static>;
  target: string;
  vector: VectorLayer<VectorSource>;
  overlay: Overlay;
  color: string;
  opacity: number;
  hovered: boolean;
  zoomSliderWrapper: HTMLElement;
  popupWrapper: HTMLElement;
  isMouseOverMap: boolean;
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
  createView: (imageElement: HTMLImageElement) => View;
  createProjection: (imageElement: HTMLImageElement) => Projection;
  createImageLayer: (imageElement: HTMLImageElement) => ImageLayer<Static>;
  createImageStatic: (imageElement: HTMLImageElement) => Static;
  createOverlay: (container: HTMLElement) => Overlay;
};

export default function useViewFloors(areas: Area[], image: string) {
  const olMap = ref<TOlMap>();
  const openWindowInfo = ref<boolean>(false);
  const windowInfoData = ref({});

  function start(
    map: HTMLElement,
    container: HTMLElement,
    zoomSliderWrapper: HTMLElement,
    popupWrapper: HTMLElement
  ) {
    const imageUrl = image;

    olMap.value = new OlMap(
      imageUrl,
      "map",
      zoomSliderWrapper,
      popupWrapper,
      function (olMap: Map) {
        onMapLoad(olMap);
      }
    );

    setMapHeight(map, container);
  }

  const setMapHeight = function (map: HTMLElement, container: HTMLElement) {
    const scrollTop: number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const marginY =
      parseInt(container.style.marginTop) +
      parseInt(container.style.marginBottom);

    map.style.height =
      window.innerHeight -
      (map.getBoundingClientRect().top - scrollTop) -
      marginY +
      "px";
  };

  function OlMap(
    this: TOlMap,
    imageUrl: string,
    target: string,
    zoomContainer: HTMLElement,
    popupWrapper: HTMLElement,
    onMapLoad
  ) {
    this.target = target;
    this.imageElement = new Image();
    this.zoomSliderWrapper = zoomContainer;
    this.popupWrapper = popupWrapper;

    this.imageElement.onload = () => {
      this.onImageLoad();
      onMapLoad(this);
    };

    this.imageElement.src = imageUrl;
  }

  OlMap.prototype.onImageLoad = function (this: TOlMap) {
    this.createMap(this.imageElement, this.target);
  };

  OlMap.prototype.createMap = function (
    this: TOlMap,
    imageElement: HTMLImageElement,
    target: string
  ) {
    this.imageLayer = this.createImageLayer(imageElement);

    const targetElement: HTMLElement = document.getElementById(target);
    const view: View = this.createView(imageElement);

    this.vector = this.createVector();
    this.overlay = this.createOverlay(this.popupWrapper);

    const paneNode: HTMLElement = document.createElement("div");
    paneNode.className = "ol-map__pane";

    targetElement.appendChild(paneNode);

    this.map = new Map({
      layers: [this.imageLayer, this.vector],
      overlays: [this.overlay],
      controls: [],
      target: paneNode,
      view: view,
      pixelRatio: 1,
    });

    const zoomNode: HTMLElement = document.createElement("div");
    zoomNode.className = "ol-map__zoom";

    const zoomSlider: ZoomSlider = new ZoomSlider({
      className: "ol-map__zoom-slider",
    });

    this.zoomSliderWrapper.prepend(zoomNode);

    zoomSlider.setTarget(zoomNode);
    this.map.addControl(zoomSlider);

    const ctrlButtons = new Zoom({
      target: zoomNode,
      className: "ol-map__zoom-btns",
      zoomInLabel: "+",
      zoomOutLabel: "\u2212",
      delta: 1,
    });

    const zoomLabelNode = document.createElement("div");
    zoomLabelNode.className = "ol-map__zoom-label";
    zoomLabelNode.textContent = "масштаб";

    zoomNode.appendChild(zoomLabelNode);
    this.map.addControl(ctrlButtons);
    this.addInteractionsToMap(this.map, this.vector);
    this.addEvents();
  };

  OlMap.prototype.addInteractionsToMap = function (
    this: TOlMap,
    map: Map,
    vector: VectorLayer<VectorSource>
  ) {
    // this.modify = new Modify(map);
    // this.modify.setActive(true);

    // this.select = new Select(map);
    // this.select.setActive(true);

    // this.draw = new Draw(map, vector);
    // this.draw.setActive(true);

    this.snap = new Snap(map, vector);
  };

  OlMap.prototype.setColor = function (
    this: TOlMap,
    color: string,
    opacity: number
  ) {
    this.color = color;
    this.opacity = opacity || 20;

    const style = this.vector.getStyle() as Style;
    style.getFill().setColor(this.hexToRgba(this.color, this.opacity / 100));
  };

  OlMap.prototype.hexToRgba = function (
    this: TOlMap,
    hex: string,
    opacity: number
  ): string {
    if (!hex) return;
    hex = hex.replace("#", "");

    const color = {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };

    if (opacity) {
      opacity = opacity > 1 ? opacity / 100 : opacity;
      return (
        "rgba(" +
        color.r +
        ", " +
        color.g +
        ", " +
        color.b +
        ", " +
        opacity +
        ")"
      );
    } else {
      return "rgba(" + color.r + ", " + color.g + ", " + color.b + ")";
    }
  };

  /* Events */

  OlMap.prototype.addEvents = function (this: TOlMap) {
    this.map.on("click", function (event) {
      let currentFeature: Feature<Polygon>;
      this.forEachFeatureAtPixel(
        event.pixel,
        function (feature: Feature<Polygon>) {
          if (feature.getGeometry().getType() == "Polygon") {
            currentFeature = feature;
          }
        }
      );
      openWindowInfo.value = true;
      windowInfoData.value = {};
    });

    this.map.getViewport().addEventListener("mouseover", () => {
      this.isMouseOverMap = true;
    });

    this.map.getViewport().addEventListener("mouseout", () => {
      this.isMouseOverMap = false;
    });

    this.map.getViewport().addEventListener("wheel", (event) => {
      if (!this.isMouseOverMap) {
        event.preventDefault();
      }
    });

    this.map.on("pointermove", function (this: Map, event) {
      let currentFeature: Feature<Polygon>;

      this.forEachFeatureAtPixel(
        event.pixel,
        function (feature: Feature<Polygon>) {
          if (feature.getGeometry().getType() == "Polygon") {
            currentFeature = feature;
          }
        }
      );

      if (
        currentFeature &&
        olMap.value.features.getArray().indexOf(currentFeature) > -1
      ) {
        olMap.value.hovered = true;
        showOverLay(currentFeature);
        this.getTargetElement().style.cursor = "pointer";
      } else if (olMap.value.hovered) {
        olMap.value.hovered = false;
        closeOverlay();
        this.getTargetElement().style.cursor = "default";
      }
    });
  };

  OlMap.prototype.removeStyleFromFeatures = function (
    this: TOlMap,
    currentFeature
  ) {
    this.sourceVector.getFeatures().forEach(function (feature) {
      if (feature !== currentFeature) {
        feature.setStyle(null);
      }
    });
  };

  /* Vector, Style */

  OlMap.prototype.createVector = function (
    this: TOlMap
  ): VectorLayer<VectorSource> {
    this.sourceVector = this.createSourceVector();

    const style = this.createStyle();

    return new VectorLayer({
      source: this.sourceVector,
      style: style,
    });
  };

  OlMap.prototype.createSourceVector = function (this: TOlMap): VectorSource {
    this.features = new Collection();

    return new VectorSource({
      features: this.features,
    });
  };

  OlMap.prototype.createStyle = function (this: TOlMap) {
    return new Style({
      fill: new Fill({
        color: "rgba(255, 56, 56, 0.2)",
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 2,
      }),
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: "#ffcc33",
        }),
      }),
    });
  };

  /* View, Layer, Image */

  OlMap.prototype.createView = function (
    this: TOlMap,
    imageElement: HTMLImageElement
  ) {
    const projection = this.createProjection(imageElement);

    return new View({
      projection: projection,
      center: getCenter([0, 0, imageElement.width, imageElement.height]),
      zoom: 2,
      minZoom: 1,
      maxZoom: 6,
    });
  };

  OlMap.prototype.createProjection = function (
    this: TOlMap,
    imageElement: HTMLImageElement
  ) {
    return new Projection({
      code: "olimage",
      units: "pixels",
      extent: [0, 0, imageElement.width, imageElement.height],
    });
  };

  OlMap.prototype.createImageLayer = function (
    this: TOlMap,
    imageElement: HTMLImageElement
  ) {
    const imageStatic = this.createImageStatic(imageElement);

    return new ImageLayer({
      source: imageStatic,
    });
  };
  OlMap.prototype.createImageStatic = function (
    this: TOlMap,
    imageElement: HTMLImageElement
  ) {
    return new Static({
      url: imageElement.src,
      imageExtent: [0, 0, imageElement.width, imageElement.height],
    });
  };

  OlMap.prototype.createOverlay = function (
    this: TOlMap,
    container: HTMLElement
  ): Overlay {
    return new Overlay({
      element: container,
      autoPan: true,
      insertFirst: true,
    });
  };

  /* Interactions */
  type TModify = {
    interaction: OlModify;
    setActive: (active: boolean) => void;
  };

  function Modify(this: TModify, map: Map) {
    this.interaction = new OlModify({
      features: olMap.value ? olMap.value.features : new Collection(),
      deleteCondition: function (event) {
        return shiftKeyOnly(event) && singleClick(event);
      },
    });

    map.addInteraction(this.interaction);
  }

  Modify.prototype.setActive = function (this: TModify, active: boolean) {
    this.interaction.setActive(active);
  };

  type TSelect = {
    interaction: OlSelect;
    setEvents: () => void;
    setActive: (active: boolean) => void;
    clear: () => void;
  };

  function Select(this: TSelect, map: Map) {
    this.interaction = new OlSelect();
    map.addInteraction(this.interaction);
    this.setEvents();
  }

  Select.prototype.setEvents = function (this: TSelect) {
    this.interaction.on(
      "change:active",
      function () {
        this.clear();
      }.bind(this)
    );
  };

  Select.prototype.setActive = function (this: TSelect, active: boolean) {
    this.interaction.setActive(active);
  };

  Select.prototype.clear = function (this: TSelect) {
    const selectedFeatures = this.interaction.getFeatures();

    // selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
  };

  /**
   * type TDraw
   */

  type TDraw = {
    interaction: OlDraw;
    setActive: (active: boolean) => void;
    coordToString: (coordXY: Coordinate) => string;
    isOnePoint: (coords: Coordinate[]) => boolean;
    getFeature: () => Feature;
  };

  function Draw(this: TDraw, map: Map, vector: VectorLayer<VectorSource>) {
    this.interaction = new OlDraw({
      source: vector.getSource(),
      type: /** @type {ol.geom.GeometryType} */ "Polygon",
      freehand: false,
      condition: function (event) {
        // Left Click
        return event.originalEvent.which == 1;
      },
    });

    this.interaction.setActive(false);
    map.addInteraction(this.interaction);
  }

  Draw.prototype.coordToString = function (this: TDraw, coordXY: Coordinate) {
    return toStringXY(coordXY, 3);
  };

  Draw.prototype.isOnePoint = function (
    this: TDraw,
    coords: Coordinate[]
  ): boolean {
    return coords.every(
      function (coordXY: Coordinate) {
        return this.coordToString(coords[0]) == this.coordToString(coordXY);
      }.bind(this)
    );
  };

  Draw.prototype.getFeature = function (this: TDraw) {
    // return this.interaction.sketchFeature_;
  };

  Draw.prototype.getActive = function (this: TDraw) {
    return this.interaction && this.interaction.getActive();
  };

  Draw.prototype.setActive = function (this: TDraw, active: boolean) {
    this.interaction.setActive(active);
  };

  function Snap(map: Map, vector: VectorLayer<VectorSource>) {
    const snap = new OlSnap({
      source: vector.getSource(),
    });

    map.addInteraction(snap);
  }

  const colorInit = () => {
    olMap.value.setColor("#FF3838", 0.2);
  };

  function onMapLoad(olMap: Map) {
    initFeatures();

    addMapEvents();

    colorInit();
  }

  type Facades = {
    id: string;
    floor_position: string;
    points: Coordinate[];
  };

  function initFeatures() {
    areas.forEach(function (item) {
      const feature = new Feature({
        geometry: new Polygon([item.points]),
      });

      feature.setId(item.id);
      feature.setStyle(
        new Style({
          fill: new Fill({
            color: olMap.value.hexToRgba("#4CAF50", 0.5),
          }),
          stroke: new Stroke({
            color: "#FF3838",
            width: 2,
          }),
        })
      );

      try {
        olMap.value.sourceVector.addFeature(feature);
      } catch (e) {
        location.reload();
      }
    });
  }

  function addMapEvents() {
    if (!olMap.value) return;
    olMap.value.map
      .getViewport()
      .addEventListener("contextmenu", function (event) {
        event.preventDefault();

        // rightClickHandler(event);
      });

    // olMap.value.draw.interaction.on("change", function (event) {
    //   console.log(event);
    // });

    // olMap.value.draw.interaction.on("drawstart", function (event) {
    //   console.log(event);
    // });

    // olMap.value.draw.interaction.on("drawend", function (event) {
    //   const feature: Feature<Polygon> = event.feature as Feature<Polygon>;
    //   addFacade(feature);
    // });

    // olMap.value.modify.interaction.on("modifyend", function (event) {
    //   const calls = [];
    // });

    olMap.value.map.on("dblclick", function (e) {
      if (olMap.value.draw.interaction.getPointerCount()) {
        olMap.value.draw.interaction.removeLastPoint();
        olMap.value.draw.interaction.removeLastPoint();
      }

      showOverlayAtPixel(olMap.value.map.getEventPixel(e.originalEvent));
    });
  }

  function rightClickHandler(event) {
    if (olMap.value.draw.interaction.getPointerCount() !== 0) {
      olMap.value.draw.interaction.removeLastPoint();
      return;
    }

    if (olMap.value.draw.interaction.getPointerCount() !== 0) {
      return;
    }

    showOverlayAtPixel(olMap.value.map.getEventPixel(event));
  }

  function showOverlayAtPixel(pixel: Pixel) {
    const feature = getFeatureAtPixel(pixel);

    if (!feature) {
      return;
    }
  }

  function getFeatureAtPixel(pixel: Pixel) {
    let polygonFeature: FeatureLike;

    olMap.value.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
      if (
        feature.getGeometry().getType() == "Polygon" &&
        olMap.value.features.getArray().indexOf(feature as Feature<Geometry>) >
          -1
      ) {
        polygonFeature = feature;
      }
    });

    return polygonFeature;
  }

  function addFacade(feature: Feature<Polygon>) {
    const geom: Polygon = feature.getGeometry();

    const id: string = Math.random().toString(16).slice(2);
    const data = {
      id,
      points: geom.getCoordinates()[0],
    };

    areas.push(data);

    localStorage.setItem("areas", JSON.stringify(areas));

    showOverLay(feature);
  }

  function showOverLay(feature: Feature<Polygon>) {
    // olMap.value.select.clear();

    // olMap.value.select.interaction.getFeatures().push(feature);

    const geo: Polygon = feature.getGeometry();
    const center = getCenter(geo.getExtent());

    olMap.value.overlay.setPosition(center);
    olMap.value.overlay.setPositioning("top-center");

    addOverlayEvents(feature);
  }

  function addOverlayEvents(feature) {
    const popup: HTMLDivElement = document.querySelector("#popup");
    popup.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
  }

  function closeOverlay() {
    olMap.value.overlay.setPosition(undefined);
    return false;
  }

  return {
    openWindowInfo,
    windowInfoData,
    start,
  };
}
