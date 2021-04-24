import react, {useEffect, useState} from 'react'


function RepositoryList(props){

    const [repos, setRepos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState("JacekCzupyt");

    return(
        <div>
            {isLoaded ?
            <div>Loaded</div>
            :
            "Loading..."
            }
        </div>
    )
}

export default RepositoryList;