// WatchEpisode.js

import React from 'react';

const WatchEpisode = ({ episode }) => {
  return (
    <div>
      <h3>{episode.name}</h3>
      <video controls width="400" height="auto">
        <source src={episode.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default WatchEpisode;
