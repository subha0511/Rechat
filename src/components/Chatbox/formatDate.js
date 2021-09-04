const formatDate = (data) => {
  if (!data) {
    return;
  }
  const date = new Date(data.toDate());
  // const strDate = date.toLocaleTimeString([], {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  // });
  const strTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return strTime;
};

export { formatDate };
