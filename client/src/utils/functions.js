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
  SERVICEPROVIDER: "serviceProvider",
  ADMIN: "admin",
  CUSTOMER_DASHBAORD: "/customer",
  SERVICEPROVIDER_DASHBOARD: "/provider",
  ADMIN_DASHBOARD: "/admin",
};

export const TOAST_CONFIG = {
  duration: 3000,
  position: "top-center",
};

export const navigateTo = (user) => {
  switch (user?.role) {
    case USERROLE.CUSTOMER:
      return USERROLE.CUSTOMER_DASHBAORD;
    case USERROLE.SERVICEPROVIDER:
      return USERROLE.SERVICEPROVIDER_DASHBOARD;
    case USERROLE.ADMIN:
      return USERROLE.ADMIN_DASHBOARD;
    default:
      return "/";
  }
};
