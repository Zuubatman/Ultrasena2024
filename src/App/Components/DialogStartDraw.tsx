import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, Typography } from "@mui/material";

interface Bet {
    id: number,
    name: string,
    cpf: string,
    numbers: (number | undefined) [],
    winner: boolean | undefined
}

export default function DialogStartDraw(props: {open : boolean, betsArr: Bet[], setLuckyNumbers:  React.Dispatch<React.SetStateAction<number[]>> , setDrawStarted: React.Dispatch<React.SetStateAction<boolean>>, setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const setDrawStarted = props.setDrawStarted
    const betsArr = props.betsArr
    const setLuckyNumbers = props.setLuckyNumbers

    function draw(){
        let luckyNumbers: number[] = []
        let winner = false

        let n1 = Math.floor(Math.random() * 50) + 1
        luckyNumbers.push(n1)

        for(let i = 1; i < 5 ; i++){
            let n = Math.floor(Math.random() * 50) + 1
            while(luckyNumbers.includes(n)){
                n = Math.floor(Math.random() * 50) + 1
            }
            luckyNumbers.push(n)
        }

        while(winner === false && luckyNumbers.length <= 30){
            // eslint-disable-next-line no-loop-func
            betsArr.forEach(bet => {
                let cont = 0;
                let numbers = bet.numbers
                numbers.forEach(number => {
                    luckyNumbers.forEach(luckyNumber => {
                        if(number === luckyNumber){
                            cont++
                        }
                        if(cont === 5){
                            bet.winner = true
                            winner = true
                        }
                    })
    
                })
            })
    
            let n = Math.floor(Math.random() * 50) + 1
            while(luckyNumbers.includes(n)){
                n = Math.floor(Math.random() * 50) + 1
            }
            luckyNumbers.push(n)
        }

        betsArr.forEach(bet => {
            if(!bet.winner){
                bet.winner = false
            }
        })

        luckyNumbers.splice(luckyNumbers.length -1, 1)

        setLuckyNumbers(luckyNumbers)
        setOpen(false)
        setDrawStarted(true)
    }


    return ( 
        <Dialog 
            open={open}
            onClose={() => {setOpen(false) }}
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '450px'}}>
                <DialogTitle align="center">Iniciar Sorteio</DialogTitle>
                    <Typography align="center">
                        Finalizar período de apostas e iniciar o sorteio.
                    </Typography>
            </Grid>
            <DialogActions  style={{padding: '20px'}}>
                <Button
                variant="contained"
                size="small"
                onClick={() => {setOpen(false)}}
                >
                Voltar
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => draw()}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}