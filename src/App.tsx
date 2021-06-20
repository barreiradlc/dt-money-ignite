import { useState } from 'react';
import Modal from 'react-modal'
import { DashBoard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import {  TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement("#root")

function App() {
  const [ isNewTransationOpen, setIsNewTransationOpen ] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransationOpen(true)    
  }
  
  function handleCloseNewTransactionModal() {
    setIsNewTransationOpen(false)          
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <DashBoard />

      <NewTransactionModal 
        isOpen={isNewTransationOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export { App };
