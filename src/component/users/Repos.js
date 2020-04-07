import React from 'react'
import  RepoItem  from "../users/RepoItem";

const Repos = ({repos}) => {
    return (
          repos.map(repo =>(
              <RepoItem key={repo.id} repo={repo} />
          ))
    )
}

export default Repos
