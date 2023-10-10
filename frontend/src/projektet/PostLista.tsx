import React, { useState } from 'react';
import { Paper, InputBase, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PostLista = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);



  const collectData = async () => {
    console.log(posts, newPost);
    
    // Create an object with the desired structure
    const dataToSend = {
      input: newPost,
      content: posts, // Assuming you want to send all posts
    };

    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    // console.log(result);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      if (editIndex === -1) {
        setPosts([...posts, newPost]);
      } else {
        const updatedPosts = [...posts];
        updatedPosts[editIndex] = newPost;
        setPosts(updatedPosts);
        setEditIndex(-1);
      }
      setNewPost('');
      collectData(); // Call collectData to log the data after adding a new post
    }
  };

  const handleEditPost = (index: number) => {
    setNewPost(posts[index]);
    setEditIndex(index);
  };

  const handleDeletePost = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
    collectData(); // Call collectData to log the data after deleting a post
  };

  return (
    <div style={{ backgroundColor: '#1C6758', minHeight: '100vh', padding: '20px' }}>
      <Paper elevation={20} className='paper' sx={{ backgroundColor: '#FF9F29', borderRadius: '30px' }}>
        <Typography textAlign='center'>Posts List</Typography>

        <form action="/" method="POST">
          <InputBase id='input' sx={{ color: 'white' }} className='input95'
            placeholder="Enter a post"
            value={newPost}
            onChange={handleInputChange}
            endAdornment={
              <Button
                onClick={handleAddPost}
                className='butoni95' sx={{ backgroundColor: '#1C6758', borderRadius: '30px', color: 'white' }} >
                Add
              </Button>
            }
          />
        </form>

        

        <List className='lista95' sx={{ marginLeft: '40px ', marginTop: '3px' }}>
          {posts.map((post, index) => (
            <ListItem sx={{ border: '1px solid', borderRadius: '30px', margin: '5px' }} key={index}>
              <ListItemText primary={post} />
              <ListItemSecondaryAction>
                <Button onClick={() => handleEditPost(index)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeletePost(index)}>
                  <DeleteIcon />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        
      </Paper>
      <footer style={{textAlign:"center"}}>©Ardit Bakalli</footer>
    </div>
  );
}

export default PostLista;
