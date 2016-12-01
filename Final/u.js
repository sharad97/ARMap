

var margin = {top: 50, right: 22, bottom: 20, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom,
 active;

// Set the projection methods for the world map
var projection = d3.geo.equirectangular()
                   .translate([width/2, height/2])
                   .scale((width) / 2.5 / Math.PI);

// Set the world map path
var path = d3.geo.path()
    .projection(projection);

  //SVG container

var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
		.call(d3.behavior.zoom().scaleExtent([1,7]).on("zoom", redraw))
		.append("g");

function redraw() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


var tile = d3.geo.tile()
    .scale(projection.scale() * 2 * Math.PI)
    .translate(projection([0, 0]))
    .zoomDelta((window.devicePixelRatio || 1) - 0.2);


  //Adding water
svg.append("path")
        .datum({type: "Sphere"})
        .attr("class", "water")
        .attr("d", path)
		.on("click", reset);


var g = svg.append("g");



// draw legend colored rectangles
  
    g.append("circle")
		.attr('r', 9)
		.attr("cx", width - 1145)
        .attr("cy", height - 290)
		.style("fill", "red")
	
	g.append("circle")
		.attr("class", "dot")
		.attr('r', 8)
        .attr("cx", width - 1145)
        .attr("cy", height - 245)
        .style("fill", "red")

    g.append("circle")
		.attr("class", "dot")
		.attr('r', 7)
        .attr("cx", width - 1145)
        .attr("cy", height - 205)
        .style("fill", "red")
	
	g.append("circle")
		.attr("class", "dot")
		.attr('r', 6)
        .attr("cx", width - 1145)
        .attr("cy", height - 170)
        .style("fill", "red")
	
	g.append("circle")
		.attr("class", "dot")
		.attr('r', 5)
        .attr("cx", width - 1145)
        .attr("cy", height - 140)
        .style("fill", "red")
	
	g.append("circle")
		.attr("class", "dot")
		.attr('r', 4)
        .attr("cx", width - 1145)
        .attr("cy", height - 115)
        .style("fill", "red")

    g.append("circle")
		.attr("class", "dot")
		.attr('r', 3)
        .attr("cx", width - 1145)
        .attr("cy", height - 90)
        .style("fill", "red");

	g.append("circle")
		.attr("class", "dot")
		.attr('r', 2)
        .attr("cx", width - 1145)
        .attr("cy", height - 70)
        .style("fill", "red")
	
	g.append("circle")
		.attr("class", "dot")
		.attr('r', 1)
        .attr("cx", width - 1145)
        .attr("cy", height - 50)
        .style("fill", "red")

    g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 286.5)
        .style("text-anchor", "end")
        .text(" 9 Magnitude")
		.style("fill", "brown");

	g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 240.9)
        .style("text-anchor", "end")
        .text(" 8 Magnitude")
		.style("fill", "brown");

	
	g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 200.9)
        .style("text-anchor", "end")
        .text(" 7 Magnitude")
		.style("fill", "brown");

    g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 166)
        .style("text-anchor", "end")
        .text(" 6 Magnitude")
		.style("fill", "brown");


	g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 135.5)
        .style("text-anchor", "end")
        .text(" 5 Magnitude")
		.style("fill", "brown");



	g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 111)
        .style("text-anchor", "end")
        .text(" 4 Magnitude")
		.style("fill", "brown");


    g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 87)
        .style("text-anchor", "end")
        .text(" 3 Magnitude")
		.style("fill", "brown");


	g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 67)
        .style("text-anchor", "end")
        .text(" 2 Magnitude")
		.style("fill", "brown");


	g.append("text")
        .attr("class", "label")
        .attr("x", width - 1072)
        .attr("y", height - 47)
        .style("text-anchor", "end")
        .text(" 1 Magnitude")
		.style("fill", "brown");

    
    g.append("text")
        .attr("class", "label")
        .attr("x", width - 1110)
        .attr("y", height - 15)
        .style("text-anchor", "middle")
        .style("fill", "Green")
        .attr("font-size", "16px")
        .text("Magnitude");

