
const visitorsOption = {
  animation: true,
  title: { text: "Customer Statistics", left: "center" },
  tooltip: { trigger: "item" },

  series: [
    {
      type: "pie",
      radius: "60%",
      data: [
        { value: 1048, name: "Kinondini" },
        { value: 735, name: "Oysterbay" },
        { value: 580, name: "Kawe" },
        { value: 600, name: "Kilimanjaro" },
      ],
    },
  ],
};

export default visitorsOption;
