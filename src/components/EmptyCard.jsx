import React from 'react'

const EmptyCard = ({ text }) => {
  return (
    <div className="empty-card">
      <div>
        <h4>{text}</h4>
      </div>
    </div>
  )
}

export default EmptyCard