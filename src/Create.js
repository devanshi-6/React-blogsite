import {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body , setBody] = useState('');
    const [Author, setAuthor] = useState('');
    const [isPending , setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = {title , body, Author};
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method:'POST',
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("new blog added");
            setIsPending(false);
            history.push('/');
        })
    }
    return ( 
        <div className="create"> 
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label > Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange= {(e) => setTitle(e.target.value) }
                />
                <label > Blog body:</label>
                <textarea 
                    
                    required
                    value={body}
                    onChange= {(e) => setBody(e.target.value) }
                ></textarea>
                <label > Blog author:</label>
                <select
                    value={Author}
                    onChange = {(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
                {isPending && <button>Adding Blog...</button>}
                {!isPending && <button>Add Blog</button>}
                

            </form>
            
        </div>
     );
}
 
export default Create;