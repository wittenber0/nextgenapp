import React from 'react';

const PageWrapper = ({children}) => (
  <div>
    <div className="page-header"></div>
    <div className="page-body">{children}</div>
    <div className="page-footer"></div>
  </div>
);

export default PageWrapper;
