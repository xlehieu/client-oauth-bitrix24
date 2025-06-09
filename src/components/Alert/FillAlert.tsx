import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
type AlertSeverity = 'success' | 'error' | 'info' | 'warning';
export default function FillAlert({
    open,
    setOpen,
    title = '',
    type = 'success',
}: {
    type?: AlertSeverity;
    title?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    );
}
