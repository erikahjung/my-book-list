import React from 'react';
// import { useRouteError } from 'react-router-dom'; //can only use this in a Router

export const ErrorPage = () => {
  // const error = useRouteError();
  // console.log(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
        <i>404 Page Not Found</i>
      </p>
    </div>
  )
};