import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const switchDetails = {
  initial: 'INITIAL',
  loading: 'LOADING',
  correctDetails: 'CORRECT_DETAILS',
  wrongDetails: 'WRONG_DETAILS',
}

class GithubPopularRepos extends Component {
  state = {
    currentLanguage: languageFiltersData[0].id,
    getList: [],
    isLoading: switchDetails.initial,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {currentLanguage} = this.state

    this.setState({isLoading: switchDetails.loading})

    const Url = `https://apis.ccbp.in/popular-repos?language=${currentLanguage}`

    const response = await fetch(Url)

    if (response.ok) {
      const option = await response.json()
      const details = option.popular_repos

      const updatedDetails = details.map(eachItem => ({
        name: eachItem.name,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        getList: updatedDetails,
        isLoading: switchDetails.correctDetails,
      })
    } else {
      this.setState({
        isLoading: switchDetails.wrongDetails,
      })
    }
  }

  changeState = id => {
    this.setState({currentLanguage: id}, this.getItems)
  }

  getListItems = () => {
    const {getList} = this.state
    return (
      <ul className="ulListLanguage">
        {getList.map(eachItem => (
          <RepositoryItem contents={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  somethingWentWrong = () => (
    <div className="background">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="wrongImage"
        alt="failure view"
      />
      <h1 className="wrongHeading">Something Went Wrong</h1>
    </div>
  )

  loadingFunction = () => (
    <div data-testid="loader" className="loaderAligner">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  switchFunction = () => {
    const {isLoading} = this.state

    switch (isLoading) {
      case switchDetails.correctDetails:
        return this.getListItems()
      case switchDetails.wrongDetails:
        return this.somethingWentWrong()
      case switchDetails.loading:
        return this.loadingFunction()
      default:
        return null
    }
  }

  render() {
    const {currentLanguage} = this.state
    return (
      <div className="bg">
        <h1 className="heading">Popular</h1>
        <ul className="unList">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              eachItem={eachItem}
              key={eachItem.id}
              requiredFunction={this.changeState}
              trueOrFalse={currentLanguage === eachItem.id}
            />
          ))}
        </ul>
        {this.switchFunction()}
      </div>
    )
  }
}

export default GithubPopularRepos
