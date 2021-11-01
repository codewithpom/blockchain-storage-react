// import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
function Upload() {
    // add a state for the cid of the file
    const [cid, setCid] = useState('');
    // add a state for the file name
    const [fileName, setFileName] = useState('');
    // add a state for the file size
    const [fileSize, setFileSize] = useState('');
    // add a state for the file type
    const [fileType, setFileType] = useState('');


    // add a state for loading icon while the file is being uploaded
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // add an event listener to form submit which has an id for form
        document.getElementById("form")!.addEventListener("submit", (e) => {
            const input = document.getElementById("file")! as HTMLInputElement;
            // set file name
            setFileName(input!.files![0].name);
            // set file size
            setFileSize(String(input!.files![0].size));
            // set file type
            setFileType(input!.files![0].type);

            // add loading state as true
            setLoading(true);
            // prevent default form submit
            e.preventDefault();
            // add input tag as a variable

            // get the file from the input
            const file = input.files![0];
            // create a form data object
            const formData = new FormData();
            // append the file to the form data object
            formData.append("file", file);
            // create an XMLHttpRequest object
            const xhr = new XMLHttpRequest();
            // open the request
            xhr.open("POST", process.env.REACT_APP_API_URL + "/upload", true);
            // set the request header
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // send the request
            xhr.send(formData);
            // listen for the request response
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    // set the cid to the response text
                    setCid(xhr.responseText);
                    // set the loading to false
                    setLoading(false);
                }
            };
        });
    }, []);




    return (
        <div className="container">

            <div className="text-center">
                <h1>
                    Upload your files
                </h1>
                {/* create a file upload form so that the user can upload files and use fetch to upload them to the server */}
                <form id="form">
                    <div className="form-group">
                        <label htmlFor="file">Upload your file here</label>
                        <br />
                        <br />
                        <input type="file" className="form-control-file" id="file" name="file" />

                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    {/* add a loading icon if the file is being uploaded or else add the cid */}
                    {loading ? <div className="spinner-border text-primary" role="status">

                    </div> : <div>
                        <h3>
                            Your File has been uploaded
                        </h3>
                        <h5>
                            You can always preview your file by clicking on the link below

                        </h5>
                        <a href={`https://infura-ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">
                            {fileName}

                        </a>
                        <br />
                        <br />
                        <h4>
                            Below is some information about the file
                        </h4>
                        <br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">File Name</th>
                                    <th scope="col">File Size</th>
                                    <th scope="col">File Type</th>
                                    <th scope="col">CID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fileName}</td>
                                    <td>{fileSize}</td>
                                    <td>{fileType}</td>
                                    <td>
                                        <p style={{ wordWrap: "break-word" }}>
                                            {cid}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>



                    </div>}


                </div>

            </div>
        </div>
    );
}

export default Upload;
