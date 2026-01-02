import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchCoinData } from "../api/coinGecko";


export const CoinDetail = () => {

    const [coin , setCoin] = useState(null);
    const [isLoading , setIsLoading] = useState(true);
    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
        loadCoinData()
    },[id])

    const loadCoinData = async () => {
        try{
            const data = await fetchCoinData(id);
            setCoin(data)
        }catch(err){
            console.error("Error fetching crypto: " ,err);
        }finally {
            setIsLoading(false);
        }
    }

    if(isLoading){
        return(
            <div className="app">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading coin data...</p>
                </div>
            </div>
        )
    }

    if(!coin){
        return (
            <div className="app">
                <div className="no-results">
                    <p>Coin not found...</p>
                    <button onClick={()=> navigate("/")}>Go Back</button>
                </div>
            </div>
        )
    }


    return <div className="app">
                <header className="header">
                        <div className="header-content">
                            <div className="logo-section">
                                <h1> 🚀 Crypto Tracker</h1>
                                <p>Real-time Crypto Currency Prices and Market Data </p>
                            </div>
                            <button onClick={()=> navigate("/")} className="back-button">
                                ← Back to List
                            </button>
                        </div>
                </header>
            </div>;
};