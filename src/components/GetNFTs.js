import React from "react";
import NFTCard from "./NFTCard";
import List from '@mui/material/List';

const GetNFTs = (props) => {
    console.log("Props:",props.nfts);

    const rendernftlist=props && props.nfts.length > 0? 
    props.nfts.map((nft)=>{
        return(
            // <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
            <NFTCard nft={nft}></NFTCard>
            // </List>
        );
    }): <span></span>;

    return (
        <div className="ui celled list container">
            {rendernftlist}
        </div>
        )
}

export default GetNFTs;