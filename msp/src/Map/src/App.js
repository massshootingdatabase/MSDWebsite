import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnZ3MzMiIsImEiOiJja3UwZnZtM2gxMDZqMnZvcXU5NHViamloIn0.KlO5rSrT27Ldm_KN6Gvobg';
 
export default class App extends React.PureComponent {
constructor(props) {
super(props);
this.state = {

lng: -72.1773,
lat: 40.9015 ,
zoom: 5.43
};
this.mapContainer = React.createRef();
}
componentDidMount() {
const { lng, lat, zoom } = this.state;
const map = new mapboxgl.Map({
container: this.mapContainer.current,
style: 'mapbox://styles/higgs32/ckura4ful05up14o2l242fpoh',
center: [lng, lat],
zoom: zoom
});
 
map.on('move', () => {
this.setState({
lng: map.getCenter().lng.toFixed(4),
lat: map.getCenter().lat.toFixed(4),
zoom: map.getZoom().toFixed(2)
});
});
}
render() {
const { lng, lat, zoom } = this.state;
return (
<div>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={this.mapContainer} className="map-container" />
</div>
);
}
}

