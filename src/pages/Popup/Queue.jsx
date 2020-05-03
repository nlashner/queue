import React from 'react';
import './Popup.css';

const Queue = (props) => {

  const { tracks } = props

  return (

    <div className="tracks">

      {
        tracks.map(track => {

          return (
            <div className="singleTrack">
              <a href={track.trackUrl} target="_blank">{track.trackName}</a>
            </div>
          )
        })
      }

    </div>
  )
}

export default Queue
