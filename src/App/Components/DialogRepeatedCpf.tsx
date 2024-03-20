import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, Grid, Typography } from "@mui/material";


export default function DialogRepeatedCpf(props: {open : boolean , setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen

    return ( 
        <Dialog 
            open={open}
            onClose={() => {setOpen(false) }}
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '450px'}}>
                <DialogTitle align="center">Erro ao cadastrar aposta</DialogTitle>
                    <Typography align="center">
                        Esse CPF foi registrado no nome de outro usuário. Por favor insira o CPF correto ou verifique a escrita de seu nome.
                    </Typography>
            </Grid>
            <DialogActions  style={{padding: '20px'}}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setOpen(false)}
                >
                    Entendido
                </Button>
            </DialogActions>
        </Dialog>
    )
}