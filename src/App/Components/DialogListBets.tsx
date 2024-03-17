import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {  Button, DialogActions, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


interface Bet {
    id: number,
    name: string,
    cpf: string,
    numbers: (number | undefined) [],
    winner: boolean | undefined
}

export default function DialogListBets(props: {open : boolean, betsArray: Bet[], setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const open = props.open
    const setOpen = props.setOpen
    const betsArr = props.betsArray


    return ( 
        <Dialog 
            open={open}
            onClose={() => setOpen(false) }
            >
            <Grid container direction={'column'} justifyContent={'center'} gap ={1} style={{padding: '40px', width: '600px'}}>
                <DialogTitle align="center">Lista de Apostas</DialogTitle>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">CPF</TableCell>
                            <TableCell align="center">Números</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {betsArr.map(bet => {
                            return (
                                <TableRow key={bet.id}>
                                    <TableCell align="center">
                                        {bet.id}
                                    </TableCell>
                                    <TableCell align="center">
                                        {bet.name}
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
                                    <TableCell align="center" >
                                        {bet.winner !== undefined ? (bet.winner === true ? 'Vencedor' : 'Perdedor') : 'Pendente'}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>

                </Table>
            </Grid>
            <DialogActions  style={{padding: '20px'}}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setOpen(false)}
                >
                    Fechar 
                </Button>
            </DialogActions>
        </Dialog>
    )
}