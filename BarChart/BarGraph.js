/*global d3*/

/* ----------------------------------------------------------------------------
File: BarGraph.js
Contructs the Bar Graph using D3
80 characters perline, avoid tabs. Indent at 4 spaces. See google style guide on
JavaScript if needed.
-----------------------------------------------------------------------------*/



// Search "D3 Margin Convention" on Google to understand margins.
// Add comments here in your own words to explain the margins below (.25 point)

//Sets the dimensions and margins of the graph.
var margin = {top: 10, right: 40, bottom: 150, left: 50},
	//Sets margin for graphing area.
	//Margin generates space around elements. 
	//Each side of the element can be customizable by using top, right, bottom, and left. 
    width = 760 - margin.left - margin.right,
	//Sets weidth of graphing area.
    height = 500 - margin.top - margin.bottom;
	//Sets height of graphing area.
    
 

/* --------------------------------------------------------------------
SCALE and AXIS are two different methods of D3. See D3 API Refrence and 
look up SVG AXIS and SCALES. See D3 API Refrence to understand the 
difference between Ordinal vs Linear scale.
----------------------------------------------------------------------*/



// Define X and Y SCALE.
// Add comments in your own words to explain the code below (.25 point)

//The range is used for visual space.
var xScale = d3.scale.ordinal()
	//(d3.scale.ordinal) has discrete data set.
    .rangeRoundBands([0, width], 0.1);
    // (.rangeRoundBands) specifies the range that those values will cover and makes the bars clean and spaced properly.
    //The range is specified as being from 0 to the width of the graphing area. 
	//It make starting point from 0 and end at the end of graph.
    //After 0.1 is specified for padding of 0.1 to create space.
var yScale = d3.scale.linear()
    //d3.scale.linear() has comparative numbers
    .range([height, 0]);
    //(.range) specifies the range that those values will cover.
    //The range is specified as being from the height of the graphing area to 0. 
	//It make starting point from the height of the graphing area to 0.
	



// Define X and Y AXIS
// Define tick marks on the y-axis as shown on the output with an interval of 5 and $ sign(1 point)

var  dollar_sign = d3.format("$");
     //Variable is created known as the dollar_sign with value $

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5)
    //Creats interval of 5 in y axis.
    .tickFormat(dollar_sign);
    //It gets dollar_sign value from dollar_sign variable and displays it.




// Define SVG. "g" means group SVG elements together.
// Confused about SVG still, see Chapter 3. 
// Add comments here in your own words to explain this segment of code (.25 point)

//Creates svg element to place shapes e.g rectangles.(makes svg container)
var svg = d3.select("body").append("svg")
    //Creates svg variable.
    //It will find the body and append a new svg element just before the closing the body.
    .attr("width", width + margin.left + margin.right)
    //Width is refrenced from earlier code located at var margin.
    .attr("height", height + margin.top + margin.bottom)
    //Height is refrenced from earlier code located at var margin.
    .append("g")
    //Groups svg element together.
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //This attribute applies a list of transformations to an element and sub-elments.
    //Tells the SVG Group Element, "g", to do a transformation where by it translates the element and sub-elements by 
    //moving to margin.left value from earlier code, margin.top value from earlier code.(topleft)



/* --------------------------------------------------------------------
To understand how to import data. See D3 API refrence on CSV. Understand
the difference between .csv, .tsv and .json files. To import a .tsv or
.json file use d3.tsv() or d3.json(), respectively.
----------------------------------------------------------------------*/



// BarData.csv contains the country name(key) and its GDP(value)
// 1 point for explaining the code for reading the data

