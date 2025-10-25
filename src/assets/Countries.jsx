import React, { useEffect, useState } from "react";

import axios from "axios";

import styles from "./Countries.module.css"



export default function Countries() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchCountriesData = async () => {

            try {

                const res = await axios.get(`https://xcountries-backend.labs.crio.do/all`);

                setData(res.data);

                setLoading(false);

            } catch (error) {

                console.error('Error fetching countries data:', error);

            }

        };



        fetchCountriesData();

    }, []);



    return (

        <>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <>

                <div>

                    <h3>countries flags an thier names</h3>

                </div>

                    {data.length > 0 ? (

                        <><div className={styles.card}>

                            {data.map((country, index) => (

                                <div key={index} >

                                    {country.flag ? (

                            <img

                              src={country.flag}

                           alt={`Flag of ${country.name}`}

                         className={styles.img}

                                         />

): (

                                        <p>No flag available for this country</p>

                                    )}

                                    <div><h2>{country.name}</h2></div>

                                </div>

                            ))}

                         </div>   

                        </>

                    ) : (

                        <p>No data available</p>

                    )}

                </>

            )}

        </>

    );

}



