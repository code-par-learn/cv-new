import '../styles/previewSytles.css';
import propstypes from "prop-types";
Preview.propTypes={
    about:propstypes.object,
    skillsobj: propstypes.array,
    profExpobj: propstypes.array,
    
}
export default function Preview({about,skillsobj,profExpobj}){
   
    
    return(
        
        <>
        <h2>About</h2>
        {
            Object.keys(about).map((key, i) => (
                <p key={key}>your {key} : {about[key]}</p>
            ))
        }
        <h2>Skills</h2>
        {
            skillsobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className='DispSkills'>
                    <p>{obj["sktitle"]}</p>
                    <p>{obj["sklist"]}</p>
                    </div>  
                    );
        
            })
        }
        <h2>Professional Experience</h2>
        {
            profExpobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className='DispProfExp'>
                    <p>{obj["compName"]}</p>
                    <p>{obj["positionTitle"]}</p>
                    <p>{obj["startDate"]}</p>
                    <p>{obj["endDate"]}</p>
                    <p>{obj["location"]}</p>
                    <p>{obj["description"]}</p>
                    </div>  
                    );
        
            })
        }
       </>
        
    );
}