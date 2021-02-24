import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const TOKEN = `pk.eyJ1IjoidGltb2ZleXNocGFrIiwiYSI6ImNrYWkzOGNjZDBtZzcyd
280dnJmaXVicTQifQ.bmFbY8FiA6vg-s5GO70GhQ`;

let latitude = 0;
let longitude = 0;

export default function drawMap(coordinates) {
  if (coordinates) {
    latitude = coordinates.lat;
    longitude = coordinates.lng;
  }
  mapboxgl.accessToken = TOKEN;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 8,
  });
  new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
}
