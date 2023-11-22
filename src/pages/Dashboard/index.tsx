import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, FlatList } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { InputAmount } from "../../components/InputAmount";
import { InputDate } from "../../components/InputDate";
import { spendingCreate } from "../../storage/spending/spendingCreate";
import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { formatAmount } from "../../utils/formatAmount";
export function Dashboard() {
  const [cpf, setCpf] = useState("");
  const [product, setProduct] = useState("");
  const [saleValue, setSaleValue] = useState("");
  const [dateValue, setDateValue] = useState("");
 

  async function handleAddNewSpending() {
    // limpa o AsyncStorage no ios
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // alert('O programa sera finalizado')
    // return

    // limpa o AsyncStorage no android
    // await AsyncStorage.clear();
    // alert("O programa sera finalizado");
    // return;

    const data = {
      cpf,
      product,
      saleValue: parseFloat(saleValue),
      dateValue,
    };
    const cpfValidation = cpf === "000" ||
    cpf === "100" ||
    cpf === "200" 
   
    await spendingCreate(data);
    if (
      cpfValidation &&
      product != "" &&
      saleValue != "" &&
      dateValue != ""
    ) {
      setCpf("");
      setSaleValue("");
      setProduct("");
      setDateValue("")
      const result = await spendingGetAll();
      console.log(result);
    } 

    if (!cpfValidation) {
      Alert.alert(
        "Preencha com um CPF válido"
      );
    }
    
    else {
      Alert.alert(
        "Preencha os campos corretamente"
      );
    }
  }

  return (
    <Container>
      <Header title="Cadastro" />

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

      <Input
        placeholder="Valor da venda"
        placeholderTextColor="#363F5F"
        value={saleValue}
        onChangeText={(value) => setSaleValue(value)}
      />

      <InputDate
        placeholder="Data da Venda"
        placeholderTextColor="#363F5F"
        value={dateValue}
        onChangeText={(value) => setDateValue(value)}
      />

      <Button title="Adicionar" onPress={handleAddNewSpending} />
    </Container>
  );
}
