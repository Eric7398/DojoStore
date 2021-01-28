import React from 'react'
import closeIcon from '../socketIcons/closeIcon.png'
import onlineIcon from '../socketIcons/onlineIcon.png'


const InfoBar = ({ room }) => {
  return (
    <div style={{ display: "flex", justifyContent: 'space-between' }} className="bg-primary">
      <div>
        <img src={onlineIcon} alt="online image" />
        <h3>{room}</h3>
      </div>
      <div>
        {/* Keep this as an anchor tag. This will allow for socket to completely disconnect.*/}
        <a href="/join"><img src={closeIcon} alt="close image" /></a>
      </div>
    </div>
  )
}

export default InfoBar
