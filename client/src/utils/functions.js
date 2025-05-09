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

export const USERROLE = {
  CUSTOMER: "customer",
  CUSTOMER_DASHBAORD: "/customer",
  SERVICEPROVIDER: "serviceProvider",
  SERVICEPROVIDER_DASHBOARD: "/provider",
};

export const TOAST_CONFIG = {
  duration: 3000,
  position: "top-center",
};

export const navigateTo = (user) => {
  return user?.role === USERROLE.CUSTOMER
    ? USERROLE.CUSTOMER_DASHBAORD
    : USERROLE.SERVICEPROVIDER_DASHBOARD;
};
