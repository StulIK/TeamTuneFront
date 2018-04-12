import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        <LocaleToggle />
      </section>
    </Wrapper>
  );
}

export default Footer;
