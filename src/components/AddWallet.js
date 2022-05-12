import React from "react";

class AddWallet extends React.Component {
    state = {
        wallet: "",
    }
    add =(e)=>{
        e.preventDefault();
        if(this.state.wallet===""){alert("Please enter a wallet address");return;}
        console.log(this.state);
        this.props.addwalletHandler(this.state);
        this.setState({wallet:""});
    }
    render() {
        return (
            <div className="ui main">
                <div className="ui container">
                <h2>Add Wallet</h2>
                    <form className="ui form" onSubmit={this.add}>
                        <div className="field">
                            <label>Wallet Address</label>
                            <input type="text" name="Wallet Address" placeholder="Wallet Address" value={this.state.wallet} onChange={(e)=>this.setState({wallet:e.target.value})}/>
                        </div>
                        {/* <div className="field">
                            <label>Limit</label>
                            <input type="text" name="Limit" placeholder="Limit" />
                        </div> */}
                        <button className="ui button blue" >Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

// const AddWallet = () => {
    
//     return (
//         <div className="ui main">
//             <div className="ui container">
//             <h2>Add Wallet</h2>
//                 <form className="ui form">
//                     <div className="field">
//                         <label>Wallet Address</label>
//                         <input type="text" name="Wallet Address" placeholder="Wallet Address" />
//                     </div>
//                     {/* <div className="field">
//                         <label>Limit</label>
//                         <input type="text" name="Limit" placeholder="Limit" />
//                     </div> */}
//                     <button className="ui button blue">Submit</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

export default AddWallet;