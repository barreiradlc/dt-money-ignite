import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transation {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransationInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transation[];
  handleCreateTransaction: (transaction: TransationInput) => void
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [ transactions, setTransactions ] = useState<Transation[]>([])

    async function getTransations(){
        const { data } = await api.get('/transactions')
        setTransactions(data.transactions)
    }

    useEffect(() => {
        getTransations()        
    }, [])

    async function handleCreateTransaction(values: TransationInput){
      try {
        const { data } = await api.post('/transactions',{ 
          ...values,
          createdAt: new Date()
        })
        console.log(data)
        setTransactions([ ...transactions, data.transaction ])
      } catch (error) {
        
      }
    }

    return (
      <TransactionsContext.Provider value={{ transactions, handleCreateTransaction }}>
        {children}
      </TransactionsContext.Provider>
    )

}

function useTransactions() {
  const context = useContext(TransactionsContext)

  if(!context){
    throw new Error("useTransaction needs TransactionsContext to exists!");    
  }

  return context
}


export { TransactionsProvider, TransactionsContext, useTransactions }