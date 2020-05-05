import { matchPath } from "react-router-dom";

const getParams = (pathname, path) => {
  const matchProfile = matchPath(pathname, {
    path,// specify original path - /stores/:id/orders/:orderId
  });
  return (matchProfile && matchProfile.params) || {};
};

export default getParams;
