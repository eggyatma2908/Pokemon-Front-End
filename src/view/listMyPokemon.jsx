import {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import _ from "lodash";
import logo from "../assets/images/pokemon-logo.png";
import 'react-toastify/dist/ReactToastify.css';

export default function listMyPokemonPage() {
  const [dataMyPokemon, setDataMyPokemon] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const myPokemonApi = 'http://localhost:4000/v1/pokemon';
  const apiPokemon = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    getAllPokemonHandler(location.state.url);
  }, [location]);

  // GET Data Pokemon
  const getAllPokemonHandler = (url) => {
    axios.get(url).then(res => res.data.result)
    .then (
      (result) => {
        setDataMyPokemon(result);
      },
      (error) => {
        error;
      }
    )
  }

  // Desc
  const Desc = (props) => {
    const [abilityPokemon, setAbilityPokemon] = useState({});
    useEffect(() => {
      axios.get(props.fullUrl).then(res => res.data)
      .then (
        (result) => {
          setAbilityPokemon(result.abilities);
        },
        (error) => {
          error;
        }
      )
    }, []);
    return (
      <>
        <h4><strong>Abilities : </strong></h4>
        {_.map(abilityPokemon, (o, id) => {
          return (
            <div className="flex justify-center" key={id}>
              <ul>
                <li>{_.upperFirst(o.ability.name)}</li>
              </ul>
            </div>
          )
        })}
    </>
    )
  }

  // Catch Pokemon
  const releasePokemonHandler = (id, name) => {
    axios.delete(`${myPokemonApi}/${id}`).then(res => res.data)
    .then (
      (result) => {
        toast.success("Successfuly");
        window.location.reload(false);
      },
      (error) => {
        error;
        toast.error("Failed");
      }
    )
  }

  return (
    <>
    <div className="flex justify-center">
        <img src={logo} alt="logo" width={250} height={250}></img>
      </div>
      <div className='grid grid-cols-5 m-5'>
        {_.map(dataMyPokemon, (o) => {
          return (
            <div className="text-center" key={o.id}>
              <div className="max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg m-auto" src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + o.id_pokemon + '.png'} alt={o.name} />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{_.toUpper(o.name)}</h5>
                <Desc fullUrl={'https://pokeapi.co/api/v2/pokemon/' + o.id_pokemon} />
                <Link to={`/detail/${o.id_pokemon}`} state={{ url: `${apiPokemon}/${o.id_pokemon}` }} className="m-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Detail
                </Link>
                <button onClick={() => releasePokemonHandler(o.id_pokemon)} type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Release</button>
                <ToastContainer />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col m-5">
          <button onClick={() => navigate(-1)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
        </div>
      </div>
    </>
  );
}