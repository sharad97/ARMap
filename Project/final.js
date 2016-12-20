
//----------------Got this idea from homework------------------------//

//Margin
var margin = {top: 50, right: 20, bottom: 20, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

//Set the projection methods for the world map
var projection = d3.geo.equirectangular()
                   .translate([width / 2, height / 2])
                   .scale((width) / 2.5 / Math.PI)
                   .rotate([180]);

//Set the world map path
var path = d3.geo.path()
    .projection(projection);

//SVG container
var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
		.call(d3.behavior.zoom().scaleExtent([1, 7]).on("zoom", redraw))
		.append("g");

//Zoom
function redraw() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
//--------------------------------------------------------------------//




//--------------------Got this idea from source: ---------------------//
//---------- source link: http://bl.ocks.org/KoGor/5994804 -----------//

//Adding water
svg.append("path")
        .datum({type: "Sphere"})
        .attr("class", "water")
        .attr("d", path);
//--------------------------------------------------------------------//




//----------------Got this idea from homework-------------------------//

var g = svg.append("g");

//Draw legend colored circles
g.append("rect")
        .attr("x", width - 1130)
        .attr("y", height - 170)
        .attr("width", 60)
        .attr("height", 130)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

g.append("circle")
    	.attr("class", "dot")
		.attr('r', 14)
		.attr("cx", width - 1108)
        .attr("cy", height - 150)
		.style("fill", "red");
		
g.append("circle")
		.attr("class", "dot")
		.attr('r', 8.5)
        .attr("cx", width - 1108)
        .attr("cy", height - 100)
        .style("fill", "red");
	
g.append("circle")
		.attr("class", "dot")
		.attr('r', 2.7)
        .attr("cx", width - 1108)
        .attr("cy", height - 60)
        .style("fill", "red");

g.append("text")
        .attr("class", "label")
        .attr("x", width - 1085)
        .attr("y", height - 146.5)
        .style("text-anchor", "end")
        .text("9")
		.style("fill", "brown");

g.append("text")
        .attr("class", "label")
        .attr("x", width - 1085)
        .attr("y", height - 95)
        .style("text-anchor", "end")
        .text("8")
		.style("fill", "brown");

g.append("text")
        .attr("class", "label")
        .attr("x", width - 1085)
        .attr("y", height - 56)
        .style("text-anchor", "end")
        .text("7")
		.style("fill", "brown");
  
g.append("text")
        .attr("class", "label")
        .attr("x", width - 1102)
        .attr("y", height - 15)
        .style("text-anchor", "middle")
        .style("fill", "Green")
        .attr("font-size", "16px")
        .text("Richter Scale");

//Define Tooltip here
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
//--------------------------------------------------------------------//




//--------------------Got this idea from source: ---------------------//
//---------- source link:http://bl.ocks.org/KoGor/5994804 ------------//

//Tectonics json file
d3.json('tectonics.json', function (error, data) {
	if (error)
    throw error;
	g.insert("path")
		.datum(topojson.mesh(data, data.objects.tec))
		.attr("class", "tectonic")
		.attr("d", path);
});

//Country tooltip and list
var countryTooltip = d3.select("body").append("div").attr("class", "countryTooltip");

//Queue
queue()
    .defer(d3.json, "world_110m.json")
    .defer(d3.tsv, "country.tsv")
    .await(ready);

//Main function
function ready(error, world, countryData) {
	
    var countryById = {},
		countries = topojson.object(world, world.objects.countries).geometries;
   
    //Adding countries to select
    countryData.forEach(function (d) {
        countryById[d.id] = d.name;
    });

    //Drawing countries on the globe
    g.selectAll(".country").data(countries)
        .enter()
        .insert("path")
        .attr("class", "country")
        .attr("title", function (d, i) { return d.name; })
        .attr("d", path)
        .text(function (d) {return d.name; })
        .on("mouseover", function (d) {
            countryTooltip.text(countryById[d.id])
                    .style("left", (d3.event.pageX + 7) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("display", "block")
                    .style("opacity", 1);
        })
        .on("mouseout", function (d) {
            countryTooltip.style("opacity", 0)
                    .style("display", "none");
        });

//--------------------------------------------------------------------//





//--------------------Got this idea from source: ---------------------//
//--- source link:http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8 --//
//--- source link:http://benheb.github.io/d3.slider/ -----------------//    

//Earthquake Data	
d3.csv("rest_7771.csv", function(error, data) {
    
data.forEach(function(d) {
    d.id = d.id;
    d.lat = parseFloat(d.latitude);
    d.lng= parseFloat(d.longitude);
    d.city= d.place;
    d.mag= d.mag;
    d.depth= d.depth;
    d.time= moment(d.time, "YYYY-MM-DD'T'HH:mm:ss.SSS'z'").utc().format("YYYY-MM-DD HH:mm:ss");
    d.created_at= moment(d.time, "YYYY-MM-DD'T'HH:mm:ss.SSS'z'").utc().format("YYYY");
    });    
    
      var rScale = d3.scale.sqrt()
                    .domain(d3.extent(data, function (d) { return d.mag; }))
                    .range([3, 15]); 
    
    g.selectAll(".site")
       .data(data)
       .enter()
       .append("circle")
		.attr("class", "site")
       .attr("cx", function(d) {
               return projection([d.lng, d.lat])[0];
       })
       .attr("cy", function(d) {
               return projection([d.lng, d.lat])[1];
       })
        .attr("r", function (d) { return rScale(d.mag); })
                .on("mouseover", function (d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                tooltip.html("<b><center>" + (d.city) + "</center></b>" + "<table>"
                        + "<tr><td align='left'>Magnitude</td><td align='center'>:<td align='right'>" + d.mag + "</td></tr>"
                        + "<tr><td align='left'>Time</td><td align='center'>:<td align='right'>" + (d.time) + "</td></tr>"
                        + "<tr><td align='left'>Depth</td><td align='center'>:<td align='right'>" + (d.depth) + " km" + "</td></tr>" + "</table>")
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
                .on("mouseout", function (d) {
                tooltip.transition()
                           .duration(500)
                           .style("opacity", 0);
            });
    
var displaySites = function (data) {
        var sites = g.selectAll(".site")
                    .data(data, function (d) {
                    return d.id;
                });
        sites.enter()
	            .append("circle")
                .attr("class", "site")
                .attr("cx", function (d) {
                return projection([d.lng, d.lat])[0];
            })
                .attr("cy", function (d) {
                return projection([d.lng, d.lat])[1];
            })
                .attr("r", function (d) { return rScale(d.mag); })
                .on("mouseover", function (d) {
                tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                tooltip.html("<b><center>" + (d.city) + "</center></b>" + "<table>"
                        + "<tr><td align='left'>Magnitude</td><td align='center'>:<td align='right'>" + d.mag + "</td></tr>"
                        + "<tr><td align='left'>Time</td><td align='center'>:<td align='right'>" + (d.time) + "</td></tr>"
                        + "<tr><td align='left'>Depth</td><td align='center'>:<td align='right'>" + (d.depth) + " km" + "</td></tr>" + "</table>")
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
                .on("mouseout", function (d) {
                tooltip.transition()
                           .duration(500)
                           .style("opacity", 0);
            });
        sites.exit()
                 .transition()
                 .attr("r", 0)
                 .remove();
    };

    var slider = d3.slider()
    .axis(d3.svg.axis()
          .ticks(25)
          .tickSize(8)
          .tickFormat(d3.format(""))
         )
    .min(1900)
    .max(2016)
    .value([1900, 2016])
    .step(1);
    
    d3.select('#slider3').call(slider.on("slide", function (evt, value) {
        d3.select('#slider3textmin').text(value[0]);
        d3.select('#slider3textmax').text(value[1]);    
        var newData = (data).filter(function (site) {
                return (site.created_at >= value[0] && site.created_at <= value[1]);
	        });
	    displaySites(newData);
    }));
});
}
//--------------------------------------------------------------------//

