import { useState, useEffect, useId } from "react";
import axios from "axios";
import _ from "lodash";
import {  Link } from "react-router-dom";
import logo from "../assets/images/pokemon-logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main () {
  const [dataPokemon, setPokemon] = useState([]);
  const [pagination, setPagination] = useState([]);
  const myPokemonApi = 'http://localhost:4000/v1/pokemon';

  // GET Data Pokemon
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0').then(res => res.data)
    .then (
      (result) => {
        setPokemon(result.results);
        setPagination(result);
      },
      (error) => {
        error;
      }
    )
  }, []);

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

  // Start Pagination
  const previousHandler = (previous) => {
    axios.get(previous).then(res => res.data)
    .then (
      (result) => {
        setPokemon(result.results);
        setPagination(result);
      },
      (error) => {
        error;
      }
    )
  }

  const nextHandler = (next) => {
    axios.get(next).then(res => res.data)
    .then (
      (result) => {
        setPokemon(result.results);
        setPagination(result);
      },
      (error) => {
        error;
      }
    )
  }

  // Catch Pokemon
  const catchPokemonHandler = (id, name) => {
    axios.post(`${myPokemonApi}/${id}/${name}`).then(res => res.data)
    .then (
      (result) => {
        toast.success("Successfuly");
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
      <div className="flex justify-center">
        <Link to={`listMyPokemon/`} state={{ url: myPokemonApi }} className="m-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          My Pokemon
        </Link>
      </div>
      <div className='grid grid-cols-5 m-5'>
        {_.map(dataPokemon, (o) => {
          let url_array = o.url.split('/') 
          let id = url_array[url_array.length-2]; 
          return (
            <div className="text-center" key={id}>
              <div className="max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg m-auto" src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'} alt={o.name} />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{_.toUpper(o.name)}</h5>
                <Desc fullUrl={'https://pokeapi.co/api/v2/pokemon/' + id} />
                <button onClick={() => catchPokemonHandler(id, o.name)} type="button" className="m-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Catch</button>
                <ToastContainer />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center m-3">
        {!_.isEmpty(pagination.previous) &&
          <button onClick={()=>previousHandler(pagination.previous)} className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-slate-800 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path></svg>
            <strong>Previous</strong>
          </button>
        }
        {!_.isEmpty(pagination.next) &&
          <button onClick={()=>nextHandler(pagination.next)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-slate-800 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <strong>Next</strong>
            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"></path></svg>
          </button>
        }
      </div>
    </>
  )
}