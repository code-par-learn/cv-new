import '../styles/previewSytles.min.css';
import propstypes from "prop-types";
Preview.propTypes={
    about:propstypes.object,
    skillsobj: propstypes.array,
    profExpobj: propstypes.array,
    eduobj: propstypes.array,

    
}
export default function Preview({about,skillsobj,profExpobj,eduobj}){
   
    
    return(
        
        <div key={crypto.randomUUID()} id="preview">
        
           <div key={crypto.randomUUID()} id="aboutBox">
           <div key={crypto.randomUUID()} id="aboutIn">
            <h1>{about["name"]}</h1>
            <div key={crypto.randomUUID()} id="info">
           {
            Object.keys(about).map((key, i) => (
                key=="name" ? null : <p key={key}>{about[key]}</p>
            ))
            }
            </div>
            </div>
            </div>
    
            <div key={crypto.randomUUID()} id="skillsBox">
            <h5>Skills</h5>
            {
            skillsobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className='DispSkills'>
                    <p className="dispSkillTitle">{obj["sktitle"]}</p>
                    <p>{obj["sklist"]}</p>
                    </div>  
                    );
        
            })
            }
            </div>
        
        
        
            <div key={crypto.randomUUID()} id="profExpBox">
            <h5>Professional Experience</h5>
            {
            profExpobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className='DispProfExp'>
                    <div className='jobInfo'>
                        <div className='titleside1'>
                        <p className='posTitle'>{obj["positionTitle"]} , </p>
                        <p className='companyName'>{obj["compName"]}</p>
                        </div>
                        <div className='titleside2'>
                        <p className='Date'>{obj["startDate"]} - {obj["endDate"]} | </p>
                        <p className='Loc'>{obj["location"]}</p>
                        </div>
                    </div>
                    <p className='JobDescp'>{obj["description"]}</p>
                    </div>  
                    );
        
            })
            }
            </div>

            <div key={crypto.randomUUID()} id="eduBox">
            <h5>Education</h5> 
            {
            eduobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className='DispEdu'>
                        <div className='titleside1'>
                        <p className='degree'>{obj["degree"]} , </p>
                        <p className='institution'>{obj["institution"]}</p>
                        </div>
                        <div className='titleside2'>
                        <p className='Date'>{obj["startDate"]} - {obj["endDate"]}</p>
                        <p>|</p>
                        <p className='Region'>{obj["region"]}</p>
                        </div>
                    </div>  
                    );
        
            })
            }
            </div>
        
       </div>
        
    );
}