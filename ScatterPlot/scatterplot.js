
    //Define Margin
var margin = {left: 80, right: 80, top: 50, bottom: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    //Define Color
var colors = d3.scale.category20();

var xValue = function (d) { return d.gdp; };
var yValue = function (d) { return d.epc; };

    //Define Scales   
var xScale = d3.scale.linear()
        .domain([-width / 2, width / 2])
        .range([0, width]);

var yScale = d3.scale.linear()
        .domain([-height / 2, height / 2])
        .range([height, 0]);
    

    //Scale Changes as we Zoom
    // Call the function d3.behavior.zoom to Add zoom
var zoom = d3.behavior.zoom()
        .x(xScale)
        .y(yScale)
        .scaleExtent([0.3, 10])
        .on("zoom", zoom);

    //Define SVG
var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

    //Define Tooltip here
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
      
       //Define Axis
var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

var Total = "total",
	Country = "country",
    Population = "population";

    //Get Data
d3.csv("scatterdata.csv", function (error, data) {
	data.forEach(function (d) {
		d.epc = +d.epc;
		d.gdp = +d.gdp;
	});
	
    // Define domain for xScale and yScale
    xScale.domain(d3.extent(data, function (d) { return d.gdp; }));
    yScale.domain(d3.extent(data, function (d) { return d.epc; }));

    //Draw Scatterplot
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {return Math.sqrt(d[Total]) / 0.2; })
	    .attr("cx", function (d) {return xScale(d.gdp); })
        .attr("cy", function (d) {return yScale(d.epc); })
        .style("fill", function (d) { return colors(d[Country]); })
        //Add .on("mouseover", .....
        //Add Tooltip.html with transition and style
        //Then Add .on("mouseout", ....
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html("Country: " + d.country + "<br>"
                + "Population: " + (d[Population]) + " Million" + "<br>"
                + "GDP: " + d.gdp + " Trillion" + "<br>"
                + "EPC: " + d.epc + " Million BTUs" + "<br>"
                + "Total: " + (d[Total] + " Trillion BTUs"))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    

    //Draw Country Names
    svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("class", "text")
        .style("text-anchor", "start")
        .attr("x", function (d) {return xScale(d.gdp); })
        .attr("y", function (d) {return yScale(d.epc); })
        .style("fill", "black")
        .text(function (d) {return d.country; });

    
 //x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 50)
        .attr("x", width / 2)
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .text("GDP (in Trillion US Dollars) in 2010");

    
    //Y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("font-size", "12px")
        .text("Energy Consumption per Capita (in Million BTUs per person)");

    
     // draw legend colored rectangles
    svg.append("rect")
        .attr("x", width - 250)
        .attr("y", height - 190)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width - 100)
        .attr("cy", height - 175)
        .style("fill", "white");
    
    svg.append("circle")
        .attr("r", 15.8)
        .attr("cx", width - 100)
        .attr("cy", height - 150)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 50)
        .attr("cx", width - 100)
        .attr("cy", height - 80)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 150)
        .attr("y", height - 172)
        .style("text-anchor", "end")
        .text(" 1 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 150)
        .attr("y", height - 147)
        .style("text-anchor", "end")
        .text(" 10 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 150)
        .attr("y", height - 77)
        .style("text-anchor", "end")
        .text(" 100 Trillion BTUs");
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", width - 150)
        .attr("y", height - 15)
        .style("text-anchor", "middle")
        .style("fill", "Green")
        .attr("font-size", "16px")
        .text("Total Energy Consumption");

//}
});


function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
	console.log(d3.event.translate)
    svg.selectAll(".text").attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    svg.selectAll(".dot").attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}
