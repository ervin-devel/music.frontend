import React from 'react';
import {getCoverSong} from "../../utils/helpers";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className="hidden sm:block h-16 w-16 mr-4">
      <img src={getCoverSong(activeSong)} alt="cover art" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.artist ? activeSong?.artist : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.name ? activeSong?.name : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
