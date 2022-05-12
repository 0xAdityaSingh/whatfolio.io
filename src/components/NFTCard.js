import React,{useState,useEffect} from "react";

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const NFTCard = (props) => {
    const {name,token_address,token_uri} = props.nft;
    const [image,setImage] = useState("");
    const [description,setdescription] = useState("Error");
    
    const fetchData = () => {
        fetch(token_uri).then(res => res.json()).then(data => {setImage(data.image);setdescription(data.description)}).catch(err => setImage("https://seeklogo.com/images/O/opensea-logo-7DE9D85D62-seeklogo.com.png"));
        
    }

    function fixURL(newurl){
        
        if(newurl.startsWith("ipfs")){
          return "https://ipfs.moralis.io:2053/ipfs/"+newurl.split("ipfs://").slice(-1)[0];
        }
        else{
          return newurl;
        }

      }
    useEffect(() => {
        fetchData();
    },[])
    return (
        <div className="item">
            
                <div className="content">
                <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={fixURL(image)} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary">
                {description}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
                </div>
            </div>
    );
}

export default NFTCard;    