function click(d) {
  if (active === d) return reset();
  g.selectAll(".active").classed("active", false);

	
  d3.select(this).classed("active", active = d);

  var b = path.bounds(d);
  g.transition().duration(750).attr("transform",
      "translate(" + projection.translate() + ")"
      + "scale(" + .65 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
}

function reset() {
  g.selectAll(".active").classed("active", active = false);
  g.transition().duration(750).attr("transform", "");
}
    //Define Tooltip here
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
 
d3.json('tectonics.json', function(error, data) {
	if (error) throw error;
	g.insert("path")
		.datum(topojson.mesh(data, data.objects.tec))
		.attr("class", "tectonic")
		.attr("d", path);
});

var countryTooltip = d3.select("body").append("div").attr("class", "countryTooltip"),
    countryList = d3.select("body").append("select").attr("name", "countries");

queue()
    .defer(d3.json, "world_110m.json")
    .defer(d3.tsv, "world-110m-country-names.tsv")
    .await(ready);

  //Main function


function ready(error, world, countryData) {
	
d3.select("#button1").on("click", function () {

	var imgHeight = 550, imgWidth = 990,              // Image dimensions (don't change these)
    clipX0 = -84, clipY0 = -15,                     // (x,y) of the clipped region
    clipWidth = 1500, clipHeight = 500;              // Dimensions of clipped region
	
	var defs = svg.append("defs");

	defs.append("path")
      .attr("id", "land")
      .datum(topojson.object(world,world.objects.land))
      .attr("d", path);

	defs.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", "#land");
	
// Define the SVG clipPath
   g.append("svg:defs").append("svg:clipPath")
    .attr("id", "rectClip")
    .append("svg:rect")
    .attr("id", "rect1")
    .attr("x", clipX0)
    .attr("y", clipY0)
    .attr("width", clipWidth)
    .attr("height", clipHeight);

// Define the overlay that catches mouse events
	 g.append("rect")
    .attr("class", "overlay")
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr("width", width + "px")
    .attr("height", height + "px");

// Use <g> to reset the origin and add pan & zoom behavior
	g.append("g")
    .attr("id","myImage")
    .attr("transform","translate(" + (-clipX0) + "," + (-clipY0) + ")")
    .append("image")
    .attr("xlink:href", "mapserv1.png")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width",  imgWidth + "px")
    .attr("height", imgHeight + "px")
    .style("clip-path","url(#rectClip)");
 
	 g.append("use")
      .attr("xlink:href", "#land")
      .attr("class", "stroke");
});
	
d3.select("#button2").on("click", function () {
	
	var tiles = tile();
	  var defs = svg.append("defs");

	defs.append("path")
      .attr("id", "land")
      .datum(topojson.object(world,world.objects.land))
      .attr("d", path);

	defs.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", "#land");

  	g.append("g")
      .attr("clip-path", "url(#clip)")
    .selectAll("image")
      .data(tiles)
    .enter().append("image")
      .attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.random() * 4 | 0] + ".tiles.mapbox.com/v3/mapbox.natural-earth-2/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("width", Math.round(tiles.scale))
      .attr("height", Math.round(tiles.scale))
      .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
      .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); });

  g.append("use")
      .attr("xlink:href", "#land")
      .attr("class", "stroke");
});


    var countryById = {},
		countries = topojson.object(world, world.objects.countries).geometries;    
    
    
    //Adding countries to select

    countryData.forEach(function (d) {
        countryById[d.id] = d.name;
        option = countryList.append("option");
        option.text(d.name);
        option.property("value", d.id);
    });


    
    //Drawing countries on the globe

    var country1 = g.selectAll(".country").data(countries);

  country1
   .enter()
    .insert("path")
    .attr("class", "country")    
      .attr("title", function(d,i) { return d.name; })
      .attr("d", path)
      .on("click", click);
	
    //Show/hide tooltip
    country1
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
	
      
    //Country focus on option select

    d3.select("select").on("change", function () {
        var focusedCountry = country(countries, this),
            p = d3.geo.mercator(focusedCountry);
           g.selectAll("path")
            .classed("focused", function (d, i) { return d.id == focusedCountry.id ? focused = d : false; });
        });

    function country(cnt, sel) {
        for (var i = 0, l = cnt.length; i < l; i++) {
        if(cnt[i].id == sel.value) {return cnt[i];}
      }
    };
  };



