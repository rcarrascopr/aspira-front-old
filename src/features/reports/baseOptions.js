export const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {
    //   data: ["SER", "HACER", "CONVIVIR", "CONOCER"],
    // },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        // data: [...centers.map((c) => c.name)],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    // series: [
    //   {
    //     name: "SER",
    //     type: "bar",
    //     barGap: 0,
    //     //label: labelOption,
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: [320, 332, 301, 334],
    //   },
    //   {
    //     name: "HACER",
    //     type: "bar",
    //     //label: labelOption,
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: [220, 182, 191, 234],
    //   },
    //   {
    //     name: "CONVIVIR",
    //     type: "bar",
    //     //label: labelOption,
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: [150, 232, 201, 154],
    //   },
    //   {
    //     name: "CONOCER",
    //     type: "bar",
    //     //label: labelOption,
    //     emphasis: {
    //       focus: "series",
    //     },
    //     data: [98, 77, 101, 99],
    //   },
    // ],
    color: [
      "#4ad23b",
      "#dc66a1",
      "#bf2bc9",
      "#ffd966",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
  };
