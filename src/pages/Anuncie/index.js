import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Anuncie.module.scss";
import Button from "components/Button";
import { useForm } from "react-hook-form";
import { cadastrarItem } from "store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "components/Input";

export default function Anuncie() {
  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id })),
  );
  const dispatch = useDispatch();
  const { nomeCategoria = '' } = useParams();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: nomeCategoria,
    },
  });
  const { errors } = formState;

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
  }

  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui!"
        descricao="Anuncie seu produto no melhor site do Brasil!"
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("titulo", { required: true })}
          placeholder="Nome do produto"
          alt="nome do produto"
        />
        <Input
          className={errors.descricao ? styles["input-erro"] : ""}
          {...register("descricao", { required: true })}
          placeholder="Descrição do produto"
          alt="descrição do produto"
        />
        <Input
          className={errors.imagem ? styles["input-erro"] : ""}
          {...register("foto", { required: true })}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        <select
          className={errors.categoria ? styles["input-erro"] : ""}
          {...register("categoria", { required: true })}
          disabled = {nomeCategoria}
        >
          <option value="" disabled>
            {" "}
            Selecione a categoria{" "}
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <Input
          className={errors.preco ? styles["input-erro"] : ""}
          {...register("preco", { required: true, valueAsnumber: true })}
          type="number"
          placeholder="Preço do produto"
        />
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
