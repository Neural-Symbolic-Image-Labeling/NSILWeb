export const getRuleLabelInfo = (collection) => {
  if (!collection) return { labels: [], values: [] };
  const labels = new Map();
  collection.images.forEach((item) => {
    item.labels.forEach((label) => {
      let key = label.name.length > 1 ? 'uncertain' : label.name[0];
      if (!labels.has(key)) {
        labels.set(key, 0);
      }
      labels.set(key, labels.get(key) + 1);
    })
  });
  console.log(labels);
  return { labels: Array.from(labels.keys()), values: Array.from(labels.values()) };
}

const getOrCreateTooltip = (chart, id) => {
  let tooltipEl = chart.canvas.parentNode.querySelector(`#${id}`);
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.setAttribute('id', id);
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.borderCollapse = 'separate';
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandlerDoughnut = (context) => {
  return externalTooltipHandlerHelper(context, "chatjs-tooltip-doughnut");
}

export const externalTooltipHandlerPie = (context) => {
  return externalTooltipHandlerHelper(context, "chatjs-tooltip-pie");
}

const externalTooltipHandlerHelper = (context, id) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart, id);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    tooltipEl.style.zIndex = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);
      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.marginRight = '10px';
      span.style.border = '3px soild white';
      span.style.height = '12px';
      span.style.width = '12px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;
      td.style.fontSize = '14px';
      td.style.wordBreak = 'break-all';

      const text = document.createTextNode(body);
      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  tooltipEl.style.zIndex = 100;
};