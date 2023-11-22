import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

import { SpendingStorageDTO } from "../../storage/spending/SpendingStorageDTO";

type Props = {
  data: SpendingStorageDTO;
};

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>{data.cpf}</Description>
      <Description>{data.product}</Description>
      <Amount>R${data.saleValue}</Amount>
      <Footer>
        <Date>{data.dateValue}</Date>
      </Footer>
    </Container>
  );
}
