import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import DialogCreateBet from './Components/DialogCreateBet';
import DialogListBets from './Components/DialogListBets'
import DialogStartDraw from './Components/DialogStartDraw'
import DialogResults from './Components/DialogResults'

interface Bet {
  id: number,
  name: string,
  cpf: string,
  numbers: (number | undefined) [],
  winner: boolean | undefined
}

function App() {
  const [start, setStart] = useState<boolean>(false)

  const [openCreateBet , setOpenCreateBet] = useState<boolean>(false)
  const [openListBets , setOpenListBets] = useState<boolean>(false)

  const [openStartDraw, setOpenStartDraw] = useState<boolean>(false)
  const [drawStarted, setDrawStarted] = useState<boolean>(false)

  const [openResults, setOpenResults] = useState<boolean>(false)

  const [betsArray, setBetsArray] = useState<Bet[]>([])
  const [id, setId] = useState<number>(1000)

  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([])

  function handleMenuOption(option: number){
    switch(option){
      case 1: 
        setStart(true)
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
  
      default:
        console.log('Erro ao selecionar opção.')
    }
  
  }

  useEffect(() => {
    console.log(betsArray)
    console.log('luckyNuymbers' , luckyNumbers)
  },[betsArray, luckyNumbers])

  const handleAddBet = (newBet: Bet) => {
    setBetsArray([...betsArray, newBet]);
  };

  const handleAddId = () => {
    let newId = id + 1
    setId(newId)
  }
  
  return (
      <Grid container style={{ height: '100vh' }} direction = {'column'} justifyContent={'center'} alignItems={'center'} gap={4}>
        <DialogCreateBet 
          open = {openCreateBet}
          id = {id}
          setOpen = {setOpenCreateBet}
          addBet = {handleAddBet}
          addId = {handleAddId}
        >
        </DialogCreateBet>
        <DialogListBets 
          open ={openListBets} 
          setOpen={setOpenListBets}
          betsArray={betsArray}
        >
        </DialogListBets>
        <DialogStartDraw
          open ={openStartDraw} 
          setOpen={setOpenStartDraw}
          setDrawStarted = {setDrawStarted}
          betsArr={betsArray}
          setLuckyNumbers = {setLuckyNumbers}
        >
        </DialogStartDraw>
        <DialogResults
        open={openResults}
        setOpen={setOpenResults}
        betsArray={betsArray}
        luckyNumbers={luckyNumbers}
        >
        </DialogResults>

          <Grid item style={{width: '30%'}} justifyContent={'center'} alignItems={'center'}>
            <Typography  variant="h2" color="primary" align="center">
              UltraSena 2024
            </Typography>
          </Grid>
          <Grid item container style={{width: '20%'}} direction = {'column'}>
            <Grid container direction = {'column'} gap = {2}>
            <Button variant='contained' onClick={()=> handleMenuOption(1)}>Iniciar</Button>
            <Button variant='contained' disabled = {!start || drawStarted} onClick={()=> handleMenuOption(2)}>Registrar nova Aposta</Button>
            <Button variant='contained' disabled = {!start || betsArray.length < 1} onClick={()=> handleMenuOption(3)}>Lista de Apostas</Button>
            <Button variant='contained' disabled = {!start || drawStarted || betsArray.length < 1} onClick={()=> handleMenuOption(4)}>Finalizar apostas e executar o sorteio</Button>
            <Button variant='contained' disabled = {!start || betsArray.length < 1 || !drawStarted} onClick={()=> handleMenuOption(5)}>Fim da apuração</Button>
            </Grid>
          </Grid>
      </Grid>
  );
}


export default App;
