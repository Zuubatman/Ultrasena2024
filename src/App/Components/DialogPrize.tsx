import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, Typography } from "@mui/material";
import DialogRiskEverything from "./DialogRiskEverythingy";

interface Bet {
    id: number,
    name: string,
    cpf: string,
    numbers: (number | undefined) [],
    winner: boolean | undefined
}

export default function DialogPrize(props: {open : boolean, setClaimedReward: React.Dispatch<React.SetStateAction<boolean>>, rounds:number, setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const rounds = props.rounds
    const setClaimdReward = props.setClaimedReward

    const [multiplier, setMultiplyer] = useState<number>(1)
    const [openRiskAll, setOpenRiskAll] = useState<boolean>(false)

    function handleClose(){
        setClaimdReward(true)
        setOpen(false)
    }

    useEffect(()=> {
        function calculateMultiplier(){
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
        calculateMultiplier()
    },[rounds])

    return ( 
        <Dialog 
            open={open}
            onClose={() => {setOpen(false) }}
            >
            <DialogRiskEverything
                open={openRiskAll}
                setOpen={setOpenRiskAll}
                money={100000 * multiplier}
                setOpenPrize={handleClose}
            />
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '500px'}}>
                <DialogTitle align="center">Premiação</DialogTitle>
                    <Typography align="center">
                        {`Parabéns! Os números vencedores em foram esolhidos em ${rounds} rodada(s), 
                        multiplicando o prêmio de R$100.000,00 por ${multiplier}! Totalizando ${100000 * multiplier} reais, mas
                        ainda é possível quintuplicar o seu prêmio selecionando a opção Arriscar Tudo! 
                        Mas cuidado! Depois de selecionar não há mais volta!`}
                        
                    </Typography>
            </Grid>
            <DialogActions  style={{padding: '20px'}}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {setOpenRiskAll(true)}}
                >
                    Arriscar Tudo
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleClose()}
                >
                    Aceitar Prêmio
                </Button>
                
            </DialogActions>
        </Dialog>
    )
}