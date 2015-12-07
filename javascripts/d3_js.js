        var w = 600;
        var h = 400;
        var padding = 55;
        var data;
        var color;
        var league_name;
        var currency;
        var k_val = 1;
        loadAlldata();
        function loadAlldata(){
                d3.csv("All_transfers_with_value.csv", function(csv) {
                dataset = csv; 
                viewEngland();
                });
        }
        function SeasonValue(dataset,val){
                d3.select("svg").remove();

                //Create div
                var div = d3.select("#chartline1").append("div")   
                        .attr("class", "tooltip")               
                        .style("opacity", 0);
                //Create SVG
                var svg = d3.select("#chartline1")
		            .append("svg")
				    .attr("width", w)
					.attr("height", h);

                

                var xScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d)
                        { return +d.value; })])
			    .range([padding, w-padding]);
                
                var rScale = d3.scale.sqrt()
                .domain([0, d3.max(dataset, function(d) 
                        { return d.ngoals+ d.nassists; })])
                .range([2, 3.5]);

                //Creating Tip
                var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                       return "<strong><span style='color:white'>Name : </span></strong><span style='color:red'>"
                       + d.names+"</span><br>"
                        +"<strong><span style='color:white'>Goals : </span></strong><span style='color:red'>"
                        + d.ngoals+"</span><br>"
                        +"<strong><span style='color:white'>Assists : </span></strong><span style='color:red'>"
                        + d.nassists+"</span><br>";
                })
                //Calling tip
                svg.call(tip);
                //Creating circles        
                var circles = svg.selectAll("circle")
			        .data(dataset)
			        .enter()
			        .append("circle")
                    .on("click",function(d){console.log(d)})
                    .on("mouseover",tip.show)
                    .on("mouseout",tip.hide)
                    .attr("fill",color);

                    //Setting up x-axis 
                    var xAxis = d3.svg.axis();
                    xAxis.scale(xScale);
                    xAxis.orient("bottom").ticks(5);

                    svg.append("g").attr("class","axis")
                    .attr("transform",
                            "translate(0," + (h - padding) + ")")
                    .call(xAxis);
                    
                    //Setting up the Title
                    svg.append("text")
                    .attr("x", w/2)
                    .attr("y", 30)
                    .attr("font-family","sans-serif")
                    .attr("font-size",15)
                    .style("text-anchor", "middle")
                    .text(league_name);

                    svg.append("text")
                    .attr("x", w/2)
                    .attr("y", h-5)
                    .attr("font-family","sans-serif")
                    .attr("font-size",12)
                    .style("text-anchor", "middle")
                    .text("Value(in "+currency+")");

                    if (val == 1){
                    //Create Y-scale
                    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) 
                                { return +d.season_value; })])
                    .range([h-padding, padding]);
                    //Setting up y-axis
                    var yAxis = d3.svg.axis();
                    yAxis.scale(yScale);
                    yAxis.orient("left").ticks(5);

                    svg.append("g").attr("class","axis")
                    .attr("transform","translate("+padding+",0)")
                    .call(yAxis);
                    
                    circles.attr({cx:function(d)
                        {return xScale(d.value);},
                        cy:function(d)
                        {return yScale(d.season_value);},
                        r:function(d)
                        {return rScale(d.nassists+d.ngoals);}});

                    svg.append("text")
                    .attr("transform","rotate(-90)")
                    .attr("y", 10)
                    .attr("x", -h/2-20)
                    .attr("font-family","sans-serif")
                    .attr("font-size",12) 
                    .text("Season Value");
                    }
                    else if(val == 2){
                     //Create Y-scale
                    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) 
                                { return +d.ngoals; })])
                    .range([h-padding, padding]);
                    //Setting up y-axis
                    var yAxis = d3.svg.axis();
                    yAxis.scale(yScale);
                    yAxis.orient("left").ticks(5);

                    svg.append("g").attr("class","axis")
                    .attr("transform","translate("+padding+",0)")
                    .call(yAxis);
                    
                    circles.attr({cx:function(d)
                        {return xScale(d.value);},
                        cy:function(d)
                        {return yScale(d.ngoals);},
                        r:function(d)
                        {return rScale(d.nassists+d.ngoals);}});

                    svg.append("text")
                    .attr("transform","rotate(-90)")
                    .attr("y", 10)
                    .attr("x", -h/2-20)
                    .attr("font-family","sans-serif")
                    .attr("font-size",12) 
                    .text("Goals");
                    }
                    else if(val == 3){
                     //Create Y-scale
                    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) 
                                { return +d.nassists; })])
                    .range([h-padding, padding]);
                    //Setting up y-axis
                    var yAxis = d3.svg.axis();
                    yAxis.scale(yScale);
                    yAxis.orient("left").ticks(5);

                    svg.append("g").attr("class","axis")
                    .attr("transform","translate("+padding+",0)")
                    .call(yAxis);
                    
                    circles.attr({cx:function(d)
                        {return xScale(d.value);},
                        cy:function(d)
                        {return yScale(d.nassists);},
                        r:function(d)
                        {return rScale(d.nassists+d.ngoals);}});

                    svg.append("text")
                    .attr("transform","rotate(-90)")
                    .attr("y", 10)
                    .attr("x", -h/2-20)
                    .attr("font-family","sans-serif")
                    .attr("font-size",12) 
                    .text("Assists");
                    }
        }
        function viewEngland(){
                data = dataset.filter(function(d){
                            return d.country == 'England'});
                color = "#990000"
                currency = "Pounds"
                league_name = 'English League'
                SeasonValue(data,k_val);
        }
        function viewSpain(){
                data = dataset.filter(function(d){
                            return d.country == 'Spain'});
                color = "#0216AD"
                currency = "Euros"
                league_name = 'Spanish League'
                SeasonValue(data,k_val);
        }
        function viewItaly(){
                data = dataset.filter(function(d){
                            return d.country == 'Italy'});
                color = "#00994d"
                currency = "Euros"
                league_name = 'Italian League'
                SeasonValue(data,k_val);
        }
        function viewSeasonValue(){
                k_val = 1;
                SeasonValue(data,1);
        }
        function viewGoals(){
                k_val = 2;
                SeasonValue(data,2);
        }
        function viewAssists(){
                k_val = 3;
                SeasonValue(data,3);
        }

