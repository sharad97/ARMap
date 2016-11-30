"use strict";
var width = 960,
    height = 1000;


var formatNumber = d3.format(",d");

var path = d3.geo.path()
    .projection(null);

var color = d3.scale.threshold()
    .domain([1, 10, 50, 100, 500, 1000, 2000, 5000])
    .range(["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"]);

var color1 = d3.scale.threshold()
    .domain([1, 10, 50, 100, 500, 1000, 2000, 5000])
    .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"]);

// A position encoding for the key only.
var x = d3.scale.linear()
    .domain([0, 5100])
    .range([0, 480]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(13)
    .tickValues(color.domain())
    .tickFormat(function (d) { return d >= 100 ? formatNumber(d) : null; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(440,40)");

var legend = g.selectAll("rect")
    .data(color.range().map(function (d, i) {
        return {
            x0: i ? x(color.domain()[i - 1]) : x.range()[0],
            x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
            z: d
        };
    }))
    .enter().append("rect")
    .attr("height", 8)
    .attr("x", function (d) { return d.x0; })
    .attr("width", function (d) { return d.x1 - d.x0; })
    .style("fill", function (d) { return d.z; });
    
g.call(xAxis).append("text")
    .attr("class", "caption")
    .attr("y", -9)
    .text("Population per square mile");

d3.json("ar.json", function (error, ar) {
    
    var tracts = topojson.feature(ar, ar.objects.tracts);

  // Clip tracts to land.
    svg.append("defs").append("clipPath")
        .attr("id", "clip-land")
        .append("path")
        .datum(topojson.feature(ar, ar.objects.counties))
        .attr("d", path);
        
  // Group tracts by color for faster rendering.
    svg.append("g")
            .attr("class", "tract")
            .attr("clip-path", "url(#clip-land)")
            .selectAll("path")
            .data(d3.nest()
                    .key(function(d) { return color(d.properties.population / d.properties.area * 2.58999e6); })
				  	.entries(ar.objects.tracts.geometries))
    				.enter().append("path")
      				.style("fill", function(d) { return d.key; })
      				.attr("d", function(d) { return path(topojson.merge(ar, d.values)); });
       	 
        // Draw county borders.
    svg.append("path")
            .datum(topojson.mesh(ar, ar.objects.counties, function (a, b) { return a !== b; }))
            .attr("class", "county-border")
            .attr("d", path);
	
	d3.select("#button2").on("click", function () {  
	svg.append("path")
      .attr("class", "tract-border")
      .datum(topojson.mesh(ar, ar.objects.tracts, function(a, b) { return a !== b; }))
      .attr("d", path);

	d3.select("#button3").on("click", function () {
            d3.select(".tract-border").remove();
        });
     });
    
    d3.select("#button").on("click", function () {
        svg.append("path")
                .datum(topojson.mesh(ar, ar.objects.counties, function (a, b) { return a == b; }))
                .attr("class", "state-border")
                .attr("d", path);
        
        d3.select("#button1").on("click", function () {
            d3.select(".state-border").remove();
        });
    });
            
});

d3.select(self.frameElement).style("height", height + "px");

function updateData1() {

    var g = svg.append("g")
            .attr("class", "key")
            .attr("transform", "translate(440,40)");

    var legend = g.selectAll("rect")
            .data(color1.range().map(function (d, i) {
                return {
                    x0: i ? x(color1.domain()[i - 1]) : x.range()[0],
                    x1: i < color1.domain().length ? x(color1.domain()[i]) : x.range()[1],
                    z: d
                };
            }))
            .enter().append("rect")
            .attr("height", 8)
            .attr("x", function (d) { return d.x0; })
            .attr("width", function (d) { return d.x1 - d.x0; })
            .style("fill", function (d) { return d.z; });
	
	g.call(xAxis).append("text")
    .attr("class", "caption")
    .attr("y", -9)
    .text("Population per square mile");
    
    d3.json("ar.json", function (error, ar) {
    
        var tracts = topojson.feature(ar, ar.objects.tracts);
       
  // Group tracts by color for faster rendering.
        svg.append("g")
            .attr("class", "tract")
            .attr("clip-path", "url(#clip-land)")
            .selectAll("path")
            .data(d3.nest()
                .key(function (d) { return color1(d.properties.population / d.properties.area * 2.58999e6); })
                .entries(tracts.features.filter(function (d) { return d.properties.area; })))
            .enter().append("path")
            .style("fill", function (d) { return d.key; })
            .attr("d", function (d) { return path({type: "FeatureCollection", features: d.values}); });
		
		       // Draw county borders.
    svg.append("path")
            .datum(topojson.mesh(ar, ar.objects.counties, function (a, b) { return a !== b; }))
            .attr("class", "county-border")
            .attr("d", path);
		
    });
}

function updateData2() {
    var g = svg.append("g")
            .attr("class", "key")
            .attr("transform", "translate(440,40)");

    var legend = g.selectAll("rect")
            .data(color.range().map(function (d, i) {
                return {
                    x0: i ? x(color.domain()[i - 1]) : x.range()[0],
                    x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
                    z: d
                };
            }))
            .enter().append("rect")
            .attr("height", 8)
            .attr("x", function (d) { return d.x0; })
            .attr("width", function (d) { return d.x1 - d.x0; })
            .style("fill", function (d) { return d.z; });
	
	g.call(xAxis).append("text")
    .attr("class", "caption")
    .attr("y", -9)
    .text("Population per square mile");
    
    d3.json("ar.json", function (error, ar) {
    
        var tracts = topojson.feature(ar, ar.objects.tracts);

  // Group tracts by color for faster rendering.
        svg.append("g")
            .attr("class", "tract")
            .attr("clip-path", "url(#clip-land)")
            .selectAll("path")
            .data(d3.nest()
                .key(function (d) { return color(d.properties.population / d.properties.area * 2.58999e6); })
                .entries(tracts.features.filter(function (d) { return d.properties.area; })))
            .enter().append("path")
            .style("fill", function (d) { return d.key; })
            .attr("d", function (d) { return path({type: "FeatureCollection", features: d.values}); });
		       // Draw county borders.
    svg.append("path")
            .datum(topojson.mesh(ar, ar.objects.counties, function (a, b) { return a !== b; }))
            .attr("class", "county-border")
            .attr("d", path);

});
}
