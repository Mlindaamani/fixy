
const salesOption = {
  animation: true,
  title: { text: "Services Overview", left: "center" },
  tooltip: { trigger: "axis" },

  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },

  yAxis: { type: "value" },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};

export default salesOption;
