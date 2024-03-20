import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, TextField, Typography } from "@mui/material";

export default function DialogRiskEverything(props: {open : boolean, money: number, setOpen: React.Dispatch<React.SetStateAction<boolean>>, setOpenPrize: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const money = props.money
    const setOpenPrize = props.setOpenPrize


    const [n1 , setN1] = useState<number>()
    const [winner, setWinner] = useState<boolean| undefined>(undefined)

    function draw(){
        let number = Math.floor(Math.random() * 5) + 1
        number = 5
        console.log(number)
        if(n1 === number){
            setWinner(true)
            return 
        }
        setWinner(false)
    }

    return ( 
        <Dialog 
            open={open}
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '500px'}}>
                <DialogTitle align="center">Ariscar tudo</DialogTitle>
                    {winner === undefined && 
                    <>
                    <Typography align="center">
                        Selecione um número de 1 a 5 para ser sorteado. Se escolher o número de sorte, 
                        seu prêmio será quintuplicado. Porém, se errar perderá todo o prêmio.
                    </Typography>
                    <Grid item container justifyContent={'center'} style={{padding: '20px'}}>
                    <TextField 
                        variant="filled"
                        size ={'small'}
                        style={{width: '50px'}}
                        error= {n1 ? n1 < 0 || n1 > 5 ? true : false : false}
                        onChange={(evt) => {
                            let number = Number(evt.target.value)
                            if(!isNaN(number) && number > 0 && number <= 5){
                                setN1(number);
                            } else {
                                setN1(-1)
                            }
                        }}>
                    </TextField>
                    </Grid>
                    </> 
                    }
                    {
                        winner === false && 
                        <>
                            <Typography align="center">
                                Você perdeu tudo.
                            </Typography>
                        </>
                    }
                    {
                        winner === true && 
                        <>
                         <Typography align="center">
                                {`Parabéns! O Prêmio foi quintuplicado! Totalizando R$${money * 5}!`}
                        </Typography>
                        </>
                    }
            </Grid>
            <DialogActions  style={{padding: '20px'}}>
                {winner === undefined  ?  
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => draw()}
                        disabled={n1 === undefined || n1 === -1}
                    >
                        Arriscar!
                    </Button>

                    :

                    <Button
                    variant="contained"
                    size="small"
                    onClick={() => { setOpen(false) ; setOpenPrize(false)}}
                >
                    Voltar
                </Button>

                }
                
            </DialogActions>
        </Dialog>
    )
}