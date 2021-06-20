import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from './styles'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from "../../assets/close.svg"
import { FormEvent, useContext, useState } from 'react'
import { api } from '../../services/api'
import { useTransactions } from '../../hooks/useTransactions'


interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const {transactions, handleCreateTransaction} = useTransactions()

  const [type, setType] = useState<'deposit' | 'withdraw'>('withdraw')

  // inputs
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault()

    await handleCreateTransaction({
      title,
      amount,
      type,
      category
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('withdraw')

    onRequestClose()
  }

  return (
    <Modal
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container
        onSubmit={handleCreateNewTransaction}
      >
        <h2>Cadastrar transação</h2>

        <input value={title} placeholder="Título" onChange={event => setTitle(event.target.value)} />
        <input value={amount} placeholder="Valor" type="number" onChange={event => setAmount(Number(event.target.value))} />

        <TransactionTypeContainer>
          <RadioBox 
            type="button" 
            onClick={() => 
            setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox 
            type="button" 
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
            >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)} />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>

  )
}


export { NewTransactionModal }