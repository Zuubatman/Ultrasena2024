import React, { useEffect, useState } from "react";
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

export default function DialogPrize(props: {open : boolean, winnerBets: Bet[] , rounds: number, setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const winnerBets = props.winnerBets
    const rounds = props.rounds

    const [multiplyer, setMultiplyer] = useState<number>(1)

    function calculateMultiplyer(){
        if(rounds === 1){
            setMultiplyer(25)
        }
        else if(rounds < 4){
            setMultiplyer(10)
        }
        else if(rounds < 10){
            setMultiplyer(5)
        }
        else if(rounds < 20){
            setMultiplyer(2)
        }
    }

    useEffect(()=> {
        calculateMultiplyer()
    },[multiplyer])

    return ( 
        <Dialog 
            open={open}
            onClose={() => {setOpen(false) }}
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '500px'}}>
                <DialogTitle align="center">Premiação</DialogTitle>
                    <Typography align="center">
                        Parabéns 
                        {
                            winnerBets.map(bet => {
                                return (
                                    ` ${bet.name} `
                                )
                            })
                        }
                        {`!Os números vencedores em foram esolhidos em ${rounds} rodada(s), 
                        multiplicando o seu prêmio de R$100.000,00 por ${multiplyer}! Totalizando ${100000 * multiplyer} reais.`}
                        
                    </Typography>
            </Grid>
            <DialogActions  style={{padding: '20px'}}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setOpen(false)}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}