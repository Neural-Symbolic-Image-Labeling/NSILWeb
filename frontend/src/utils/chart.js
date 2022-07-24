export const chartColors = [
  "#336699",
  "#99CCFF",
  "#999933",
  "#666699",
  "#CC9933",
  "#006666",
  "#3399FF",
  "#993300",
  "#CCCC99",
  "#666666",
  "#FFCC66",
  "#6699CC",
  "#663366",
  "#9999CC",
  "#CCCCCC",
  "#669999",
  "#CCCC66",
  "#CC6600",
  "#9999FF",
  "#0066CC",
  "#99CCCC",
  "#999999",
  "#FFCC00",
  "#009999",
  "#99CC33",
  "#FF9900",
  "#999966",
  "#66CCCC",
  "#339966",
  "#CCCC33",
  "#003f5c",
  "#665191",
  "#a05195",
  "#d45087",
  "#2f4b7c",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#EF6F6C",
  "#465775",
  "#56E39F",
  "#59C9A5",
  "#5B6C5D",
  "#0A2342",
  "#2CA58D",
  "#84BC9C",
  "#CBA328",
  "#F46197",
  "#DBCFB0",
  "#545775"
];

export const getRuleLabelInfo = (collection) => {
  if (!collection) return { labels: ['unlabeled'], values: [1], colors: [chartColors[0]] };
  let nextColorIndex = 0;
  const colors = [];
  const labels = new Map();
  collection.images.forEach((item) => {
    item.labels.forEach((label) => {
      let key = label.name.length > 1 ? 'conflict' : label.name[0];
      if (!labels.has(key)) {
        labels.set(key, 0);
        colors.push(chartColors[nextColorIndex]);
        nextColorIndex++;
      }
      labels.set(key, labels.get(key) + 1);
    })
  });
  // console.log(labels);
  if (labels.size === 0) return { labels: ['unlabeled'], values: [1], colors: [chartColors[0]] };
  return { labels: Array.from(labels.keys()), values: Array.from(labels.values()), colors: colors };
};