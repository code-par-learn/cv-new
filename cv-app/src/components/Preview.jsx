
import propstypes from "prop-types";
Preview.propTypes={
    about:propstypes.object
    
}
export default function Preview({about}){
   
    
    return(
        
        <>
        {Object.keys(about).map((key, i) => (
            <p key={key}>your {key} : {about[key]}</p>
        ))}
       </>
        
    );
}