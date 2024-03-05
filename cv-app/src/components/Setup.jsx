import '../styles/index.css';
import Sections from "./Sections";
import Preview from './Preview';
import { useState } from 'react';

export default function Setup(){
    const [about,setAbout]=useState({name:"",email:"",phone:"",linkedin:"",});
    const [skills,setSkills]=useState([]);
    const [profExp,setProfExp]=useState([]);
    const [edu,setEdu]=useState([]);
    
    return(
        <>
        <h1>CV App</h1>
        <div  className='cv-container'>
        <div  className='sections'>
            Sections
           <Sections about={about} setAbout={setAbout} 
                     skills={skills} setSkills={setSkills} 
                     profExp={profExp} setProfExp={setProfExp}/>
        </div>
        <div  className='preview' >
            Preview
            <Preview about={about}  skillsobj={skills} profExpobj={profExp}/>
            
            
        </div>
        </div>
        </>
    );
}