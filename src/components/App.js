import './App.css';
import Header from './Header';
import AddWallet from './AddWallet';
import GetNFTs from './GetNFTs';
import React,{useEffect, useState} from 'react';
import { useMoralisWeb3Api } from "react-moralis";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// function App() {
  // const Web3Api = useMoralisWeb3Api();
  // const [nfts,setNfts] = useState([]);
  // const [mywallet,setmyWallet] = useState("");
  // const fetchNFTs = async () => {
  //   const address=mywallet;
  //   const options = {
  //     address: address,
  //   };
  //   console.log("options: ",options);
  //   const ethNFTs = await Web3Api.account.getNFTs(options);
  //   console.log(ethNFTs.result);
  //   setNfts(...nfts ,ethNFTs.result);
  // };
  // const addwalletHandler=(wallet)=>{
  //   console.log(wallet.wallet);
  //   setmyWallet([...mywallet,wallet.wallet]);
  // }
  // useEffect(()=>{
  //   fetchNFTs();
  // },[mywallet]);
//   return (
//     <div className='container'>
//     <Header/>
//     <AddWallet addwalletHandler={addwalletHandler}/>
//     <GetNFTs nfts={nfts}/>
//     </div>
    
//   );
// }

// export default App;


import StepButton from '@mui/material/StepButton';

const steps = ['Add Wallet', 'Get NFts'];
const theme = createTheme();

export default function HorizontalNonLinearStepper() {
  const Web3Api = useMoralisWeb3Api();
  const [nfts,setNfts] = useState([]);
  const [mywallet,setmyWallet] = useState("");
  const fetchNFTs = async () => {
    const address=mywallet;
    const options = {
      address: address,
    };
    console.log("options: ",options);
    const ethNFTs = await Web3Api.account.getNFTs(options);
    console.log(ethNFTs.result);
    setNfts(...nfts ,ethNFTs.result);
  };
  const addwalletHandler=(wallet)=>{
    console.log(wallet.wallet);
    setmyWallet([...mywallet,wallet.wallet]);
  }
  useEffect(()=>{
    fetchNFTs();
  },[mywallet]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddWallet addwalletHandler={addwalletHandler}/>;
      case 1:
        return <GetNFTs nfts={nfts}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            whatfolio.io
          </Typography>
          {/* <FormGroup className='leftFloat'>
            <FormControlLabel
              control={
                <Switch checked={development} onChange={handleChange} name="development" />
              }
              label="Enable Dev API"
            />
          </FormGroup> */}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep} sx={{ pb: 2 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box> */}
          </React.Fragment>
        )}
      </div>
    </Box></Paper></Container>
    </ThemeProvider>
  );
}
