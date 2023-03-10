import React, {useState, useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import "./Table.css";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
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
}

const TableComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleDelete = (id: number) => {
        const deletedUser = users.find(user => user.id === id);
        if (deletedUser) {
            const newUsers = users.filter(user => user.id !== id);
            setUsers(newUsers);
            setDeletedUsers([...deletedUsers, deletedUser]);
        }
    }

    const handleReset = () => {
        setUsers([...users, ...deletedUsers]);
        setDeletedUsers([]);
        setSearchTerm('');
    }

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const highlightSearchTerm = (text: string) => {
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span style="color: red">${match}</span>`);
    }

    const filterUsers = (users: User[], searchTerm: string) => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredUsers = filterUsers(users, searchTerm);


    return (
        <div>
            <div className={"tools__control"}>
                <TextField type="text" placeholder="Search" variant="outlined" size="small" value={searchTerm}
                           onChange={handleSearch}/>
                <Button variant="outlined" color="primary" onClick={handleReset}>Reset</Button>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell
                                    className={"table-cell__button"}
                                    dangerouslySetInnerHTML={{__html: highlightSearchTerm(user.name)}}
                                    key={user.id}
                                    onClick={() => handleUserClick(user)}></TableCell>
                                <TableCell
                                    dangerouslySetInnerHTML={{__html: highlightSearchTerm(user.username)}}></TableCell>
                                <TableCell
                                    dangerouslySetInnerHTML={{__html: highlightSearchTerm(user.email)}}></TableCell>
                                <TableCell><Button variant="contained" color="secondary"
                                                   onClick={() => handleDelete(user.id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={selectedUser !== null} onClose={handleCloseModal}>
                {selectedUser && (
                    <>
                        <DialogTitle>{selectedUser.name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Address: {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}
                            </DialogContentText>
                            <DialogContentText>
                                Company: {selectedUser.company.name}, {selectedUser.company.catchPhrase}, {selectedUser.company.bs}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}

export default TableComponent;
