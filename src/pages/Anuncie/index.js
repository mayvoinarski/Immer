import Header from 'components/Header';
import { useSelector } from 'react-redux';
import styles from './Anuncie.module.scss';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';

export default function Anuncie() {
  const categorias = useSelector(state => state.categorias.map(({ nome, id }) => ({ nome, id })));
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
        categoria: '',
    }
  });
  const { errors } = formState;
 
  function cadastrar(params) {
    console.log(params);
}
  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto no melhor site do Brasil!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input className={errors.nome ? styles['input-erro'] : ''} {...register('nome', { required: true })} placeholder='Nome do produto' alt='nome do produto' />
        <input className={errors.descricao ? styles['input-erro'] : ''} {...register('descricao', { required: true })} placeholder='Descrição do produto' alt='descrição do produto' />
        <input className={errors.imagem ? styles['input-erro'] : ''} {...register('imagem', { required: true })} placeholder='URL da imagem do produto' alt='URL da imagem do produto' />
        <select className={errors.categoria ? styles['input-erro'] : ''} {...register('categoria', { required: true })}>
          <option value='' disabled > Selecione a categoria </option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <input className={errors.preco ? styles['input-erro'] : ''} {...register('preco', { required: true })} type='number' placeholder='Preço do produto' />
        <Button type='submit' >
          Cadastrar produto
        </Button> 
      </form>
    </div>
  )
}