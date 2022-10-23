const w = 900
const h = 500

d3.select('#chart')
    .append('svg')
    .attr('height', h)
    .attr('width', w)

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(data => {


            const dates = [];
            data.map((i) => {
                i = i.Time.split(':');
                dates.push(new Date(1970, 1, 1, 0, i[0], i[1]))
            })


            console.log(dates)

            const xScale = d3.scaleLinear()
                .domain([d3.min(data.map((i) => i.Year)), d3.max(data.map((i) => i.Year))])
                .range([0, w])
                .nice()

            const yScale = d3.scaleTime()
                .domain([d3.max(dates), d3.min(dates)])
                .range([h, 0])
                .nice()

            const xAxis = d3.axisBottom().scale(xScale)
                .tickFormat(d3.format('d'))

            const yAxis = d3.axisLeft().scale(yScale)
                .tickFormat(d3.timeFormat('%M:%S'))

            d3.select('svg')
                .append('g')
                .call(xAxis)
                .attr('id', 'x-axis')
                .attr('transform', 'translate(40, 450)')

            d3.select('svg')
                .append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('transform', 'translate(40, -50)')

            d3.select('svg')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot')
                .attr('cx', (d) => xScale(d.Year) + 40)
                .attr('cy', (d, i) => yScale(dates[i]) - 50)
                .attr('data-xvalue', (d) => d.Year)
                .attr('data-yvalue', (d, i) => (dates[i]))
                .attr('data-name', (d) => d.Name)
                .attr('data-doping', (d) => d.Doping)
                .attr('data-url', (d) => d.URL)
                .attr('r', 5)
                .on('mouseover', (e) => {
                    console.log(e)

                    d3.select('#tooltip')
                        .style('display', 'initial')
                        .style('left', e.pageX + 'px')
                        .style('top', e.pageY + 30 + 'px')
                        .attr('data-year', e.target.attributes['data-xvalue'].nodeValue)
                        .html(
                            '<a href="' + e.target.attributes['data-url'].nodeValue + '">Name: ' + e.target.attributes['data-name'].nodeValue + '</a><br>' +
                            e.target.attributes['data-doping'].nodeValue
                        )


                })
                .on('mouseout', () => {
                    d3.select('#tooltip')
                        .style('display', 'none')

                })
        }
    )
