import react, {useEffect, useState} from 'react'


function RepositoryList(props){

    const [repos, setRepos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState("JacekCzupyt");

    const LoadData = () => {
        setIsLoaded(false);
        fetch("https://api.github.com/users/" + username + "/repos")
            .then(res => res.json())
            .then(data => setRepos(data))
            .then(() => setIsLoaded(true))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        LoadData();
    }, [])

    return(
        <div>
            {isLoaded ?
            <div>
                {repos.map((repo) => <div><p>{repo.name}</p></div>)}
            </div>
            :
            "Loading..."
            }
        </div>
    )
}

export default RepositoryList;