import { useState} from 'react';
import propstypes from "prop-types";
DispSkills.propTypes = {
    skillsobj: propstypes.array,
}
export default function DispSkills({skillsobj}){
    //const [disp,setDisp]=useState([]);
    console.log("skills");
    console.log(typeof skillsobj);
    console.log(skillsobj);
    skillsobj.length?console.log("true"): console.log(skillsobj[0]);
  
    return(
        <>
       {
       skillsobj.map((obj) => {
            console.log("looping");
    
            return(
                <>
                <p>your skill title {obj["sktitle"]}</p>
                <p>your skill list {obj["sklist"]}</p>
                </>  
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
    

