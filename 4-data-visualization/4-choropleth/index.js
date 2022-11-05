const svg = d3.select("svg");

const tooltip = d3.select("#tooltip");

const path = d3.geoPath();

let data = new Map();
const colorScale = d3
  .scaleThreshold()
  .domain([0, 5, 10, 15, 20, 25, 30, 45, 60, 100])
  .range(d3.schemePastel2);

Promise.all([
  d3.json(
    "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json"
  ),
  d3.json(
    "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"
  ),
  (d) => {
    data.set(d.code, +d.pop);
  },
]).then((data) => {
  const eduData = data[0];
  const geoData = data[1];

  svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(geoData, geoData.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("data-fips", (d) => {
      return d.id;
    })
    .attr("data-education", (d) => {
      const result = eduData.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return result[0].bachelorsOrHigher;
      }
    })
    .attr("data-county", (d) => {
      const result = eduData.filter((obj) => {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return result[0].area_name;
      }
    })
    .attr("fill", (d) => {
      const result = eduData.filter((obj) => {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return colorScale(result[0].bachelorsOrHigher);
      }
    })
    .on("mouseover", (e) => {
      console.log(e);

      tooltip
        .style("display", "initial")
        .style("left", e.pageX + "px")
        .style("top", e.pageY + "px")
        .attr("data-education", e.target.attributes["data-education"].nodeValue)
        .attr("data-county", e.target.attributes["data-county"].nodeValue)
        .text(
          e.target.attributes["data-county"].nodeValue +
            ": " +
            e.target.attributes["data-education"].nodeValue +
            "%"
        )
        .style("background-color", e.target.attributes["fill"].nodeValue);
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("display", "none");
    });
});

d3.select("#legend")
  .append("svg")
  .attr("height", 100)
  .attr("width", 400)
  .selectAll("rect")
  .data([0, 5, 10, 15, 20, 25, 30])
  .enter()
  .append("rect")
  .attr("fill", (d) => colorScale(d))
  .attr("x", (d, i) => i * 20)
  .attr("y", 5)
  .attr("height", 20)
  .attr("width", 20)
  .text((d) => d);
