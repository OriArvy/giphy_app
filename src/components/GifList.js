import React from 'react';
import Gif from './Gif';

const GifList = (props) => {
  return (
    <div className="gif">
      {props.gifs.map(gif => <Gif id={gif.id} key={gif.id} selectGif={props.selectGif} />)}
    </div>
  );
};

export default GifList;