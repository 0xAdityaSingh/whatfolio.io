import React from "react";
import NFTCard from "./NFTCard";
import List from '@mui/material/List';

const GetNFTs = (props) => {
    console.log(props);

    const rendernftlist=props.nfts.map((nft)=>{
        return(
            <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
            <NFTCard nft={nft}></NFTCard></List>
        );
    });

    return (
        <div className="ui celled list container">
            {rendernftlist}
        </div>
        )
}

export default GetNFTs;