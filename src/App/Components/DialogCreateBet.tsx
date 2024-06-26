import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { AccountCircle, Badge } from "@mui/icons-material";
import DialogRepeatedCpf from "./DialogRepeatedCpf";

interface Bet {
    id: number,
    name: string,
    cpf: string,
    numbers: (number | undefined) [],
    winner: boolean | undefined
}

export default function DialogCreateBet(props: {open : boolean, addId: () => void, betsArray:Bet[],  addBet:  (newBet: Bet) => void , id: number , setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const id = props.id
    const addBet = props.addBet
    const setOpen = props.setOpen
    const addId = props.addId
    const betsArray = props.betsArray
    
    const [name, setName] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')

    const [n1 , setN1] = useState<number>()
    const [n2 , setN2] = useState<number>()
    const [n3 , setN3] = useState<number>()
    const [n4 , setN4] = useState<number>()
    const [n5 , setN5] = useState<number>()

    const [invalidNumbers, setInvalidNumbers] = useState<boolean>(true)
    const [cpfError, setCpfError] = useState<boolean>(false)

    const [repeatedCpf, setRepeatedCpf] = useState<boolean>(false)
    const [repeatedNumbers , setRepetedNumbers] = useState<(number | undefined)[]>([])

    function verifyRepeatedNumbers(numbers: (number | undefined)[]){
        let repeatedNumbersAux: (number| undefined)[] = []
        for(let i= 0 ; i < numbers.length; i++) {
            let numberAux = numbers.filter(number => number === numbers[i])
            if(numberAux.length > 1 ) {
                repeatedNumbersAux.push(numberAux[0])
            }
        }
        setRepetedNumbers(repeatedNumbersAux)
    }

    function verifyInvalidNumbers (numbers: (number | undefined)[]){
        for(let i= 0 ; i < numbers.length; i++) {
            if(numbers[i] === -1 || numbers[i] === undefined){
                setInvalidNumbers(true)
                return
            }
        }
        setInvalidNumbers(false)
    }
    
    function verifyDifferentNameSameCpf(){
        let bet = betsArray.find(bet => bet.cpf === cpf)
        if(bet && bet.name.toUpperCase().trim() !== name.toUpperCase().trim()){
            setRepeatedCpf(true)
            return true
        }
        setRepeatedCpf(false)
        return false
    }
    
    function surpresa(){
        let errorCpf = verifyDifferentNameSameCpf()
        if(!errorCpf){
            let randomNumbers = []
            
            let n1 = Math.floor(Math.random() * 50) + 1
            randomNumbers.push(n1)
    
            for(let i = 1; i < 5 ; i++){
                let n = Math.floor(Math.random() * 50) + 1
                while(randomNumbers.includes(n)){
                    n = Math.floor(Math.random() * 50) + 1
                }
                randomNumbers.push(n)
            }
    
            let bet: Bet = {
                id: id,
                name: name.trim(),
                cpf: cpf,
                numbers: [randomNumbers[0],randomNumbers[1],randomNumbers[2],randomNumbers[3],randomNumbers[4]],
                winner: undefined
            }
    
            addBet(bet)
            addId()
            handleClose()
        }
    }

    function createBet(){ 
        let errorCpf = verifyDifferentNameSameCpf()
        if(!errorCpf){
            let bet: Bet = {
                id: id,
                name: name.trim(),
                cpf: cpf,
                numbers: [n1,n2,n3,n4,n5],
                winner: undefined
            }
            addBet(bet)
            addId()
            handleClose();
        }
    }

    function handleClose(){
        setOpen(false)
        setN1(undefined)
        setN2(undefined)
        setN3(undefined)
        setN4(undefined)
        setN5(undefined)
        setCpf('')
        setName('')
        setCpfError(false)
        setInvalidNumbers(true)
        setRepeatedCpf(false)
    }
    
    useEffect(()=>{
        function verifyCpf(){
            if(cpf !== undefined) {
                let cpfArr = cpf.split('')
                for(let i = 0; i < cpfArr.length; i++){
                    if(isNaN(Number(cpfArr[i])) || cpfArr.length > 11){
                        setCpfError(true)
                        break;
                    }  else {
                        setCpfError(false)
                    } 
                }
            }
        }
        verifyCpf()
    }, [cpf])

    useEffect(()=>{
        let numbers = [n1,n2,n3,n4,n5]
        verifyInvalidNumbers(numbers)
        verifyRepeatedNumbers(numbers)
        
    },[n1,n2,n3,n4,n5])
    
    return ( 
        <Dialog 
            open={open}
            onClose={() => { handleClose()} }
            >
            <DialogRepeatedCpf 
                open={repeatedCpf} 
                setOpen={setRepeatedCpf}
            />
            <Grid container direction={'column'} justifyContent={'center'} gap ={3} style={{padding: '30px', width: '500px'}}>
                <DialogTitle align="center">Fazer Aposta</DialogTitle>
                    <TextField 
                    label="Nome Completo"
                    placeholder="Nome Completo"
                    variant="outlined"
                    required 
                    error = {false}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                        ),
                    }}
                    onChange={(evt) => {
                        setName(evt.target.value);
                    }}
                    >
                    </TextField>
                        <TextField 
                        label="CPF"
                        placeholder="CPF"
                        variant="outlined"
                        required 
                        error = {cpfError}
                        helperText = {cpfError ? 'Insira o número de CPF corretamente.' : ' '}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Badge />
                            </InputAdornment>
                            ),
                        }}
                        onChange={(evt) => {
                            setCpf(evt.target.value);
                        }}
                        >
                    </TextField>
                    <DialogTitle align="center">Insira os números entre 1 e 50 que deseja apostar:</DialogTitle>
                    <Grid item xs ={1} container direction={'row'} gap = {1} justifyContent={'center'}>
                        <TextField 
                            variant="filled" 
                            size ={'small'} 
                            style={{width: '50px'}}
                            error= {n1 ? n1 < 0 || n1 > 50 || repeatedNumbers.includes(n1) ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN1(number);
                                } else {
                                    setN1(-1)
                                }
                            }}>
                        </TextField>
                        <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n2 ? n2 < 0 || n2 > 50 || repeatedNumbers.includes(n2) ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN2(number);
                                } else {
                                    setN2(-1)
                                }
                            }}>
                          </TextField>
                          <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n3 ? n3 < 0 || n3 > 50 || repeatedNumbers.includes(n3) ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN3(number);
                                } else {
                                    setN3(-1)
                                }
                            }}>
                          </TextField>
                          <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n4 ? n4 < 0 || n4 > 50 || repeatedNumbers.includes(n4) ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number ) && number > 0 && number <= 50){
                                    setN4(number);
                                } else {
                                    setN4(-1)
                                }
                            }}>
                          </TextField>
                          <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n5 ? n5 < 0 || n5 > 50 || repeatedNumbers.includes(n5) ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN5(number);
                                } else {
                                    setN5(-1)
                                }
                            }}>
                          </TextField>
                    </Grid>
            </Grid>
            <Grid>
                <Typography color={'red'} align="center">
                    {(repeatedNumbers[0] !== undefined && repeatedNumbers.length > 1) 
                    || n1 === -1 || n2 === -1 || n3 === -1 || n4 === -1 || n5 === -1 ? 'Número inválido' : " ‎ " }
                </Typography>
            </Grid>
            <DialogActions style={{padding: '20px'}}>
                <Grid container justifyContent={'flex-start'}>
                    <Button 
                        size = 'small'
                        variant="contained"
                        disabled = { name === ''  || cpfError ||  cpf.length < 11}
                        onClick = {() => surpresa()}
                        >
                        Surpresa
                    </Button>
                </Grid>
                <Grid>
                     <Button 
                        size = 'small'
                        variant="contained"
                        onClick={()=>{ handleClose() }}
                        >
                        Voltar
                    </Button>
                </Grid> 
                    <Grid>
                        <Tooltip title={invalidNumbers || cpf.length < 11 || cpfError ||  name === '' ? 'Preencha todos os campos para continuar.' : ''}>
                            <span>
                                <Button 
                                    size = 'small'
                                    variant="contained"
                                    disabled = {invalidNumbers || repeatedNumbers.length > 1 ||  name === '' || cpfError || cpf.length !== 11}
                                    onClick={()=>{ createBet() }}
                                    >
                                    Apostar
                                </Button>
                            </span>
                        </Tooltip>
                    </Grid>
            </DialogActions>
        </Dialog>
    )
}