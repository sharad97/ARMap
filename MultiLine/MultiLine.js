
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .innerTickSize(-height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(7)
    .innerTickSize(-width);

var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.energy); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("EPC_2000_2010_new.csv", function (error, data) {
	//returns an array containing the property key names of the specified associative array
	color.domain(d3.keys(data[0]).filter(function (key) { return key !== "date"; }));
	data.forEach(function (d) {
		d.date = parseDate.parse(d.date);
	});
	//javascript Array builtin
	var cities = color.domain().map(function (name) {
		return {
			name: name,
			values: data.map(function (d) {
				return {date: d.date, energy: +d[name]};
			})
		};
	});
    
	x.domain(d3.extent(data, function (d) { return d.date; }));
	y.domain([
		d3.min(cities, function (c) { return d3.min(c.values, function (v) { return v.energy; }); }),
		d3.max(cities, function (c) { return d3.max(c.values, function (v) { return v.energy; }); })
	]);
	
	svg.append("g")
	    .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
		.attr("y", 6)
		.attr("dx", "87em")
        .attr("dy", "0.1em")
        .style("text-anchor", "end")
        .text("Year");

	svg.append("g")
		.attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
		.attr("dx", "-15em")
        .attr("dy", "-4em")
        .style("text-anchor", "end")
        .text("Million BTUs Per Person");
	
	var city = svg.selectAll(".city")
			.data(cities)
			.enter().append("g")
			.attr("class", "city");

    var path = svg.selectAll(".city").append("path")
			.attr("class", "line")
			.attr("d", function (d) { return line(d.values); })
			.style("stroke", function (d) { return color(d.name); });
	
    city.append("text")
            .datum(function (d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
            .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value.energy) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function (d) { return d.name; });
	
    var totalLength = path.node().getTotalLength();
    
    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
    
    svg.on("click", function () {
        path
            .transition()
            .duration(2000)
            .ease("linear")
            .attr("stroke-dashoffset", totalLength);
    });
});
