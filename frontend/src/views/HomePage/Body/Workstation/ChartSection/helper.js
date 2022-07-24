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

// export const externalTooltipHandlerPie = (context) => {
//   return externalTooltipHandlerHelper(context, "chatjs-tooltip-pie");
// }

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

      const span = document.createElement('div');
      span.style.background = colors.backgroundColor;
      span.style.marginRight = '10px';
      span.style.border = '2px solid rgb(255, 255, 255)';
      span.style.height = '12px';
      span.style.width = '12px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const textWrapper = document.createElement('div');
      textWrapper.style.fontSize = '14px';
      textWrapper.style.whiteSpace = 'nowrap';
      textWrapper.style.textOverflow = 'ellipsis';
      textWrapper.style.overflow = 'hidden';
      textWrapper.style.width = 'fit-content';
      textWrapper.style.display = 'inline-block';
      const text = document.createTextNode(body);
      textWrapper.appendChild(text);
      td.appendChild(span);
      td.appendChild(textWrapper);
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

