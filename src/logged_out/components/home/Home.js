import React, {Fragment, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import {post} from "../http";

function Home(props) {
  const { selectHome } = props;
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef();

  useEffect(() => {
    selectHome();
  }, [selectHome]);


  const handleClick = () => {
      const formData  = new FormData();
      formData.append('file', file);
      post('completeAnalyze', formData).then(res => {
          setResult(res)
      })
  }

  useEffect(() => {
      if(!file) setResult(null)
  }, [file])

  return (
    <Fragment>
        <HeadSection file={file} setFile={setFile} handleClick={handleClick}/>
        <div id={'results'}>
            <PricingSection result={result}/>
        </div>
        <div id={'features'}>
            <FeatureSection file={file}/>
        </div>
    </Fragment>
  );
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;
