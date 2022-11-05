const tooltip = d3.select("#tooltip");

const w = 1295;
const h = 1300;

const colorScale = d3.scaleOrdinal().range(d3.schemePastel2);

const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", w + 20)
  .attr("height", h + 20)
  .append("g")
  .attr("transform", `translate(10, 10)`);

d3.json(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
).then((data) => {
  const root = d3
    .hierarchy(data)
    .sum((d) => {
      return d.value;
    })
    .sort((a, b) => {
      return b.height - a.height || b.value - a.value;
    });
  d3.treemap().size([w, h])(root);
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("class", "tile")
    .attr("x", function (d) {
      return d.y0;
    })
    .attr("y", function (d) {
      return d.x0;
    })
    .attr("width", function (d) {
      return d.y1 - d.y0;
    })
    .attr("height", function (d) {
      return d.x1 - d.x0;
    })
    .attr("data-name", (d) => {
      return d.data.name;
    })
    .attr("data-category", (d) => {
      return d.data.category;
    })
    .attr("data-value", (d) => {
      return d.data.value;
    })
    .attr("fill", (d) => {
      return colorScale(d.data.category);
    })
    .style("stroke", "black")
    .on("mouseover", (e) => {
      tooltip
        .style("opacity", 0.8)
        .style("left", e.pageX + "px")
        .style("top", e.pageY + "px")
        .attr("data-value", e.target.attributes["data-value"].nodeValue)
        .html(`Name: ${e.target.attributes["data-name"].nodeValue}
        <br>Category: ${e.target.attributes["data-category"].nodeValue}
        <br>Value: ${e.target.attributes["data-value"].nodeValue}`);
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("opacity", 0);
    });

  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
    .attr("x", function (d) {
      return d.y0 + 5;
    })
    .attr("y", function (d) {
      return d.x0 + 10;
    })
    .selectAll("tspan")
    .data((d) => {
      return d.data.name.split(/[\/\s]/g);
    })
    .enter()
    .append("tspan")
    .text((d) => {
      return d;
    })
    .attr("y", function (d, i) {
      const parent = this.parentElement;
      const y = parseFloat(parent.getAttribute("y"));
      if (i === 0) {
        return y;
      } else {
        return y + i * 10;
      }
    })
    .attr("x", function (d, i) {
      const parent = this.parentElement;
      return parent.getAttribute("x");
    })
    .attr("font-size", "12px")
    .attr("fill", "black");

  let categories = root.leaves().map((item) => {
    return item.data.category;
  });
  categories = categories.filter((category, index, self) => {
    return self.indexOf(category) === index;
  });
  const legend = d3
    .select("#legend")
    .append("svg")
    .attr("height", 200)
    .attr("width", 500)
    .style("background", "grey");

  legend
    .selectAll("rect")
    .data(categories)
    .join("rect")
    .attr("class", "legend-item")
    .attr("data-category", (d) => d)
    .attr("fill", (d) => {
      return colorScale(d);
    })
    .attr("x", 10)
    .attr("y", 10)
    .attr("transform", function (d, i) {
      return (
        "translate(" +
        (i % 5) * 100 +
        "," +
        (Math.floor(i / 5) * 10 + 40 * Math.floor(i / 5)) +
        ")"
      );
    })
    .attr("height", 10)
    .attr("width", 10);

  legend
    .selectAll("text")
    .data(categories)
    .join("text")
    .attr("fill", "black")
    .attr("x", 30)
    .attr("y", 20)
    .attr("transform", function (d, i) {
      return (
        "translate(" +
        (i % 5) * 100 +
        "," +
        (Math.floor(i / 5) * 10 + 40 * Math.floor(i / 5)) +
        ")"
      );
    })
    .text((d) => {
      return d;
    });
});
