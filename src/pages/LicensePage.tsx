import React from 'react';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

const LicensePage: React.FC = () => {
  return (
    <section className={classNames('content', 'content--no-scroll')}>
      <div className={classNames('page-grid', 'page-grid--full')}>
        <div className={classNames('section')}>
          <div className={classNames('subsection', 'subsection--license')}>
            <div className={classNames('title')}> Licenses </div>
            <div>{`Copyright © 2016-${new Date().getFullYear()}, SPARCS OTL Team. All rights reserved.`}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicensePage;
