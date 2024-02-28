import '../styles/index.css';
import Sections from "./Sections";
import Preview from './Preview';
import DispSkills from "./DispSkills";
import { useState } from 'react';

export default function Setup(){
    const [about,setAbout]=useState({name:"",email:"",phone:"",website:"",linkedin:"",github:"",leetcode:""});
    const [skills,setSkills]=useState([]);
    return(
        <>
        <h1>CV App</h1>
        <div  className='cv-container'>
        <div  className='sections'>
            Sections
           <Sections about={about} setAbout={setAbout} 
                     skills={skills} setSkills={setSkills} />
        </div>
        <div  className='preview' >
            Preview
            <Preview about={about}  />
            <DispSkills skillsobj={skills} />
            
        </div>
        </div>
        </>
    );
}