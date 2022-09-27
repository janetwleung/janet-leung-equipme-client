import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProAthlete from "../../components/ProAthlete/ProAthlete";
import { fetchSpecificAthlete, fetchSpecificBat, fetchSpecificGlove, fetchSpecificCleat } from "../../utils/api-utils";
import "./AthletePage.scss";
import backArrow from "../../assets/icons/arrow-back.png"

function AthletePage() {
    let { athleteId } = useParams();
    const [athlete, setAthlete] = useState();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSpecificAthlete(athleteId)
            .then(athleteResponse => {
                setAthlete(athleteResponse.data);
            })
            .catch(error => {
                setIsError(true);
                console.log("For devs: There has been an error fetching the data")
            })
    }, [athleteId]);

    if (isError) {
        return <span>There has been an error fetching the data</span>
    }

    if (!athlete) {
        return <span>Loading...</span>
    }

    return (
        <main className="athlete">
            <div className="athlete__back-container" onClick={() => navigate(-1)}>
                <img src={backArrow} alt="Back arrow" className="athlete__arrow"/>
                <span className="athlete__back">Back</span>
            </div>
            <div className="athlete__content">
                <h2 className="athlete__name">{athlete.name}</h2>
                <p className="athlete__description">{athlete.description}</p>
                <ProAthlete 
                    name={athlete.name}
                    defenseImage={athlete.image1}
                    offenseImage={athlete.image2}
                    gloveId={athlete.gloveId}
                    baIdt={athlete.batId}
                    cleatId={athlete.cleatId}
                    gloveOffsetX={athlete.gloveOffsetX}
                    gloveOffsetY={athlete.gloveOffsetY}
                    cleatOffsetX={athlete.cleatOffsetX}
                    cleatOffsetY={athlete.cleatOffsetY}
                />
            </div>
        </main>
    );
}

export default AthletePage;