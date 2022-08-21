import { useState } from "react"
import styles from './blog.module.css'

const Blog = ({blog}) => {
  const [expand, setExpand] = useState(false) 
  
  const toggleExpand = () => {
    setExpand(!expand)
  }

  return <div className={styles.blog} >
    
    <label>
      <strong>{`${blog.title} - ${blog.author}`}</strong>&nbsp;
      <button onClick={toggleExpand} >{expand ? 'hide' : 'view'}</button>
    </label>
    
    {expand &&
      <div>
        {blog.url}<br/>
        {`${blog.likes} likes`}<br/>
        {blog.user.name}
      </div>
    }
  </div>
}

export default Blog