var map = L.map('map', { crs: L.CRS.Simple });

var bounds = [[0,0],[1000,1000]];
var image = L.imageOverlay('fp.png', bounds).addTo(map);
map.fitBounds(bounds);

// Change us to vary the base sizes of the heatmap points.
const defaultHmRadius = 50;
const defaultHmBlur = 40;

var hmRadius = defaultHmRadius;
var hmBlur = defaultHmBlur;

var heat = L.heatLayer([], {radius: hmRadius, blur: hmBlur}).addTo(map);

// We don't want the heatmap to stay the same size as we zoom in and out, we 
// want it to scale with us. This provides a naive implementation of such a 
// function (comment out to see the default functionality).
map.on('zoomend', function(ev) {
    // To avoid multiplying by zero (remove the + 1 and zoom in and out to see 
    // what happens otherwise)
    let multiplier = map.getZoom() + 1;

    // This probably wants to be a little more sophisticated than just a linear
    // scaling.
    hmRadius = defaultHmRadius * multiplier;
    hmBlur = defaultHmBlur * multiplier;

    // Update the heatmap
    heat.setOptions({radius: hmRadius, blur: hmBlur});
});

// Given the requisite coordinates and a value, create a marker and a heatmap
// point
function createPoint(map, heatmap, latlng, value)
{
    var latlngint = latlng;
    latlngint.push(value);
    var marker = L.marker(latlng).addTo(map);
    
    heatmap.addLatLng(latlng);
    return marker;
}

// Supposedly the highest intensity value by default should be 1.0, but that 
// doesn't work for me
createPoint(map, heat, [800,800], 6000);
createPoint(map, heat, [100,100], 10000);
createPoint(map, heat, [120,120], 3000);
createPoint(map, heat, [400,400], 3000);