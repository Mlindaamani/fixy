export const getBackendErrorMessage = (error) => error.response?.data?.message;

export const formatDate = (isoDate, options = {}) => {
  const date = new Date(isoDate);
  const defaultOptions = {
    minute: "2-digit",
    hour: "2-digit",
    day: "2-digit",
    month: "short",
    hour24: true,
  };
  const finalOptions = { ...defaultOptions, ...options };

  return date.toLocaleString("en-US", finalOptions);
};
