(function() {
    var tablets = [0, 0, 0, 0, 0, 0, 0, 2, 3, 6],
        phones = [0, 0, 1, 4, 5, 7, 11, 16, 22, 0],
        pc = [7, 8, 10, 14, 15, 16, 18, 19, 20, 20],
        year,
        margin = {top: 80, right: 80, bottom: 80, left: 80},
        n = 3, // number of layers
        m = 10, // number of samples per layer
        stack = d3.layout.stack().offset("wiggle"),
        layers0 = stack(d3.range(n).map(function(i) { return bumpLayer(i).values; })),
        width = 960,
        height = 500;

    var x = d3.time.scale()
            .domain([new Date('2004').getTime(), new Date('2013').getTime()])
            .range([0, width]);

    var y = d3.scale.linear()
            .domain([0, d3.max(layers0, function(layer) {
                return d3.max(layer, function(d) {
                    return d.y0 + d.y;
                });
            })]).range([height, 0]);

    var color = d3.scale.linear()
            .range(["#aad", "#556"]);

    var area = d3.svg.area()
            .x(function(d) { return x(d.x); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); });

    var xAxis = d3.svg.axis().scale(x).innerTickSize(-height).outerTickSize(1).tickSubdivide(true);

    var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);


    svg.selectAll("path")
        .data(layers0)
        .enter().append("path")
        .attr("d", area)
        .style("fill", function() { return color(Math.random()); });

    svg.append("g").attr('class', 'x-axis').attr("transform", "translate(0," + height + ")").call(xAxis);

    function bumpLayer(index) {
        switch(index) {
        case 0:
            year = 2003;
            return {
                values: tablets.map(function(val) {
                year++;
                return {
                    x: new Date(year.toString()).getTime(),
                    y: val
                };
            }), name: 'tablets'};
        case 1:
            year = 2003;
            return {values: phones.map(function(val){
                year++;
                return {
                    x: new Date(year.toString()).getTime(),
                    y: val
                };
            }), name: 'phones'};
        case 2:
            year = 2003;
            return {values: pc.map(function(val) {
                year++;
                return {
                    x: new Date(year.toString()).getTime(),
                    y: val
                };
            }), name: 'pc'};
        }
    }


})();
