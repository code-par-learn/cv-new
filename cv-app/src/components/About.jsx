import propstypes from "prop-types";
About.propTypes={
    aboutobj:propstypes.object,
    setAbout:propstypes.func,
    inputs:propstypes.array
}

export default function About({aboutobj,setAbout}){
    //name,email,phone,website,Linkedin,Github,Leetcode
   
    const handleChange=(id,val)=>{
        aboutobj[id]=val;
        setAbout(about => ({
            ...about,
            ...aboutobj
          }));
    }   //inside the return here we have to return the input fields and their labels which we can do by a function 
        //{name:"",email:"",phone:"",website:"",linkedin:"",github:"",leetcode:""}
   
    function Generatefields({inputs}){
        return(
            <>
            {inputs.map((inputI)=>{
                return(
                    <>
                    <label htmlFor={inputI}></label>
                <input id={inputI} placeholder={inputI} type="text" value={aboutobj[inputI]}   onChange={(e)=>{handleChange(e.target.id,e.target.value)}}  />
                    </>
                );
                
    })}
            </>
        );
    }
    let inputs=["name","email","phone","website","linkedin","github","leetcode"];
    
    return(
        <>
        <h2>About</h2>
        {Generatefields({inputs})}
        </>
    );



}