// Gets the data from BarData.csv file
d3.csv("BarData.csv", function (error, data) {
    data.forEach(function (d) {
    //Tells the block of code that for each group within the 'data' array it should carry out a function on them.
    //The function is asigned d.
	//Ensures the numeric value from data file are set and formatted correctly.
        d.key = d.key;
		//Function pulls out the value of "key".
        d.value = +d.value;
		//Function pulls out the value of "value".
		//Sets the "value" to a numeric value using + operator.
    });

    
    
    // Return X and Y SCALES (domain). See Chapter 7:Scales (Scott M.) 
    // .25 point for explaining the code below
	
	//The domain is used for data of space.
	//Lets D3 know what the scope of data will it have and they are then passed to the scale function.
    xScale.domain(data.map(function (d) { return d.key; }));
	//(function(d) { return d.key; }) returns all the 'key' values in 'data'. This is then passed to the scale function.
	//(.map) function that finds the maximum and minimum values in the array and then passed to the scale function.
	//The (.domain) function which returns those maximum and minimum values to D3 as the range for the x axis.
    yScale.domain([0, d3.max(data, function (d) {return d.value; })]);
    //Tells y axis goes from 0 to the maximum in the data range.
	//0 is the starting point.
    
    
	
    // Creating rectangular bars to represent the data. 
    // Add comments to explain the code below (no points but there may be a quiz in future)
	
	//selection of rectangles and creates rectangles
    svg.selectAll("rect")
        .data(data)
		//Allows us to attach data of any type
        .enter()
		//Allows us to bind the data to the empty selection
        .append("rect")
        .attr("height", 0)
        .attr("y", height)
        .attr({
            "x": function (d) { return xScale(d.key); },
            "y": function (d) { return yScale(d.value); },
            "width": xScale.rangeBand(),
            "height": function (d) { return height - yScale(d.value); },
        
     
    
            // create increasing to decreasing shade of blue as shown on the output (2 points)
            "fill": function (d, i) { return "rgb(0, 0, " + (i * 15) + ")"; }
			//Fills the rectangle with color from increasing to decreasing shade of blue color
        
        });
	
    
    
    // Label the data values(d.value) (3 points)
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function (d) {
            return d.value;
        })
        .attr("x", function (d) {
            return xScale(d.key);
        })
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "White")
        .attr("dx", "1.8em")
	    //Moves text horizontaly.
	    .attr("dy", ".85em")
	    //Moves text verticaly.
        .style("text-anchor", "middle");
    
    
    
    // Draw xAxis and position the label at -60 degrees as shown on the output (1 point)
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 0.1) + ")")
        .call(xAxis)
        .selectAll("text")
	    //Selects all text in x axis.
        .attr("dx", ".1em")
	    //Moves text verticaly.
        .attr("dy", "-.65em")
	    //Moves text horizontaly.
        .style("text-anchor", "end")
        .attr("font-size", "10px")
        .attr("transform", function (d) {
		    return "translate(" + this.getBBox().height * 0.1 + "," + this.getBBox().height + ")rotate(-60)";
            //Rotates text in x axis -60 degree.
        });
        
    
    
    
    // Draw yAxis and postion the label (2 points)
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + (width - 670) + ")")
        .call(yAxis)
        .selectAll("text")
		//Selects all text element.
        .attr("dx", ".1em")
		//Moves text horizontaly.
        .attr("dy", ".30em")
		//Moves text vertically.
        .style("text-anchor", "end")
		//This makes it easy to align the text as the transform is applied to the anchor.
		//End of the text string is at the initial current text position.
        .attr("font-size", "10px");
	
	
	
    //Displays the text "Trillions of US Dollars ($)"
    svg.append("text")
        .attr("text-anchor", "middle")
		//This makes it easy to centre the text as the transform is applied to the anchor.
        .attr("transform", "translate(0," + (width - 450) + ")rotate(-90)")
		//Text is drawn off the screen top left, move down and out and rotate.
        .attr("dx", "2em")
		//Moves text vertically.
        .attr("dy", "-2.25em")
		//Moves text horizontaly.
        .text("Trillions of US Dollars ($)");
		//Text in ("") will display.
});

        
    