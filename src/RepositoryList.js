import {useEffect, useState} from 'react'
import Table from "react-bootstrap/Table";
import RepositoryItem from './RepositoryItem'

import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles/RepositoryList.css'

function RepositoryList(props){

    const [repos, setRepos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState("JacekCzupyt");
    const [errorMessage, setErrorMessage] = useState("");

    const LoadData = () => {
        setIsLoaded(false);
        fetch("https://api.github.com/users/" + username + "/repos")
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error("Request failed with code " + res.status)
            })
            .then(data => setRepos(data))
            .then(() => setIsLoaded(true))
            .then(() => setErrorMessage(""))
            .catch(err => {
                console.error(err);
                setErrorMessage("User not found");
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        LoadData();
    }, [])

    const MakeTable = () => {
        return(
        <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Owner</th>
                <th width="40%">Description</th>
                <th width="20%">Stars</th>
              </tr>
            </thead>
            <tbody>
              {repos
              .sort((r1, r2) => r2.stargazers_count - r1.stargazers_count)
              .map((repo) => <RepositoryItem repo={repo}/>)}
            </tbody>
        </Table>
        );
    }

    return(
        <div>
            {isLoaded ?
            <div>
                <input type="text" name="GithubUser" placeholder="GitHub Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <button onClick={LoadData}>Search</button>
                {errorMessage === "" ? 
                (
                    repos.length > 0 ?
                    //repos.sort((r1, r2) => r2.stargazers_count - r1.stargazers_count).map((repo) => <div><p>{repo.name}</p></div>)
                    MakeTable()
                    :
                    <p>User has not repositories</p>
                )
                :
                <p>{errorMessage}</p>}
            </div>
            :
            "Loading..."
            }
        </div>
    )
}

export default RepositoryList;