import React, { useState } from 'react';

import HomeIcon from '../Icons/Home';
import InboxIcon from '../Icons/Inbox';

const Tab = ({ home }) => {
  const [isFocus, setFocus] = useState(home);

  const handleFocusColor = (arg) => arg ? 'FF7F48' : '4A4A4A';

  const handleFocusClass = (arg) => arg ? 'active-tab' : 'inactive-tab';

  return(
    <section className="Tab">
      <div onClick={() => setFocus(true)} className={handleFocusClass(isFocus)}>
        <HomeIcon color={handleFocusColor(isFocus)} />
        <p style={{ color: `#${handleFocusColor(isFocus)}` }}>Home</p>
      </div>
      <div onClick={() => setFocus(false)} className={handleFocusClass(!isFocus)}>
        <InboxIcon color={handleFocusColor(!isFocus)} />
        <p style={{ color: `#${handleFocusColor(!isFocus)}` }}>Inbox</p>
      </div>
    </section>
  );
}

Tab.defaultProps = {
  home: false
}

export default Tab;
