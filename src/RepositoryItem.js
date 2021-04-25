function RepositoryList(props){
    return(
        <tr>
            <td>{props.repo.name}</td>
            <td>{props.repo.owner.login}</td>
            <td>{props.repo.description}</td>
            <td>{props.repo.stargazers_count}</td>
        </tr>
    )
}

export default RepositoryList;