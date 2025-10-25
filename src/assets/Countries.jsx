import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Countries.module.css";

export default function Countries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        setLoading(true);
        setError(null); 

        const res = await axios.get("https://xcountries-backend.labs.crio.do/all");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching countries data:", err);
        setError("Failed to fetch countries. Please try again later."); 
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, []);

 
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div>
        <h3>Countries Flags and Their Names</h3>
      </div>

      {data.length > 0 ? (
        <div className={styles.card}>
          {data.map((country, index) => (
            <div key={index}>
              {country.flag ? (
                <img
                  src={country.flag}
                  alt={`Flag of ${country.name}`}
                  className={styles.img}
                />
              ) : (
                <p>No flag available for this country</p>
              )}
              <div>
                <h2>{country.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}