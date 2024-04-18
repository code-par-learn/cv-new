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
        
        <div key={crypto.randomUUID()} className='text-gray-800 text-lg dark:text-white dark:bg-zinc-800' id="preview">
        
           <div key={crypto.randomUUID()} id="aboutBox">
           <div key={crypto.randomUUID()} id="aboutIn">
            <h1 className='text-4xl font-bold mb-3.5'>{about["name"]}</h1>
            <div key={crypto.randomUUID()} id="info">
           {
            Object.keys(about).map((key, i) => (
               
                <>
                {key=="linkedin" && about[key].length>0 ? <p key={key}>linkedin@{about[key]}</p> : null}
                {key=="name" || key=="linkedin" ? null : <p key={key}>{about[key]}</p>}
                </>
                
            ))
            }
            </div>
            </div>
            </div>
    
            <div key={crypto.randomUUID()} id="skillsBox">
            <h5 className='text-2xl font-bold mb-3.5'>Skills</h5>
            <div className='pl-4'>
            {
            skillsobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className='DispSkills'>
                    <p  className=" text-xl font-semibold dispSkillTitle">{obj["sktitle"]}</p>
                    <p  className=' text-lg dispsklist'>{obj["sklist"]}</p>
                    </div>  
                    );
        
            })
            }
            </div>
            </div>
        
        
        
            <div key={crypto.randomUUID()} id="profExpBox">
            <h5 className='text-2xl font-bold mb-3.5'>Professional Experience</h5>
            <div className='pl-4'>
            {
            profExpobj.map((obj) => {
                return(
                    <div key={crypto.randomUUID()} className=' mb-3.5 DispProfExp'>
                    <div className='jobInfo mb-2.5'>
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
            </div>

            <div key={crypto.randomUUID()} id="eduBox">
            <h5 className='text-2xl font-bold mb-3.5'>Education</h5> 
            <div className='pl-4'>
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
            
        
       </div>
        
    );
}
