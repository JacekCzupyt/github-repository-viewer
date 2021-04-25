function RepositoryList(props){
    return(
        <tr>
            <td>
                <a href={props.repo.html_url} style={{color: "white"}}>
                    {props.repo.name}
                </a>
            </td>
            <td>{props.repo.owner.login}</td>
            <td>{props.repo.description}</td>
            <td>{props.repo.stargazers_count}</td>
        </tr>
    )
}

export default RepositoryList;