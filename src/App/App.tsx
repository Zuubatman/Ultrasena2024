import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import DialogCreateBet from './Components/DialogCreateBet';
import DialogListBets from './Components/DialogListBets'
import DialogStartDraw from './Components/DialogStartDraw'
import DialogResults from './Components/DialogResults'
import DialogStartBetting from './Components/DialogStartBetting';
import DialogPrize from './Components/DialogPrize';
import { Copyright } from '@mui/icons-material';

interface Bet {
  id: number,
  name: string,
  cpf: string,
  numbers: (number | undefined) [],
  winner: boolean | undefined
}

function App() {
  const [openCreateBet , setOpenCreateBet] = useState<boolean>(false)
  const [openListBets , setOpenListBets] = useState<boolean>(false)

  const [openStartDraw, setOpenStartDraw] = useState<boolean>(false)
  const [drawStarted, setDrawStarted] = useState<boolean>(false)

  const [openStartBetting, setOpenStartBetting] = useState<boolean>(false)
  const [startBetting, setStartBetting] = useState<boolean>(false)

  const [openResults, setOpenResults] = useState<boolean>(false)

  const [betsArray, setBetsArray] = useState<Bet[]>([])
  const [id, setId] = useState<number>(1000)

  const [openPrize, setOpenPrize] = useState<boolean>(false)

  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([])

  const [claimedReward, setClaimedReward] = useState<boolean>(false)

  const winnerBets: Bet[] = betsArray.filter(bets => bets.winner === true)

  function handleMenuOption(option: number){
    switch(option){
      case 1: 
        setOpenStartBetting(true)
        break;
      case 2: 
        setOpenCreateBet(true)
        break;
      case 3: 
        setOpenListBets(true)
        break;
      case 4: 
        setOpenStartDraw(true)
        break;
      case 5: 
        setOpenResults(true)
        break;
      case 6: 
        setOpenPrize(true)
        break;
  
      default:
        console.log('Erro ao selecionar opção.')
    }
  
  }

  const handleAddBet = (newBet: Bet) => {
    setBetsArray([...betsArray, newBet]);
  };

  const handleAddId = () => {
    let newId = id + 1
    setId(newId)
  }

  const resetInfo = () => {
    setBetsArray([])
    setId(1000)
    setLuckyNumbers([])
    setStartBetting(true)
    setDrawStarted(false)
    setClaimedReward(false)
  }
  
  return (
      <Grid container style={{ height: '100vh' }} direction = {'column'} justifyContent={'center'} alignItems={'center'} gap={4}>
        <DialogCreateBet 
          open = {openCreateBet}
          id = {id}
          setOpen = {setOpenCreateBet}
          addBet = {handleAddBet}
          addId = {handleAddId}
          betsArray={betsArray}
        />
        <DialogListBets 
          open ={openListBets} 
          setOpen={setOpenListBets}
          betsArray={betsArray}
        />
        <DialogStartDraw
          open ={openStartDraw} 
          setOpen={setOpenStartDraw}
          setDrawStarted = {setDrawStarted}
          betsArr={betsArray}
          setLuckyNumbers = {setLuckyNumbers}
        />
        <DialogResults
          open={openResults}
          setOpen={setOpenResults}
          betsArray={betsArray}
          luckyNumbers={luckyNumbers}
        />
        <DialogStartBetting
          open={openStartBetting}
          setOpen={setOpenStartBetting}
          resetInfo={resetInfo}
        />
        <DialogPrize
          open={openPrize}
          setOpen={setOpenPrize}
          rounds = {luckyNumbers.length -4}
          setClaimedReward = {setClaimedReward}
        />

          <Grid item style={{width: '30%'}} justifyContent={'center'} alignItems={'center'}>
            <Typography  variant="h2" color="primary" align="center">
              <strong>UltraSena 2024</strong>
            </Typography>
          </Grid>
          <Grid item container style={{width: '20%'}} direction = {'column'}>
            <Grid container direction = {'column'} gap = {2}>
            <Button variant='contained' onClick={()=> handleMenuOption(1)}>Iniciar</Button>
            <Button variant='contained' disabled = {!startBetting || drawStarted} onClick={()=> handleMenuOption(2)}>Registrar nova Aposta</Button>
            <Button variant='contained' disabled = {!startBetting || betsArray.length < 1} onClick={()=> handleMenuOption(3)}>Lista de Apostas</Button>
            <Button variant='contained' disabled = {!startBetting || drawStarted || betsArray.length < 1} onClick={()=> handleMenuOption(4)}>Finalizar apostas e executar o sorteio</Button>
            <Button variant='contained' disabled = {!startBetting || betsArray.length < 1 || !drawStarted} onClick={()=> handleMenuOption(5)}>Fim da apuração</Button>
            <Button variant='contained' disabled = {!startBetting || winnerBets.length < 1 || !drawStarted || claimedReward} onClick={()=> handleMenuOption(6)}>Premiação</Button>
            </Grid>
          </Grid>
          <Typography variant='subtitle2' align='center' alignItems={'center'}>
            João Vitor Morandi Inc. <Copyright style={{height: '15px'}}></Copyright>
          </Typography>
      </Grid>
  )
}


export default App;
