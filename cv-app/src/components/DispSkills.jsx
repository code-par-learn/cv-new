import '../styles/dispSkillsSytles.css';
import propstypes from "prop-types";
DispSkills.propTypes = {
    skillsobj: propstypes.array,
}
export default function DispSkills({skillsobj}){
    //const [disp,setDisp]=useState([]);
    return(
        <>
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
       </> 
    );
        
    
}
   /* function get_ready(){
            
                skillsobj.map((obj) => {
                    console.log("here");
                    console.log(obj);
                 let disp_now=(<>
                     <p>your skill title {obj["sktitle"]}</p>
                     <p>your skill list {obj["sklist"]}</p>
                     </>  );
         
                 setDisp((prev)=>{
                     return ([
                         ...prev,
                         disp_now
                     ]);
                 });
             });
             console.log("finished");
         return (
             <>
             <h1>skills</h1>
             {disp}
             </>
             
         );
         }
         
        
        
         
    

    return(get_ready()); */
    

