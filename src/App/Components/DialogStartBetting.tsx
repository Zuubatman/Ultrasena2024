import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, Typography } from "@mui/material";


export default function DialogStartBetting(props: {open : boolean, resetInfo: () => void , setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const resetInfo = props.resetInfo


    function handleClose(){
        resetInfo()
        setOpen(false)
    }

    return ( 
        <Dialog 
            open={open}
            onClose={() => {setOpen(false) }}
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '500px'}}>
                <DialogTitle align="center">Iniciar Sorteio</DialogTitle>
                    <Typography align="center">
                        Iniciar nova rodada de apostas.
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
                    onClick={() => handleClose()}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}