import React, { useEffect } from "react";
import {
    Grid,
    Stack,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    CircularProgress,
} from "@mui/material";
import { fetchTransactions } from "../../store/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "components/Alert";
import moment from 'moment';

const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
    },
    loader: {
        width: "3rem !important",
        height: "3rem !important",
    },
    usersCountContainer: {
        width: "100vw",
        boxSizing: "border-box",
        p: "1rem 2rem",
    },
    totalUser: {
        width: "100%",
        height: "fit-content",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btnContainer: {
        position: "relative",
        top: "-1rem",
    },
    btn: {
        cursor: "pointer",
        bgcolor: "primary.main",
    },
    inputContainer: {
        height: "fit-content",
        width: "100%",
        p: ".5rem 1.5rem",
        m: "1rem 0 2rem",
        bgcolor: "#FBFBFF",
        borderRadius: "0.5rem",
    },
    alertContainer: {
        width: "100vw",
        height: "10vh",
        display: "grid",
        placeItems: "center",
        p: "0 1rem",
    },
    usersListContainer: {
        width: "100%",
        height: "56vh",
        overflow: "auto",
    },
    tableContainer: {
        boxShadow: "none !important",
    },
    table: { minWidth: 650 },
    tableRow: {
        "&:last-child": {
            border: "none !important",
        },
        cursor: "pointer",
        "&:hover": {
            bgcolor: "#EEF3FE",
        },
    },
    textAlignment: {
        textAlign: "center",
    },
    roleCell: {
        width: "40%",
        textAlign: "center",
    },
    statusIndicator: {
        border: "1px solid #E5E7F1",
        width: "fit-content",
        p: ".25rem 1rem",
        borderRadius: ".375rem",
    },
};

const TransactionListing = () => {
    const dispatch = useDispatch();
    const { inProgress, transactions, requestError } = useSelector(
        state => state.transaction
    );
    const { user, accessToken } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchTransactions(user._id, accessToken));
    }, []);

    return (
        <>
            {inProgress ? (
                <Grid sx={styles.container}>
                    <CircularProgress sx={styles.loader} />
                </Grid>
            ) : (
                <>
                    <Grid container sx={styles.usersCountContainer}>
                        <Grid sx={styles.totalUser}>
                            <Stack style={{ marginBottom: '4rem' }}>
                                <Typography variant="h2" component="p">
                                    Transactions
                                </Typography>
                                <Typography>
                                    Total transactions: {transactions.length || 0}
                                </Typography>
                            </Stack>
                        </Grid>
                        {requestError.isError || !transactions.length ? (
                            <Grid sx={styles.alertContainer}>
                                <AlertMessage
                                    severity="error"
                                    message={
                                        requestError.isError
                                            ? requestError.message
                                            : "No transactions exists in the records"
                                    }
                                />
                            </Grid>
                        ) : (
                            <>
                                <Grid sx={styles.usersListContainer}>
                                    <TableContainer
                                        component={Paper}
                                        sx={styles.tableContainer}
                                    >
                                        <Table
                                            sx={styles.table}
                                            aria-label="Transactions Listing table"
                                        >
                                            <TableBody>
                                                {transactions.map((transaction, index) => (
                                                    <TableRow
                                                        key={transaction.id}
                                                        sx={styles.tableRow}
                                                    >
                                                        <TableCell>
                                                            {++index}
                                                        </TableCell>
                                                        <TableCell
                                                            component="td"
                                                            scope="row"
                                                        >
                                                            {transaction.amount}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={
                                                                styles.textAlignment
                                                            }
                                                        >
                                                            {transaction.type}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={styles.roleCell}
                                                        >
                                                            {
                                                                moment(transaction.createdAt).format('MMMM DD, YYYY h:mm:ss A')
                                                            }
                                                        </TableCell>
                                                        {/*<TableCell*/}
                                                        {/*    sx={*/}
                                                        {/*        styles.textAlignment*/}
                                                        {/*    }*/}
                                                        {/*>*/}
                                                        {/*    <Box*/}
                                                        {/*        sx={*/}
                                                        {/*            styles.statusIndicator*/}
                                                        {/*        }*/}
                                                        {/*        component="div"*/}
                                                        {/*    >*/}
                                                        {/*        {user.email_confirmed_at*/}
                                                        {/*            ? "Active"*/}
                                                        {/*            : "Pending Request"}*/}
                                                        {/*    </Box>*/}
                                                        {/*</TableCell>*/}
                                                        {/*<TableCell*/}
                                                        {/*    sx={*/}
                                                        {/*        styles.textAlignment*/}
                                                        {/*    }*/}
                                                        {/*>*/}
                                                        {/*    13 minutes ago*/}
                                                        {/*</TableCell>*/}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                {/* <Grid
                                    sx={{
                                        height: "fit-content",
                                        width: "100%",
                                        p: "1rem 1.5rem",
                                        m: "2rem 0 1rem",
                                        bgcolor: "#FBFBFF",
                                        borderRadius: "0.5rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography>
                                        1-{users.length} of {users.length}
                                    </Typography>
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1.5rem",
                                        }}
                                    >
                                        <Typography>Rows per page:</Typography>
                                        <SelectField
                                            value={rowCount}
                                            onChange={handleRowCountChange}
                                            options={selectFieldOptions}
                                        />
                                        <CustomButton
                                            icon={<ArrowBackOutlinedIcon />}
                                            styles={{
                                                width: "fit-content",
                                                border: "1px solid #E5E7F1",
                                            }}
                                        />
                                        <CustomButton
                                            icon={<ArrowForwardOutlinedIcon />}
                                            styles={{
                                                width: "fit-content",
                                                border: "1px solid #E5E7F1",
                                            }}
                                        />
                                    </Grid>
                                </Grid> */}
                            </>
                        )}
                    </Grid>
                </>
            )}
        </>
    );
};

export default TransactionListing;
