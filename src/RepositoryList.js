import {useEffect, useState} from 'react'
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import RepositoryItem from './RepositoryItem'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap'

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
            <div>
                <Form className="m-1" onSubmit={(e) => {e.preventDefault(); LoadData();}}>
                    <Form.Row>
                        <Col xs="auto">
                            <Form.Control type="text" name="GithubUser" placeholder="GitHub Username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        </Col>
                        <Col xs="auto">
                            <Button variant="dark" type="input">Search</Button>
                        </Col>
                        
                    </Form.Row> 
                </Form>

                {isLoaded ?
                
                (errorMessage === "" ? 
                (
                    repos.length > 0 ?
                    MakeTable()
                    :
                    <p>User has no repositories</p>
                )
                :
                <p>{errorMessage}</p>)
                :
                "Loading..."
                }
            </div>
        </div>
    )
}

export default RepositoryList;