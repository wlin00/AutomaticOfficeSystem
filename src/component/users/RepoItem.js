import React from 'react'
import PropTypes from 'prop-types'



const RepoItem = (repo) => {
    const {name,html_url} = repo.repo
    return (
        <a className="repo_a" href={html_url}>{name}</a>
    )
}

RepoItem.propTypes={
  repo:PropTypes.object.isRequired
}

export default RepoItem
