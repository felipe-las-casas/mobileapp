import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { Text,View, StyleSheet } from 'react-native';


import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { SpendingStorageDTO } from "../../storage/spending/SpendingStorageDTO";

export function CodeAmount() {
  const [dataExpenses, setListExpenses] = useState<SpendingStorageDTO[]>([]);

  const [cpf000, setCpf000] = useState<SpendingStorageDTO[]>([])
  const [cpf100, setCpf100] = useState<SpendingStorageDTO[]>([])
  const [cpf200, setCpf200] = useState<SpendingStorageDTO[]>([])

  async function loadDataSpending() {
    const data = await spendingGetAll();
    console.log("Dados gravados: ", data);
    setListExpenses(data);
    console.log(dataExpenses)
    let data000 = data.filter(e => e.cpf == "000")
    console.log(data000)
    setCpf000(data000)
    let data100 = data.filter(e => e.cpf == "100")
    console.log(data100)
    setCpf100(data100)
    let data200 = data.filter(e => e.cpf == "200")
    console.log(data200)
    setCpf200(data200)
  }

  function Comission(value: number) {
    if(value < 100000) {
      return 0.01 * value;
    }
    else if (value >= 100000 && value < 200000) {
      return .02 * value;
    }
    else if (value >=  200000 && value < 300000) {
      return .03 * value;
    }
    else {
      return .05 * value;
    }
  }

  function Calculate(total: number, item: SpendingStorageDTO) {
    return total + item.saleValue;
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
    <View>
      <Header title="Listagem por CPF" />
        <View style={styles.container}>
          {
            cpf000.length > 0 && (
          <Text style={styles.code}>CPF 000 - total da venda: {cpf000
            .filter((item) => item.cpf)
            .reduce(Calculate, 0)
            .toLocaleString('pt-BR', {
              style: 'currency', 
              currency: 'BRL',
          })} - valor da comissão: {Comission(cpf000
              .filter((item) => item.cpf)
              .reduce(Calculate, 0))
              .toLocaleString('pt-BR', {
                style: 'currency', 
                currency: 'BRL',
            })
            } - 
             Salário + Comissão: 
            {
              (1300 +
              Comission(cpf000
                .filter((item) => item.cpf)
                .reduce(Calculate, 0)))
                .toLocaleString('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL',
              })
            } - 
             INSS: {
              ((1300 +  Comission(cpf000
                .filter((item) => item.cpf)
                .reduce(Calculate, 0))) * .08  )
                .toLocaleString('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL',
              })
            } - 
             Salário Líquido: 
            {
              ((1300 +
              Comission(cpf000
                .filter((item) => item.cpf)
                .reduce(Calculate, 0))) - 
                ((1300 +  Comission(cpf000
                  .filter((item) => item.cpf)
                  .reduce(Calculate, 0))) * .08  ))
                  .toLocaleString('pt-BR', {
                    style: 'currency', 
                    currency: 'BRL',
                })
                  
            }
                
            
          </Text>

            )
          }
          { 
            cpf100.length > 0 && (
            <Text style={styles.code}>CPF 100 - total da venda: {cpf100
              .filter((item) => item.cpf)
              .reduce(Calculate, 0)
              .toLocaleString('pt-BR', {
                style: 'currency', 
                currency: 'BRL',
            })} - valor da comissão: {Comission(cpf100
                .filter((item) => item.cpf)
                .reduce(Calculate, 0))
                .toLocaleString('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL',
              })
              } - 
              Salário + Comissão: 
              {
                (1300 +
                Comission(cpf100
                  .filter((item) => item.cpf)
                  .reduce(Calculate, 0)))
                  .toLocaleString('pt-BR', {
                    style: 'currency', 
                    currency: 'BRL',
                })
              } - 
              INSS: {
                ((1300 +  Comission(cpf100
                  .filter((item) => item.cpf)
                  .reduce(Calculate, 0))) * .08  )
                  .toLocaleString('pt-BR', {
                    style: 'currency', 
                    currency: 'BRL',
                })
              } - 
              Salário Líquido: 
              {
                ((1300 +
                Comission(cpf100
                  .filter((item) => item.cpf)
                  .reduce(Calculate, 0))) - 
                  ((1300 +  Comission(cpf100
                    .filter((item) => item.cpf)
                    .reduce(Calculate, 0))) * .08  ))
                    .toLocaleString('pt-BR', {
                      style: 'currency', 
                      currency: 'BRL',
                  })
                    
              }
                  
              
            </Text>)
              
          }
          {
            cpf200.length > 0 && (

          <Text style={styles.code}>CPF 200 - total da venda: {cpf200
            .filter((item) => item.cpf)
            .reduce(Calculate, 0)
            .toLocaleString('pt-BR', {
              style: 'currency', 
              currency: 'BRL',
          })} - valor da comissão: {Comission(cpf200
              .filter((item) => item.cpf)
              .reduce(Calculate, 0))
              .toLocaleString('pt-BR', {
                style: 'currency', 
                currency: 'BRL',
            })
            } - 
             Salário + Comissão: 
            {
              (1300 +
              Comission(cpf200
                .filter((item) => item.cpf)
                .reduce(Calculate, 0)))
                .toLocaleString('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL',
              })
            } - 
             INSS: {
              ((1300 +  Comission(cpf200
                .filter((item) => item.cpf)
                .reduce(Calculate, 0))) * .08  )
                .toLocaleString('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL',
              })
            } - 
             Salário Líquido: 
            {
              ((1300 +
              Comission(cpf200
                .filter((item) => item.cpf)
                .reduce(Calculate, 0))) - 
                ((1300 +  Comission(cpf200
                  .filter((item) => item.cpf)
                  .reduce(Calculate, 0))) * .08  ))
                  .toLocaleString('pt-BR', {
                    style: 'currency', 
                    currency: 'BRL',
                })
                  
            }
                
            
          </Text>
            )
          }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  code: {
    fontWeight: "800",
    color: "blue",
    marginBottom: 10
  }
});
