import React from 'react';
import './Popup.css';

const Queue = (props) => {

  const { tracks, clearQueue } = props

  console.log('queue props', props)


  return (

    <div>
      <div className="tracks">
        {
          tracks.map(track => {

            return (
              <div className="singleTrack">
                <img src={track.trackImgUrl} className="trackImg" alt="trackIcon"></img>
                <a href={track.trackUrl} target="_blank">{track.trackName}</a>
              </div>
            )
          })
        }
      </div>

      <button type="button"
        className="button"
        onClick={clearQueue} >
        Back
      </button>
    </div>
  )
}

export default Queue
