import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Transactions, TextCard } from "./styles";
import {StyleSheet, View} from 'react-native';
import { Input } from "../../components/Input";
import { Button, } from "../../components/Button";
import { Alert, FlatList } from "react-native";
import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { SpendingStorageDTO } from "../../storage/spending/SpendingStorageDTO";
import { TransactionExpenses } from "../../components/TransactionExpenses";
import { formatAmount } from "../../utils/formatAmount";

export function Search() {
  const [cpf, setCpf] = useState("");
  const [product, setProduct] = useState("");
  const [dataExpenses, setDataExpenses] = useState<SpendingStorageDTO[]>([]);
  const [addSupplier, setAddSupplier] = useState(0);
  const [codeInvoiceAmount, setCodeInvoiceAmount] = useState(0);
  const [dataFilter, setDataFilter] = useState<SpendingStorageDTO[]>([]);

  async function handleSearchSpending() {
    if (cpf.trim() === "" && product.trim() === "") {
      return Alert.alert("Preencha algum campo");   
    }
    
    const data = await spendingGetAll();
    
    const newData = data.filter(
      (item) =>
      item.cpf == cpf ||
      item.product == product
      );
      
    function Calculate(total: number, item: SpendingStorageDTO) {
      return total + item.saleValue;
    }

    setDataFilter(newData);
    
    if (newData.length) {
      const soma = newData
      .filter((item) => item.saleValue)
      .reduce(Calculate, 0);
      
      setAddSupplier(soma);
      setCodeInvoiceAmount(newData.length)
      setDataExpenses(newData);
     
    } else {
      return Alert.alert("Preencha com valores existentes");
    }
       
    setCpf('');
    setProduct('');
  }

  return (
    <Container>
      <Header title="Pesquisa por CPF e/ou produto" />

      <Input
        placeholder="CPF"
        placeholderTextColor="#363F5F"
        value={cpf}
        onChangeText={(value) => setCpf(value)}
      />

      <Input
        placeholder="Produto"
        placeholderTextColor="#363F5F"
        value={product}
        onChangeText={(value) => setProduct(value)}
      />

      <Button title="Pesquisa" onPress={handleSearchSpending} />

      <Transactions>
        <FlatList
          data={dataFilter}
          renderItem={({ item }) => <TransactionExpenses data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>

      {/* <View style={styles.container}>

      
      {addSupplier != 0 && (
        <TextCard>{`Total de Gastos: R$ ${addSupplier}`}</TextCard>
      )}

      {codeInvoiceAmount != 0 && (
        <TextCard>{`Total de Notas: ${codeInvoiceAmount}`}</TextCard>
      )}

      </View> */}
    </Container>
  );
  
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop:20,
//     marginHorizontal: 30,
//   },
// });
