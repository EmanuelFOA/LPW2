import React, {useState , useEffect} from "react";

import "./styles.css";

function Home() {
  const [Municipio, setMunicipio] = useState('')
  const [codigo, setCod] = useState('')
  const [Estado, setEstado] = useState('')
  const [Acao, setAcao] = useState('')
 const [Things, setThings] = useState([])



  function handleAddPeriodo(event) {
    event.preventDefault();
    const data = {
      id: new Date().getTime(),
      codigo,
      Municipio,
      Estado,
      Acao
    }
    if(codigo === '' || Municipio === '' || Estado === ''){
      alert('Favor preencher o campo que está vazio.')
      return
    }
    
    
  console.log(data)

    setThings([...Things,data])
    setCod('')
  setMunicipio('')
  setAcao('')
  setEstado('')
  }

  function handleDelete(id) {
    setThings(Things.filter(thing => thing.id !== id ))
  }

  useEffect(() =>{
    function loadData() {
      const storageThings = localStorage.getItem('@cadcthings:things')
      if (storageThings) {
        setThings(JSON.parse(storageThings))
      }
    }
    loadData()
  }, [])
  useEffect(() => {
    function saveData() {
      localStorage.setItem('@cadcthings:things', JSON.stringify(Things))
    }
    saveData()
  }, [Things])

  return (    
    <div className="page">
      <form className="Periodo" onSubmit={handleAddPeriodo}>
      <input
          name="Codigo IBGE"
          type="text"
          placeholder="Digite seu codigo IBGE."
          value={codigo}
          onChange={(event) => setCod(event.target.value)}
        />
        <input
          name="Municipio"
          type="text"
          placeholder="Digite seu Municipio."
          value={Municipio}
          onChange={(event) => setMunicipio(event.target.value)}
        />
        <input
          name="Estado"
          type="text"
          placeholder="Digite seu Estado."
          value={Estado}
          onChange={(event) => setEstado(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Municipio</th>
            <th colSpan={1}>Estado</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
            {/*Things = [
              {id: 88888, Periodo: 8, Professor: 'Zezin24'},
              {id: 22222, Periodo: 5, Professor: 'Zoro'}
            ]; */}
          {Things.map(thing => (
            <tr key={thing.id}>
              <td>{thing.codigo}</td>
              <td>{thing.Municipio}</td>
              <td>{thing.Estado}</td>
              <td>{thing.Açao}
              <button
                className="Excluir"
                onClick={() => handleDelete(thing.id)}
                >
                Excluir
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
