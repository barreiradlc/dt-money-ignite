import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionTable";
import { Container } from "./styles";

function DashBoard() {
    return (
        <Container>
            <Summary />
            <TransactionsTable />
        </Container>
    )   
}

export { DashBoard }