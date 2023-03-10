import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";


type User = {
    name: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

type UserModalProps = {
    user: User | null;
    onClose: () => void;
};

const ModalComponent = ({ user, onClose }: UserModalProps) => (
        <Dialog open={Boolean(user)} onClose={onClose}>
                <>
                    <DialogTitle>{user?.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Address: {user?.address.street}, {user?.address.suite}, {user?.address.city}, {user?.address.zipcode}
                        </DialogContentText>
                        <DialogContentText>
                            Company: {user?.company.name}, {user?.company.catchPhrase}, {user?.company.bs}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </>
        </Dialog>
);

export default ModalComponent;
