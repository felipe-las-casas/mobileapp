import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { Text } from 'react-native';

import { FlatList } from "react-native";

import { Container, Transactions } from "./styles";

import { TransactionExpenses } from "../../components/TransactionExpenses";

import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { SpendingStorageDTO } from "../../storage/spending/SpendingStorageDTO";

export function ListExpenses() {
  const [dataExpenses, setListExpenses] = useState<SpendingStorageDTO[]>([]);

  async function loadDataSpending() {
    const data = await spendingGetAll();
    console.log("Dados gravados: ", data);
    setListExpenses(data);
    console.log(dataExpenses.filter(e => e.cpf))
  }

  // useEffect(() => {
  //   loadDataSpending()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      loadDataSpending();
    }, [])
  );

  return (
    <Container>
      <Header title="Listagem" />
      <Transactions>
        <FlatList
          data={dataExpenses}
          renderItem={({ item }) => <TransactionExpenses data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
