// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {contents} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = contents

  return (
    <li className="languageListItem">
      <img src={avatarUrl} className="image" alt={name} />
      <h1 className="avatarHeading">{name}</h1>
      <div className="starsBox">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="stars"
          alt="stars"
        />
        <p className="starsParagraph">{starsCount}</p>
        <p className="starsPara">stars</p>
      </div>

      <div className="starsBox">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="stars"
          alt="forks"
        />
        <p className="starsParagraph">{forksCount}</p>
        <p className="starsPara">forks</p>
      </div>

      <div className="starsBox">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="stars"
          alt="open issues"
        />
        <p className="starsParagraph">{issuesCount}</p>
        <p className="starsPara">open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
