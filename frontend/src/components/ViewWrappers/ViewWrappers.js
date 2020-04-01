import React from 'react'
import { useMediaQuery } from 'react-responsive'


import './ViewWrappers.scss';

/*            Mobile        Desktop
  View:       ______        _________
             |      |      |         |
             |      |      |         |
             |______|      |_________| <View><Component /></View>

  Split View: ______        _________  Right side omitted on mobile
             |      |      |    |    |
             |   L  |      | L  | R  |  <View>
             |______|      |____|____|    <ViewSplitter>...</ViewSplitter>
                                          <ViewSplitter omitOnMobile>...</ViewSplitter>
                                        </View>

  SplitView with footer:
              ______        _________  Left main content
             |   L  |      |    |    | Mobile: Left main top, Right in middle,
             |   R  |      | L  | R  | left footer at the bottom (usually buttons)
             |___F__|      |_F__|____| <SplitViewWithFooter left={<Component />} footer={<Component />} right={<Component />} />



 */

const View = ({ children, withPadding }) => (
  <div className={`View ${withPadding && 'View--padded'}`}>
    {children}
  </div>
);

const ViewSplitter = ({ children, omitOnMobile, withPadding, small }) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  return omitOnMobile && !isBigScreen ? false : (
    <div className={`ViewSplitter ${withPadding && 'ViewSplitter--padded'} ${small && 'ViewSplitter--small'}`}>
      {children}
    </div>
  );
};

const SplitViewWithFooter = ({ left, right, footer }) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  return (
    <View>
      <ViewSplitter>
        {left}
        {isBigScreen && footer}
      </ViewSplitter>
      <ViewSplitter>
        {right}
      </ViewSplitter>
      {!isBigScreen && <div className="ViewSplitter-footer">{footer}</div>}
    </View>
  );
};

export default { View, ViewSplitter, SplitViewWithFooter }
