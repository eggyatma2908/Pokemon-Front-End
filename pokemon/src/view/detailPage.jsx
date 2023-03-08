import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import logo from "../assets/images/pokemon-logo.png";

export default function DetailPage() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    detailPokemonHandler(location.state.url);
  }, [location]);

  const detailPokemonHandler = (url) => {
    axios.get(url).then(res => res.data)
    .then (
      (result) => {
        setData(result);
      },
      (error) => {
        error;
      }
    )
  }

  return (
    <>
      <div className="flex justify-center mb-5">
        <img src={logo} alt="logo" width={250} height={250}></img>
      </div>
      <div id="detail" className="flex flex-row justify-center">
        <div className="flex flex-col items-center self-center bg-gray-300 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
          <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + data.id + '.svg'} alt=""></img>
          <div className="flex flex-col justify-between p-4 leading-normal bg-white hover:bg-red-700 hover:rounded-lg hover:text-white cursor-pointer">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">{_.upperCase(data.name)}</h5>
            <div className="flex flex-row">
              <div className="flex flex-col m-5">
                <h5><strong>Type :</strong></h5>
                {_.map(data.types, o => {
                  return (
                    <ul className="list-disc">
                      <li className="ml-5 font-normal">{_.upperFirst(o.type.name)}</li>
                    </ul>
                  )
                })}
              </div>
              <div className="flex flex-col m-5">
                <h5><strong>Stats :</strong></h5>
                {_.map(data.stats, o => {
                  return (
                    <ul className="list-disc">
                      <li className="ml-5 font-normal">{_.upperFirst(o.stat.name)} : {o.base_stat}</li>
                    </ul>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col m-5">
          <button onClick={() => navigate(-1)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
        </div>
      </div>
    </>
  );
}