function updateData1() {

// Add a clip path element to the world map group
// for the x axis 
g.append('clipPath')
 .attr('class', 'clip-path')
 .append('rect')
 .attr('x', 0)
 .attr('y', 30)
 .attr('width', width)
 .attr('height', height - 30)

// Group to hold all of the earthquake elements
var gQuakes = g.append('g')
                 .attr('class', 'all-quakes');

// Import the geoJSON file for the world map
	// Setup 24 hours ago object
	var dateObj = new Date();
	dateObj.setDate(dateObj.getDate() - 1);
	

	// Create the x scale based on the domain of the 24 hour ago object and now
	var x = d3.time.scale()
						.domain([dateObj, new Date()])
						.range([0, width - margin.right - margin.left]);

	// Append the xAxis on top
	var xAxis = g.append('g')
				.attr('id', 'xAxis')
				.attr('transform', 'translate(20, 20)')
				.call(d3.svg.axis().scale(x).orient("bottom").ticks(25));
	
	// Import the last 24 hours of earthquake data from USGS
	d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(error, data) {
		if(error) throw error;
		var quake = data.features.reverse();
		
		// Create a group with the quake id to hold the quake circle and pulse circle
		var earthquakeGroups = gQuakes.selectAll('g')
		   .data(quake)
		   .enter().append('g')
		   .attr('id', function(d) {
			     return d.id;
		   })
		   .attr('class', 'quake-group');
		
		//Create the pulse-circle circles for the earthquake pulse
		gQuakes.selectAll('.quake-group')
		   .append('circle')
		   .attr('class', 'circle pulse-circle')
		   .attr('cx', function(d) {
			     return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
		   })
		   .attr('cy', function(d) {
			     return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
		   })
			 .attr('r', function(d) {
			     return 0;
		   })
		   .attr('fill', '#fff');
		
		// Create the main quake circle with title
		gQuakes.selectAll('.quake-group')
		  .append('circle')
			.attr('cx', function(d) {
			     return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
		   })
		  .attr('cy', function(d) {
			     return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
		   })
		  .attr('r', 0 )
		  .attr('class', 'circle quake-circle')
		  .style('fill', 'red')
		  .style('opacity', 0.75)
		.on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
        tooltip
          .classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
          .html("Magnitude: " + d.properties.mag + "<br>"
                + "Location: " + d.properties.place)
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
        });
			

		
		// Function that calculates the difference between the earthquake and 24 hours ago and
		// creates a delay property.
		var setQuakeDelay = function() {
			for(var i = 0, max = quake.length; i < max; i++){
				var timeDiff = quake[i].properties.time - dateObj;
				var timeDiffObj = new Date(timeDiff);
				quake[i].delay = Date.parse(timeDiffObj) / 2700; // Speed up the animation, otherwise it would take 24 hours ><
			}
		}
		setQuakeDelay();
		
		// Grab the longest delay for the xAxis marker
		var longestDelay = quake[quake.length - 1].delay;
		
		// Changes the radius of the earthquakes to their magnitue using a transition
		// and the delay created from the setQuakeDelay function
		var quakeCircles = g.selectAll('.quake-circle')
			 .data(quake)
			 .transition()
			 .delay(function(d) {
				 return d.delay;
			 })
			 .duration(1000)
			 .attr('r', function(d) {
			   if(d.properties.mag < 0) {
					 return 0.1 * 1;
				 } else {
					 return d.properties.mag * 1;				 
				 }
			 });
		
		// Changes the radius of the pulse circle to eight times the magnitude
		// and fades out as it expands over two seconds
		var pulseCircles = g.selectAll('.pulse-circle')
			 .data(quake)
			 .transition()
			 .delay(function(d) {
				 return d.delay;
			 })
			 .duration(2000)
			 .attr('r', function(d) {
			   if(d.properties.mag < 0) {
					 return 0.1 * 10;
				 } else {
				 	 return d.properties.mag * 10;
				 }
			 })
			 .style('opacity', 0)
		   .remove()
		
		// Add the time marker that moves across the xAxis while the animation it playing.
		// It's not perfectly in sync, but it's close enough for this example. The length of 
		// the animation is equal to the longest delay that we calculated earlier.
		var timeline = xAxis.append('circle')
		     .attr('class', 'transition-circle')
		     .attr('cx', 0)
		     .attr('cy', 0)
		     .attr('r', 3)
		     .style('fill', 'red')
		     .transition()
			 .ease("linear")
		     .duration(longestDelay + 1000)
		     .attr('cx', 1120)
	});
	
	

}


function updateData2() {
	
  d3.tsv("rest_7771.txt")
    .row(function(d) {
      return {
        id: d.id,
        lat: parseFloat(d.latitude),
        lng: parseFloat(d.longitude),
        city: d.place,
		mag: d.mag,
		depth: d.depth,
		time: moment(d.time,"YYYY-MM-DD'T'HH:mm:ss.SSS'z'").utc().format("YYYY-MM-DD HH:mm:ss"), 
        created_at: moment(d.time,"YYYY-MM-DD'T'HH:mm:ss.SSS'z'").utc().format("YYYY")
      };
    })
    .get(function(err, rows) {
    	if (err) return console.error(err);

      window.site_data = rows;
    });

var displaySites = function(data) {
  var sites = g.selectAll(".site")
      .data(data, function(d) {
        return d.id;
      });

  sites.enter()
	  .append("circle")
      .attr("class", "site")
      .attr("cx", function(d) {
        return projection([d.lng, d.lat])[0];
      })
      .attr("cy", function(d) {
        return projection([d.lng, d.lat])[1];
      })
  	  .attr("r", function(d) {
			   if(d.mag < 0) {
					 return 0.1 * 1;
				 } else {
					 return d.mag * 1;				 
				 }
			 })
  .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
        tooltip
          .classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
          .html("Magnitude: " + d.mag + "<br>"
                + "Location: " + (d.city)+ "<br>"
				+ "Time: " + (d.time)+ "<br>"
				+ "Depth: " + (d.depth)+ " km")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
        });
  
  
 


  sites.exit()
    .transition().duration(200)
      .attr("r",0)
      .remove();
};


