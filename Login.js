import React, {useState} from 'react';
import {Paper, TextField, Button, Typography, Container, Grid} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {useNavigate} from 'react-router-dom';
import { setUserNameSession} from '../Utilities/User';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setUserNameSession(username);
    console.log('Username:', username);
    console.log('Password:', password);
    navigate('/');
  };

  return (
    <Container component="main" > 
      <Paper elevation={3} sx={{ padding: '16px', marginTop: '220px',width:'40%',marginLeft:'320px',height: '432px',borderRadius:'15px'}}>
        <Typography variant="h5" sx={{display:'flex',justifyContent:'center',marginTop:'20px',fontWeight:'bold',color:'#005000',fontSize:'40px'}}>
          Login 
        </Typography>
        <form>
          <Grid container spacing={2} alignItems="center" justifyContent="center" marginTop="10px">
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                variant="standard"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{style:{color:'#005000'}}}
              />
            </Grid>
            <Grid item xs={12} marginTop="10px">
              <TextField
                label="Password"
                fullWidth
                variant="standard"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{display:'flex', justifyContent:'center',marginTop:'35px'}}>
              <Button
                onClick={handleLogin}
                variant="contained"
                color="primary"
                size='large'
                sx={{fontWeight: 'bold',background:'#005000'}}
              >
                Login
              </Button>
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', marginTop: '38px'}}>
              <hr
                style={{
                  width: '100%',
                  margin: '0 auto',
                  borderTop: '1px solid #005000',
                }}
              />
            </Grid>
  <Grid item xs={12} sx={{display:'flex', justifyContent:'center',marginTop:'-10px'}}>
    <a href="https://www.facebook.com/schwingstetterindia">
    <FacebookIcon sx={{ fontSize: '2.2rem', marginRight: '35px',color:'#005000' }}/></a>
    <a href="https://twitter.com/SchwingIndia">
    <TwitterIcon sx={{ fontSize: '2rem', marginRight: '35px',color:'#005000' }}/></a>
    <a href="https://www.instagram.com/schwingstetterindia/">
    <InstagramIcon sx={{ fontSize: '2.2rem', marginRight: '35px',color:'#005000' }}/></a>
    <a href="https://www.youtube.com/channel/UC0MRzuWQxflqda6Bvnybsag">
    <YouTubeIcon sx={{ fontSize: '2.2rem', marginRight: '35px',color:'#005000' }}/></a>
    <a href="https://www.linkedin.com/company/schwingstetterindia">
    <LinkedInIcon sx={{ fontSize: '2.2rem',color:'#005000' }}/></a>
  </Grid>
  </Grid>
        </form>
      </Paper>
    </Container>

  );
};
export default Login;