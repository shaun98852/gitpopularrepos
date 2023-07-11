// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, requiredFunction, trueOrFalse} = props
  const {id, language} = eachItem

  const getLanguage = () => {
    requiredFunction(id)
  }

  const buttonProperty = trueOrFalse ? 'showColor' : 'normalButton'

  return (
    <li className="listItem">
      <button className={buttonProperty} type="button" onClick={getLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
