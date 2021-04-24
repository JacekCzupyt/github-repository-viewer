import {useEffect, useState} from 'react'


function RepositoryList(props){

    const [repos, setRepos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState("JacekCzupyt");

    const LoadData = () => {
        console.log(username);
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
                <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <button onClick={LoadData}>Search</button>
                {repos.sort((r1, r2) => r2.stargazers_count - r1.stargazers_count).map((repo) => <div><p>{repo.name}</p></div>)}
            </div>
            :
            "Loading..."
            }
        </div>
    )
}

export default RepositoryList;