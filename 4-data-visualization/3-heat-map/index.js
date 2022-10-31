const w = 900
const h = 600
const cellColor1 = '#ee0000';
const cellColor2 = '#e7900d';
const cellColor3 = '#6f9898';
const cellcolor4 = '#02cefd';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

d3.select('#chart')
    .append('svg')
    .attr('height', h)
    .attr('width', w)

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then(data => {
            const xScale = d3.scaleLinear()
                .domain([1753, 2015])
                .range([40, w])


            const yScale = d3.scaleBand()
                .domain(months)
                .range([0, h])
                .padding(0);

            const xAxis = d3.axisBottom().scale(xScale)
                .tickFormat(d3.format('d'))


            const yAxis = d3.axisLeft().scale(yScale)


            d3.select('#chart svg')
                .append('g')
                .call(xAxis)
                .attr('id', 'x-axis')
                .attr('transform', 'translate(40, 575)')

            d3.select('#chart svg')
                .append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('transform', 'translate(80, -17.5)')

            d3.select('#chart svg')
                .selectAll('rect')
                .data(data["monthlyVariance"])
                .enter()
                .append('rect')
                .attr('class', 'cell')
                .attr('data-year', (d) => d["year"])
                .attr('data-month', (d) => d["month"] - 1)
                .attr('data-temp', (d) => d["variance"])
                .attr('fill', (d) => {
                    const val = d["variance"];
                    return val >= 0.5 ? cellColor1
                        : val <= 0.5 && val > 0 ? cellColor2
                            : val < 0 && val > -0.5 ? cellColor3
                                : cellcolor4;
                })
                .attr('x', (d) => xScale(d["year"]) + 40)
                .attr('y', (d) => yScale(months[d["month"] - 1]))
                .attr('height', 50)
                .attr('width', 2)
                .on('mouseover', (e) => {
                    console.log(e)

                    d3.select('#tooltip')
                        .style('display', 'initial')
                        .style('left', e.pageX + 'px')
                        .style('top', e.pageY + 'px')
                        .attr('data-year', e.target.attributes['data-year'].nodeValue)
                        .attr('data-month', e.target.attributes['data-month'].nodeValue)
                        .attr('data-temp', e.target.attributes['data-temp'].nodeValue)
                        .style('background-color', e.target.attributes['fill'].nodeValue)
                        .html(
                            "<p>" + months[e.target.attributes['data-month'].nodeValue] + " " + e.target.attributes['data-year'].nodeValue + "</p>" +
                            "Temperature Variance: " + e.target.attributes['data-temp'].nodeValue
                        )


                })
                .on('mouseout', () => {
                    d3.select('#tooltip')
                        .style('display', 'none')

                })

        }
    )

d3.select('#legend')
    .append('svg')
    .attr('height', 100)
    .attr('width', 400)
        .selectAll('rect')
        .data([cellColor1, cellColor2, cellColor3, cellcolor4])
        .enter()
        .append('rect')
        .attr('fill', d => d)
        .attr('x', (d, i) => i * 100)
        .attr('y', 5)
        .attr('height', 100)
        .attr('width', 100)