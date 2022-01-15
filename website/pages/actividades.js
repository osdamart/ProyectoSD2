import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from "../utils/constants";
import Posts from '../components/actividades/posts';
import Pagination from '../components/actividades/pagination';
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import { tokenweb } from "../utils/constants";

const Actividades = (props) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    
    useEffect(()=>{
        const fetchPosts = async () => {
            setLoading(true);
            const url = `${baseUrl}api/v1/activity`;
            const res = await axios.get(url,{
                headers: {
                  'token':tokenweb
                }
              });
            setPosts(res.data.newsReceived);
            setLoading(false);
        }

        fetchPosts(); 
    }, []);

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Layout pageTitle="Actividades">
        <header>
        <Navbar />
        <Banner classNames="banner-actividades" />
        </header>                    
        <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />        
        <Footer />
    </Layout>
    )
}

export default Actividades;