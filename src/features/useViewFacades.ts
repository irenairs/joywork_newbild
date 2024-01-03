import Map from "ol/Map";
import View from "ol/View";
import ImageLayer from "ol/layer/Image";
import Projection from "ol/proj/Projection";
import { defaults as InteractionDefault } from "ol/interaction/defaults";
import { defaults as ControlDefault } from "ol/control/defaults";
import Static from "ol/source/ImageStatic";
import { getCenter } from "ol/extent";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Collection from "ol/Collection";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Circle from "ol/style/Circle";
import Overlay from "ol/Overlay";
import OlSelect from "ol/interaction/Select";
import OlModify from "ol/interaction/Modify";
import Feature from "ol/Feature";
import { Polygon } from "ol/geom";
import {
  Area,
  MyFeature,
  TModify,
  TOlMap,
  TSelect,
} from "@/app/types/facadeViewCanvas";
import { ref } from "vue";
import { Coordinate } from "ol/coordinate";

export type Facade = {
  id: string;
  image: string;
  polygons: Area[];
};

export default function useViewFacades(facades: Facade[]) {
  const mapObj = ref<TOlMap>();
  const activeFacade = ref<number>(0);
  const currentFacade = ref<Facade>(facades[activeFacade.value]);
  const optionsFloor = ref({
    floor: "",
    section: "",
  });
  const existingOverlays = ref<Overlay>();

  function start() {
    mapObj.value = new OlMap(currentFacade.value.image, "map", function (
      olMap: Map
    ) {
      onMapLoad(olMap);
    });
    window.addEventListener("resize", () => {
      if (mapObj.value) {
        mapObj.value.resize();
      }
    });
  }

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
    const view = this.createView(imageElement, targetElement);

    this.vector = this.createVector();

    this.map = new Map({
      layers: [this.imageLayer, this.vector],
      overlays: [],
      controls: ControlDefault({
        zoom: false,
        rotate: false,
      }),
      target: "map",
      view: view,
      pixelRatio: 1,
      interactions: InteractionDefault({
        mouseWheelZoom: false,
        dragPan: false,
      }),
    });

    this.addInteractionsToMap(this.map, this.vector);
    this.addEvents();

    const containerHeight = targetElement.clientHeight;
    const imageWidth = imageElement.width;
    const imageHeight = imageElement.height;
    const mapWidth = (containerHeight / imageHeight) * imageWidth;
    this.map.setSize([mapWidth, containerHeight]);
    if (existingOverlays.value) {
      mapObj.value.map.addOverlay(existingOverlays.value);
      this.overlay = existingOverlays.value;
    } else {
      this.overlay = this.createOverlay(document.getElementById("popup"));
      mapObj.value.map.addOverlay(this.overlay);
    }
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
  OlMap.prototype.createView = function (
    this: TOlMap,
    imageElement: HTMLImageElement,
    targetElement: HTMLElement
  ) {
    const projection = this.createProjection(imageElement);
    const containerHeight = document.getElementById("map").clientHeight;
    const imageResolution = imageElement.naturalHeight / containerHeight;

    return new View({
      resolution: imageResolution,
      projection: projection,
      center: getCenter([0, 0, imageElement.width, imageElement.height]),
      zoom: 0,
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

  OlMap.prototype.addInteractionsToMap = function (
    this: TOlMap,
    map: Map,
    vector: VectorLayer<VectorSource>
  ) {
    this.modify = new Modify(map);
    this.modify.setActive(true);
  };

  OlMap.prototype.addEvents = function (this: TOlMap) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const mapObj: TOlMap = this;
    this.map.on("click", function (event) {
      let currentFeature: MyFeature<Polygon>;
      this.forEachFeatureAtPixel(
        event.pixel,
        function (feature: MyFeature<Polygon>) {
          if (feature.getGeometry().getType() == "Polygon") {
            currentFeature = feature;
          }
        }
      );
      if (currentFeature) {
        optionsFloor.value = {
          floor: currentFeature.get("floor"),
          section: currentFeature.get("section"),
        };
      }
    });

    this.map.on("pointermove", function (this: Map, event) {
      let currentFeature: MyFeature<Polygon>;
      this.forEachFeatureAtPixel(
        event.pixel,
        function (feature: MyFeature<Polygon>) {
          if (feature.getGeometry().getType() == "Polygon") {
            currentFeature = feature;
          }
        }
      );

      if (
        currentFeature &&
        mapObj.features.getArray().indexOf(currentFeature) > -1
      ) {
        optionsFloor.value = {
          floor: currentFeature.get("floor"),
          section: currentFeature.get("section"),
        };
        mapObj.hovered = true;
        showOverLay(currentFeature);
      } else if (mapObj.hovered) {
        mapObj.hovered = false;
        closeOverlay();
      }
    });
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

  OlMap.prototype.removeStyleFromFeatures = function (
    this: TOlMap,
    currentFeature: Feature<Polygon>
  ) {
    this.sourceVector.getFeatures().forEach(function (feature) {
      console.log(feature);
      console.log(currentFeature);
      if (feature !== currentFeature) {
        feature.setStyle(null);
      }
    });
  };

  OlMap.prototype.resize = function (this: TOlMap) {
    if (this.map) {
      console.log(this.map);
      const image = this.imageElement;
      const containerHeight = document.getElementById("map").clientHeight;
      const imageResolution = image.naturalHeight / containerHeight;
      this.map.getView().setResolution(imageResolution);
    }
  };

  OlMap.prototype.setColor = function (
    this: TOlMap,
    color: string,
    opacity?: number
  ) {
    this.color = color;
    this.opacity = opacity || 20;

    const style = this.vector.getStyle() as Style;
    style.getFill().setColor(this.hexToRgba(this.color, this.opacity / 100));
  };

  /* Interactions */

  function Modify(this: TModify, map: Map) {
    this.interaction = new OlModify({
      features: mapObj.value ? mapObj.value.features : new Collection(),
      // deleteCondition: function (event) {
      //   return shiftKeyOnly(event) && singleClick(event);
      // },
    });

    //   map.addInteraction(this.interaction);
  }

  Modify.prototype.setActive = function (this: TModify, active: boolean) {
    //   this.interaction.setActive(active);
  };

  function Select(this: TSelect, map: Map) {
    this.interaction = new OlSelect();
    map.addInteraction(this.interaction);
  }

  Select.prototype.setActive = function (this: TSelect, active: boolean) {
    this.interaction.setActive(active);
  };

  Select.prototype.clear = function (this: TSelect) {
    const selectedFeatures = this.interaction.getFeatures();

    // selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
  };

  function onMapLoad(mapObj: Map) {
    initFeatures();

    addMapEvents();

    colorInit();
  }

  function initFeatures() {
    const facades: Area[] = currentFacade.value.polygons;
    facades.forEach(function (item) {
      const polygon = new Polygon([item.points]);
      const feature = new Feature({
        geometry: polygon,
      });

      console.log(polygon);
      feature.setStyle(
        new Style({
          fill: new Fill({
            color: mapObj.value.hexToRgba("#4CAF50", 0.5),
          }),
        })
      );
      console.log(item);
      feature.setId(item.id);
      feature.set("section", item.section);
      feature.set("floor", item.floor);

      try {
        mapObj.value.sourceVector.addFeature(feature);
        console.log(mapObj.value.sourceVector.getFeatures());
      } catch (e) {
        location.reload();
      }
    });
  }

  function addMapEvents() {
    if (!mapObj.value) return;
    mapObj.value.map
      .getViewport()
      .addEventListener("mousemove", function (event) {
        event.preventDefault();

        // rightClickHandler(event);
      });
    mapObj.value.map.getViewport().addEventListener("click", function (event) {
      event.preventDefault();

      // rightClickHandler(event);
    });
  }

  function showOverLay(feature: MyFeature<Polygon>) {
    // mapObj.value.select.interaction.getFeatures().push(feature);
    // mapObj.value.selectFeature = feature;

    const coordinates: Coordinate[] = feature.getGeometry().getCoordinates()[0];
    let currentCoordinate: Coordinate = coordinates[0];

    coordinates.forEach(function (coord) {
      if (coord[0] > currentCoordinate[0] && coord[1] > currentCoordinate[1]) {
        currentCoordinate = coord;
      }
    });
    console.log(mapObj.value.overlay);

    mapObj.value.overlay.setPosition(currentCoordinate);

    const popup: HTMLDivElement = document.querySelector("#popup");
    popup.style.display = "block";
  }

  function closeOverlay() {
    mapObj.value.overlay.setPosition(undefined);
    mapObj.value.selectFeature = null;
    return false;
  }

  const colorInit = () => {
    mapObj.value.setColor("#4caf50", 0.5);
  };

  const changeFacade = (type: string) => {
    if (type === "next") {
      activeFacade.value++;
      if (activeFacade.value === facades.length) activeFacade.value = 0;
      currentFacade.value = facades[activeFacade.value];
    }
    if (type === "prev") {
      if (activeFacade.value === 0) {
        activeFacade.value = facades.length - 1;
      } else {
        activeFacade.value--;
      }
      currentFacade.value = facades[activeFacade.value];
    }

    existingOverlays.value = mapObj.value.map
      .getOverlays()
      .getArray()
      .slice()[0];

    mapObj.value.map.setTarget(null);
    mapObj.value = null;

    start();
  };
  return {
    start,
    optionsFloor,
    changeFacade,
  };
}
