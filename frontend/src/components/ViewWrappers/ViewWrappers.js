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
             |___F__|      |_F__|____| <MobileView renderFn={ (isBigScreen) => return Components depending on isBigScreen }/>
 */

const View = ({ children, withPadding, className }) => (
  <div className={`View ${withPadding ? 'View--padded': ''} ${className}`}>
    {children}
  </div>
);

const ViewSplitter = ({ children, className, omitOnMobile, withPadding, small }) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  return omitOnMobile && !isBigScreen ? false : (
    <div className={`ViewSplitter ${className} ${withPadding ? 'ViewSplitter--padded' : ''} ${small ? 'ViewSplitter--small' : ''}`}>
      {children}
    </div>
  );
};

const MobileView = ({ renderFn }) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  return (
    <View className="View--mobile">
      {renderFn(isBigScreen)}
    </View>
  );
};

export default { View, ViewSplitter, MobileView }
