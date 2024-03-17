import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {  Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";


interface Bet {
    id: number,
    name: string,
    cpf: string,
    numbers: (number | undefined) [],
    winner: boolean | undefined
}

interface NumberInfo {
    number: number | undefined,
    quant: number
}

export default function DialogCreateBet(props: {open : boolean, betsArray: Bet[], luckyNumbers: number[], setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const betsArr = props.betsArray
    const luckyNumbers = props.luckyNumbers

    const winnerBets: Bet[] = betsArr.filter(bets => bets.winner === true)
    const [numbersInfo , setNumbersInfo] = useState<NumberInfo[]>([])

    const sortedWinners = winnerBets.sort(sortWinners)
    const sortedNumbers = numbersInfo.sort(sortNumbers)

    function mostBetNumbers (){
        let betNumbers: (number|undefined)[] = []
        let numberInfo: NumberInfo[] = []

        betsArr.forEach(bet => {
            bet.numbers.forEach(num => {
                if(!betNumbers.includes(num)){
                    betNumbers.push(num)

                    let betNumber: NumberInfo = {
                        number: num,
                        quant: 1
                    }

                    numberInfo.push(betNumber)
                } else {
                    let betNumber = numberInfo.find(numberInfo => numberInfo.number === num)
                    if(betNumber){
                        betNumber.quant = betNumber.quant + 1
                    }
                }
            })
        })

        setNumbersInfo(numberInfo)
    }

    function sortWinners(bet1: Bet, bet2: Bet ){
        if(bet1.name > bet2.name){
            return 1
        } else if(bet2.name > bet1.name){
            return -1
        } else {
            return 0 
        }
    }

    function sortNumbers(n1: NumberInfo, n2: NumberInfo){
        if(n1.quant > n2.quant){
            return -1
        } else if(n2.quant > n1.quant){
            return 1
        } else {
            return 0 
        }
    }

    useEffect(()=> {
        mostBetNumbers()
    },[luckyNumbers, betsArr])

    useEffect(()=>{
        console.log(sortedWinners)
    }, [sortedWinners])

    return ( 
        <Dialog 
            open={open}
            onClose={() => setOpen(false) }
            style={{width: '1000px', height: '800px' , margin: 'auto'}}
            >
            <Grid container item xs={12} direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '800px'}}>
                <DialogTitle align="center">Resultados:</DialogTitle>
                <Typography align="center">
                    Números Sorteados:

                    {luckyNumbers.map(number => {
                        return (
                            ` ${number} `
                        )
                    })}
                </Typography>
                <Typography align="center">
                    Rodadas: {luckyNumbers.length - 4}
                </Typography>
                <Typography align="center">
                    Quant. Apostas Vencedoras: {winnerBets.length}
                </Typography>
                {
                    winnerBets.length < 1 ? 

                    <Typography align="center">
                            Nenhuma aposta vencedora.
                    </Typography>

                    :
                    <>
                    <DialogTitle align="center">Vencedores:</DialogTitle>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">CPF</TableCell>
                                <TableCell align="center">Números</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                    sortedWinners.map(bet => {
                                        return (
                                            <TableRow key={bet.id}>
                                                <TableCell align="center">
                                                    {bet.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {bet.id}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {bet.cpf}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {bet.numbers.map(number =>{
                                                        return (
                                                            ` ${number} `
                                                        )
                                                    })}
                                                </TableCell>
                                                <TableCell align="center" color={bet.winner ? bet.winner === true ? "green" : "red" : ''}>
                                                    {bet.winner ? bet.winner === true ? 'Vencedor' : 'Perdedor' : 'Pendente'}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                
                                }

                        </TableBody>
                    </Table>

                    <DialogTitle align="center">Números Apostados:</DialogTitle>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Número Apostado</TableCell>
                                <TableCell align="center">Quantidade de Apostas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                    sortedNumbers.map(number => {
                                        return (
                                            <TableRow key={number.number}>
                                                <TableCell align="center">
                                                    {number.number}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {number.quant}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                
                                }

                        </TableBody>
                    </Table>
                    </>
                }
            </Grid>
            
        </Dialog>
    )
}