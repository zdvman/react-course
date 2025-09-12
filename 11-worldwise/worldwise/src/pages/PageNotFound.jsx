import { useLocation } from 'react-router-dom';
function PageNotFound() {
  const { pathname } = useLocation();
  console.log(pathname);

  return <div>Not found URL with the following path: {pathname}</div>;
}

export default PageNotFound;
