var map = L.map('map', { crs: L.CRS.Simple });

var bounds = [[0,0],[1000,1000]];
var image = L.imageOverlay('fp.png', bounds).addTo(map);

map.fitBounds(bounds);

var heat = L.heatLayer([
    // [100,100,10000],
    // [120,120,3000],
    // [400,400,3000]
], {radius: 25, blur: 20}).addTo(map);

function createPoint(map, heatmap, latlng, value)
{
    var latlngint = latlng;
    latlngint.push(value);
    var marker = L.marker(latlng).addTo(map);
    
    heatmap.addLatLng(latlng);
    return marker;
}

createPoint(map, heat, [800,800], 6000);