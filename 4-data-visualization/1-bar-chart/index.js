const w = 800
const h = 400

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(data => {
            const dataset = data.data

            d3.select('#chart')
                .append('svg')
                .attr('height', h)
                .attr('width', w)

            function getDate(d) {
                console.log(d, new Date(d[0]))
                return new Date(d[0]);
            }

            const xScale = d3.scaleTime()
                .domain([getDate(dataset[0]), getDate(dataset[dataset.length - 1])])
                .range([0, w])

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d) => d[1])])
                .range([h, 0])

            const xAxis = d3.axisBottom().scale(xScale);
            const yAxis = d3.axisLeft().scale(yScale);

            d3.select('svg')
                .append('g')
                .call(xAxis)
                .attr('id', 'x-axis')
                .attr('transform', 'translate(40, 360)')

            d3.select('svg')
                .append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('transform', 'translate(40, -40)')


            d3.select('svg')
                .selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d) => xScale(getDate(d)) + 40)
                .attr("y", (d) => yScale(d[1]) - 40)
                .attr('width', () => w / 275)
                .attr("height", (d) => h - yScale(d[1]))
                .attr('data-date', (d) => d[0])
                .attr('data-gdp', (d) => d[1])
                .style('fill', '#74dbf1')
                .on('mouseover', (e) => {
                    const date = e.target.__data__[0]
                    const value = e.target.__data__[1]
                    d3.select('#tooltip')
                        .attr('data-date', date)
                        .style('display', 'initial')
                        .text(() => 'Date: ' + date + "  GDP: " + value)
                })
                .on('mouseout', () => {
                    d3.select('#tooltip')
                        .style('display', 'none')

                })
        }
    )
