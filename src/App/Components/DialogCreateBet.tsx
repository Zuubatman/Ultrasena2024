import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, InputAdornment, TextField } from "@mui/material";
import { AccountCircle, Badge } from "@mui/icons-material";

interface Bet {
    id: number,
    name: string,
    cpf: string,
    numbers: (number | undefined) [],
    winner: boolean | undefined
}


export default function DialogCreateBet(props: {open : boolean, addId: () => void,  addBet:  (newBet: Bet) => void , id: number , setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const id = props.id
    const addBet = props.addBet
    const setOpen = props.setOpen
    const addId = props.addId
    
    const [name, setName] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')

    const [n1 , setN1] = useState<number>()
    const [n2 , setN2] = useState<number>()
    const [n3 , setN3] = useState<number>()
    const [n4 , setN4] = useState<number>()
    const [n5 , setN5] = useState<number>()

    const [error, setError] = useState<boolean>(true)

    useEffect(()=>{
        let numbers = [n1,n2,n3,n4,n5]
        setError(verifyBet(numbers))
        
    },[n1,n2,n3,n4,n5, error])

    
    function verifyBet (numbers: (number | undefined)[]){
        for(let i= 0 ; i < numbers.length; i++) {
            if(numbers[i] === -1 || numbers[i] === undefined){
                return true
            }
        }
        return false
    }

    function surpresa(){
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

        console.log(randomNumbers)

         let bet: Bet = {
            id: id,
            name: name,
            cpf: cpf,
            numbers: [randomNumbers[0],randomNumbers[1],randomNumbers[2],randomNumbers[3],randomNumbers[4]],
            winner: undefined
        }

        console.log(bet)

        addBet(bet)
        addId()
        handleClose()
    }

    function createBet(){ 
        let bet: Bet = {
            id: id,
            name: name,
            cpf: cpf,
            numbers: [n1,n2,n3,n4,n5],
            winner: undefined
        }

        addBet(bet)
        addId()
        handleClose();
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
        setError(true)
    }

    return ( 
        <Dialog 
            open={open}
            onClose={() => { handleClose()} }
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={3} style={{padding: '40px', width: '500px'}}>
                <DialogTitle align="center">Fazer aposta</DialogTitle>
                    <TextField 
                    label="Nome"
                    placeholder="Nome"
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
                        error = {false}
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
                    <DialogTitle align="center">Insira os números que deseja apostar:</DialogTitle>
                    <Grid item xs ={1} container direction={'row'} gap = {1} justifyContent={'center'}>
                        <TextField 
                            variant="filled" 
                            size ={'small'} 
                            style={{width: '50px'}}
                            error= {n1 ? n1 < 0 || n1 > 50 ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN1(number);
                                } else {
                                    setN1(-1)
                                    setError(true)
                                }
                            }}>
                        </TextField>
                        <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n2 ? n2 < 0 || n2 > 50 ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN2(number);
                                } else {
                                    setN2(-1)
                                    setError(true)
                                }
                            }}>
                          </TextField>
                          <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n3 ? n3 < 0 || n3 > 50 ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN3(number);
                                } else {
                                    setN3(-1)
                                    setError(true)
                                }
                            }}>
                          </TextField>
                          <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n4 ? n4 < 0 || n4 > 50 ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number ) && number > 0 && number <= 50){
                                    setN4(number);
                                } else {
                                    setN4(-1)
                                    setError(true)
                                }
                            }}>
                          </TextField>
                          <TextField 
                            variant="filled"
                            size ={'small'}
                            style={{width: '50px'}}
                            error= {n5 ? n5 < 0 || n5 > 50 ? true : false : false}
                            onChange={(evt) => {
                                let number = Number(evt.target.value)
                                if(!isNaN(number) && number > 0 && number <= 50){
                                    setN5(number);
                                } else {
                                    setN5(-1)
                                    setError(true)
                                }
                            }}>
                          </TextField>
                    </Grid>
            </Grid>
            <DialogActions style={{padding: '20px'}}>
                <Grid container justifyContent={'flex-start'}>
                    <Button 
                        size = 'small'
                        variant="contained"
                        disabled = { cpf === '' || name === ''}
                        onClick = {() => surpresa()}
                        >
                        Surpresa
                    </Button>
                </Grid>
                <Grid>
                    <Button 
                        size = 'small'
                        variant="contained"
                        disabled = {error || cpf === '' || name === ''}
                        onClick={()=>{ createBet() }}
                        >
                        Apostar
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}