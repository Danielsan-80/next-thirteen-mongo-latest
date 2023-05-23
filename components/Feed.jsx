'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
        {data.map(post => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  )
}

const Feed = () => {
  const fetchPosts = async()=>{
    const res = await fetch('/api/prompt')
    const data = await res.json()

    setPosts(data)
  }

  useEffect(()=>{
   

    fetchPosts()
  }, [])

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) =>{

  }
  return (
    <section className="feed">
       <form className="relative w-full flex-center ">
        <input type="text"
        className="search_input peer"
        placeholder="search for a tag or username"
        value={searchText}
        onChange={handleSearchChange}
        required/>
       </form>

       <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
       />
    </section>
  )
}

export default Feed