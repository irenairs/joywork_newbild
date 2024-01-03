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
import { defaults as DefaultInteractions } from "ol/interaction/defaults";
import { shiftKeyOnly, singleClick } from "ol/events/condition";
import OlSelect from "ol/interaction/Select";
import OlDraw, { DrawEvent } from "ol/interaction/Draw";
import { Coordinate, toStringXY } from "ol/coordinate";
import OlSnap from "ol/interaction/Snap";
import { Polygon } from "ol/geom";
import Feature, { FeatureLike } from "ol/Feature";
import { Pixel } from "ol/pixel";
import {
  Facades,
  TDraw,
  TModify,
  TOlMap,
  TSelect,
} from "@/app/types/facadeCanvas";
import { ref } from "vue";
import { Area } from "@/app/types/facades";

export default function createCanvas(
  imageUrl: string,
  color: string,
  opacity: number
) {
  const olMap = ref<TOlMap>();
  const floorPoints = ref<Area[]>([]);

  const start = (modalEl: HTMLElement) => {
    olMap.value = new OlMap(imageUrl, "map", function () {
      onMapLoad();
    });
    setMapHeight(modalEl);
  };

  const setMapHeight = function (modalEl: HTMLElement) {
    const map: HTMLElement = document.querySelector("#map");
    const modalDialog: HTMLElement = modalEl.querySelector(".modal-dialog");

    const scrollTop: number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const marginY =
      parseInt(modalDialog.style.marginTop) +
      parseInt(modalDialog.style.marginBottom);

    map.style.height =
      window.innerHeight -
      (map.getBoundingClientRect().top - scrollTop) -
      marginY +
      "px";
  };

  const colorInit = () => {
    olMap.value.setColor(color, opacity);
  };

  function OlMap(this: TOlMap, imageUrl: string, target: string, onMapLoad) {
    this.target = target;
    this.imageElement = new Image();

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

    const targetElement = document.getElementById(target);
    const view = this.createView(imageElement);

    this.vector = this.createVector();
    this.overlay = this.createOverlay(document.getElementById("popup"));

    const paneNode = document.createElement("div");
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

    const zoomNode = document.createElement("div");
    zoomNode.className = "ol-map__zoom";

    const zoomSlider = new ZoomSlider({
      className: "ol-map__zoom-slider",
    });

    targetElement.prepend(zoomNode);

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
    this.modify = new Modify(map);
    this.modify.setActive(true);

    this.select = new Select(map);
    this.select.setActive(true);

    this.draw = new Draw(map, vector);
    this.draw.setActive(true);

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
    style.getFill().setColor(this.hexToRgba(this.color, this.opacity));
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
    this.map.on("click", function () {
      //клик в области карты
    });

    this.map.on("pointermove", function (this: Map, event) {
      const opacity = Number((olMap.value.opacity / 100 + 0.2).toFixed(1));

      const hoverStyle = new Style({
        fill: new Fill({
          color: olMap.value.hexToRgba(olMap.value.color, opacity),
        }),
        stroke: new Stroke({
          color: olMap.value.hexToRgba(olMap.value.color),
          width: 2,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: olMap.value.hexToRgba(olMap.value.color),
          }),
        }),
      });

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
        console.log(olMap.value.color);
        olMap.value.hovered = true;
        currentFeature.setStyle(hoverStyle);
        olMap.value.removeStyleFromFeatures(currentFeature);
      } else if (olMap.value.hovered) {
        olMap.value.hovered = false;
        olMap.value.removeStyleFromFeatures();
      }
    });
  };

  OlMap.prototype.removeStyleFromFeatures = function (
    this: TOlMap,
    currentFeature: Feature<Polygon>
  ) {
    this.sourceVector.getFeatures().forEach((feature: Feature<Polygon>) => {
      if (currentFeature) {
        if (feature.getId() !== currentFeature.getId()) {
          feature.setStyle(null);
        }
      } else {
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
        color: "rgba(255, 255, 255, 0.2)",
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
      autoPan: {
        animation: {
          duration: 0,
        },
      },
    });
  };

  /* Interactions */

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
    const selectedFeatures: Collection<Feature<Polygon>> =
      this.interaction.getFeatures() as Collection<Feature<Polygon>>;

    selectedFeatures.forEach(() =>
      selectedFeatures.remove(this.interaction.getFeatures()[0])
    );
  };

  /**
   * type TDraw
   */

  function Draw(this: TDraw, map: Map, vector: VectorLayer<VectorSource>) {
    this.interaction = new OlDraw({
      source: vector.getSource(),
      type: /** @type {ol.geom.GeometryType} */ "Polygon",
      freehand: false,
      condition: function (event) {
        console.log("draw condition");
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

  Draw.prototype.isEmpty = function () {
    if (!this.getFeature()) {
      return true;
    }

    const coords = this.getFeature().getGeometry().getCoordinates()[0];

    if (coords.length == 0 || this.isOnePoint(coords)) {
      return true;
    }

    return false;
  };

  Draw.prototype.getFeature = function (this: TDraw): Feature<Polygon> {
    return this.sketchFeature_;
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

  function onMapLoad() {
    initFeatures();

    addMapEvents();

    colorInit();
  }

  function initFeatures() {
    const facades: Area[] = localStorage.getItem("areas")
      ? JSON.parse(localStorage.getItem("areas"))
      : [];
    facades.forEach(function (item) {
      const feature = new Feature({
        geometry: new Polygon([item.points]),
      });

      feature.setId(item.id);
      feature.set("section", item.section);
      feature.set("floor", item.floor);

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

        rightClickHandler(event);
      });

    olMap.value.draw.interaction.on("change", function () {
      console.log("change");
    });

    olMap.value.draw.interaction.on("drawstart", function (event) {
      console.log("drawstart");
      olMap.value.draw.sketchFeature_ = event.target.sketchFeature_;
    });

    olMap.value.draw.interaction.on("drawend", function (event) {
      console.log("drawend");
      olMap.value.draw.sketchFeature_ = event.target.sketchFeature_;
      const id: string = Math.random().toString(16).slice(2);
      event.feature.setId(id);

      const feature: Feature<Polygon> = event.feature as Feature<Polygon>;
      addFacade(feature);
    });

    olMap.value.modify.interaction.on("modifyend", function (event) {
      console.log("modifyend");

      const calls = [];
      event.features.forEach(function (feature: Feature<Polygon>) {
        calls.push(editFacade(feature));
      });
    });

    olMap.value.map.on("dblclick", function (e) {
      console.log("doubled");

      if (olMap.value.draw.interaction.getPointerCount()) {
        olMap.value.draw.interaction.removeLastPoint();
        olMap.value.draw.interaction.removeLastPoint();
      }

      showOverlayAtPixel(olMap.value.map.getEventPixel(e.originalEvent));
    });
  }

  function rightClickHandler(event: MouseEvent) {
    console.log(olMap.value.draw.isEmpty());
    if (!olMap.value.draw.isEmpty()) {
      olMap.value.draw.interaction.removeLastPoint();
      return;
    }

    if (!olMap.value.draw.isEmpty()) {
      return;
    }

    showOverlayAtPixel(olMap.value.map.getEventPixel(event));
  }

  function showOverlayAtPixel(pixel: Pixel) {
    const feature: Feature<Polygon> = getFeatureAtPixel(pixel);

    if (!feature) {
      return;
    }

    showOverLay(feature);
  }

  function getFeatureAtPixel(pixel: Pixel) {
    let polygonFeature: Feature<Polygon>;

    olMap.value.map.forEachFeatureAtPixel(pixel, function (feature) {
      if (
        feature.getGeometry().getType() == "Polygon" &&
        olMap.value.features.getArray().indexOf(feature as Feature<Polygon>) >
          -1
      ) {
        polygonFeature = feature as Feature<Polygon>;
      }
    });

    return polygonFeature;
  }

  function editFacade(feature: Feature<Polygon>) {
    const geom: Polygon = feature.getGeometry();

    floorPoints.value.find(
      (area) => area.id === String(feature.getId())
    ).points = geom.getCoordinates()[0];

    showOverLay(feature);
  }

  function addFacade(feature: Feature<Polygon>) {
    const geom: Polygon = feature.getGeometry();

    const data: Area = {
      id: String(feature.getId()),
      points: geom.getCoordinates()[0],
    };

    floorPoints.value.push(data);

    localStorage.setItem("areas", JSON.stringify(floorPoints.value));

    showOverLay(feature);
  }

  type DataOverlay = {
    floor: string;
    section: string;
  };

  function saveOverlay(data: DataOverlay) {
    const feature = olMap.value.selectFeature;
    const id = feature.getId();
    floorPoints.value.find((area) => area.id === id).floor = data.floor;
    floorPoints.value.find((area) => area.id === id).section = data.section;
    closeOverlay();
  }

  function showOverLay(feature: Feature<Polygon>) {
    olMap.value.select.clear();

    olMap.value.select.interaction.getFeatures().push(feature);
    olMap.value.selectFeature = feature;

    const coordinates: Coordinate[] = feature.getGeometry().getCoordinates()[0];
    let currentCoordinate: Coordinate = coordinates[0];

    coordinates.forEach(function (coord) {
      if (coord[0] > currentCoordinate[0] && coord[1] > currentCoordinate[1]) {
        currentCoordinate = coord;
      }
    });

    olMap.value.overlay.setPosition(currentCoordinate);

    addOverlayEvents(feature);
    const popup: HTMLDivElement = document.querySelector("#popup");
    popup.style.display = "block";
  }

  function addOverlayEvents(feature: Feature<Polygon>) {
    const popup: HTMLDivElement = document.querySelector("#popup");
    popup.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    popup.querySelector("#delete").addEventListener("click", function (event) {
      deleteSelectedFeature(feature);
    });

    popup.querySelector("#popup-closer").addEventListener("click", function () {
      closeOverlay();
    });
  }

  function closeOverlay() {
    olMap.value.overlay.setPosition(undefined);
    const popupClose: HTMLDivElement = document
      .querySelector("#popup")
      .querySelector("#popup-closer");
    popupClose.blur();
    olMap.value.selectFeature = null;
    return false;
  }

  function deleteSelectedFeature(feature: Feature<Polygon>) {
    olMap.value.sourceVector.removeFeature(feature);

    olMap.value.select.clear();

    olMap.value.overlay.setPosition(undefined);

    closeOverlay();
  }

  return {
    start,
    olMap,
    floorPoints,
    saveOverlay,
  };
}
