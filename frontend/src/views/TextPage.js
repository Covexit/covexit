import React, { useState } from 'react';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Loader from '../components/Loader/Loader';


const createTextPage = (textPage) => {

  return () => {
    import(`../textpages/${textPage}.js`).then((content) => {
      setContent(content.default);
    });
    const [content, setContent] = useState('');
    return (
      <ViewWrappers.View container withPadding>
        <div className="Intro">
          {content ? content : <Loader>Please wait.</Loader>}
        </div>
      </ViewWrappers.View>
    );
  }
}

export default createTextPage;
