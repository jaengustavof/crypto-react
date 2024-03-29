import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import UseSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
    }
`

const Formulario = ({setMonedas}) => {

    const [ criptos, setCriptos] = useState([]);
    const [ error, setError] = useState(false);
    const [ moneda, SelectMonedas ] = UseSelectMonedas('Elige tu Moneda', monedas); //[ moneda, SelectMonedas ] nombre de los elementos que devuelve el hook. Como es un array le ponemos el nombre que sea, porque se devuelve por indice. Si fuece un objeto, debemos poner el nombre de la key// UseSelectMoneds() es el hook

    const [ criptomoneda, SelectCriptomoneda] = UseSelectMonedas('Elige tu Criptomoneda', criptos);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if([moneda, criptomoneda].includes('')){
            setError(true);
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }
    
    useEffect(() => {

        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCriptos = resultado.Data.map((cripto) => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto;
            })
            setCriptos(arrayCriptos);
        }

        
        consultarAPI();
    }, [])
    //SelectMonedas(); //llamamos als hook

    return (
        <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form onSubmit={handleSubmit}>
            <SelectMonedas/>
            <SelectCriptomoneda/>

            <InputSubmit 

                type='submit' 
                value='Cotizar' 
                
            />
        </form>
        </>
        
    );
}

export default Formulario;
