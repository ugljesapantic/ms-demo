import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import http from '../../utils/http';
import { Post } from '../../components/Post';


export const PostDetails = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const post = await http('getPost', 'GET', {id});
            setPost(post);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    return (
        <React.Fragment>
            {loading ? <div>Loading...</div> : <Post post={post} details/>} 
        </React.Fragment>
    )
}