var minDate = moment('1900-01-01', "YYYY MM DD").utc().format("YYYY");
var maxDate = moment('2016-11-26', "YYYY MM DD").utc().format("YYYY");
var secondsInDay = 60 * 60 * 24;




var slider1 = d3.slider()
 .axis(d3.svg.axis().orient("bottom").ticks(30).tickFormat(d3.format("")))
	.min(minDate)
	.max(maxDate)
	.step(1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116)
  	.on("slide", function(evt, value) {
		
    	var newData = _(site_data).filter( function(site) {
			
      	return site.created_at > value;
		
    	})
    
		displaySites(newData);

 	})

	d3.select('#slider3').call(slider1);
	

 
var slider2 = d3.slider()
 .axis(false)
	.min(minDate)
	.max(maxDate)
	.step(1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116)
  	.on("slide", function(evt, value) {
		
    	var newData = _(site_data).filter( function(site) {
			
      	return site.created_at < value;
		
    	})
    
		displaySites(newData);

 	})

	d3.select('#slider3').call(slider2);
	
	
  //var slider2 = d3.slider()
  //.axis(false)
  //.min(minDate)
  //.max(maxDate)
  //.on("slide", function(evt, value) {
  //  var newData = _(site_data).filter( function(site) {
  //    return site.created_at < value;
		
  //  })
   // displaySites(newData);
//
  //})
  
	//d3.select('#slider3').call(slider2);
	
	
// d3.select('#slider3').call(d3.slider()
//  .axis(false).min(minDate).max(maxDate)
//  .on("slide", function(evt, value) {
//    var newData = _(site_data).filter( function(site) {
//      return site.created_at > value;
//		
//    })
//    displaySites(newData);
//
//  })
//);

	
}



function updateData3() {

g.append("circle")
    .attr("class", "dot")
    .attr("transform", "translate(" + projection([95, 3]) + ")")
    .attr("r", 9.2)
	.on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
        tooltip
          .classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
				    .text("2004 Indian Ocean earthquake: Magnitude of 9.1-9.3 Mw  Casualties: more than 229,866  ")
                    .style("left", (d3.event.pageX + 7) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
            })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
        });


setInterval(function() {
    g.append("circle")
        .attr("class", "ring")
        .attr("transform", "translate(" + projection([95, 3]) + ")")
        .attr("r", 6)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .transition()
        .ease("Linear")
        .duration(3000)
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 1)
        .style("stroke", "brown")
        .attr("r", 60);
}, 750);

g.append("circle")
    .attr("class", "dot")
    .attr("transform", "translate(" + projection([-75, -45]) + ")")
    .attr("r", 9.1);


setInterval(function() {
    g.append("circle")
        .attr("class", "ring")
        .attr("transform", "translate(" + projection([-75, -45]) + ")")
        .attr("r", 6)
        .style("stroke-width", 2)
        .style("stroke", "red")
       	.transition()
        .ease("Linear")
        .duration(3000)
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 1)
        .style("stroke", "brown")
        .attr("r", 60);
}, 750);

g.append("circle")
    .attr("class", "dot")
    .attr("transform", "translate(" + projection([-145, 62]) + ")")
    .attr("r", 9.1);


setInterval(function() {
    g.append("circle")
        .attr("class", "ring")
        .attr("transform", "translate(" + projection([-145, 62]) + ")")
        .attr("r", 6)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .transition()
        .ease("Linear")
        .duration(3000)
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 1)
        .style("stroke", "brown")
        .attr("r", 60);
}, 750);

g.append("circle")
    .attr("class", "dot")
    .attr("transform", "translate(" + projection([144, 39]) + ")")
    .attr("r", 9.1);


setInterval(function() {
    g.append("circle")
        .attr("class", "ring")
        .attr("transform", "translate(" + projection([144, 39]) + ")")
        .attr("r", 6)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .transition()
        .ease("Linear")
        .duration(3000)
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 1)
        .style("stroke", "brown")
        .attr("r", 60);
}, 750);

g.append("circle")
    .attr("class", "dot")
    .attr("transform", "translate(" + projection([162, 54]) + ")")
    .attr("r", 9.1);


setInterval(function() {
    g.append("circle")
        .attr("class", "ring")
        .attr("transform", "translate(" + projection([162, 54]) + ")")
        .attr("r", 6)
        .style("stroke-width", 2)
        .style("stroke", "red")
        .transition()
        .ease("Linear")
        .duration(3000)
        .style("stroke-opacity", 1e-6)
        .style("stroke-width", 1)
        .style("stroke", "brown")
        .attr("r", 60);
}, 750);

}

