//we have to asemble the sections of the cv here using import
//About , Skills,Professional_experience,Projects,Education,Achievements 
import About from "./About";
import propstypes from "prop-types";
import Skills from "./Skills";
import ProfExp from "./ProfExp";
import Education from "./Education";
import {
    Collapse,
    initTWE,
  } from "tw-elements";
  import { useEffect } from 'react';
Sections.propTypes={
    about:propstypes.object,
    setAbout:propstypes.func,
    skills:propstypes.array,
    setSkills:propstypes.func,
    profExp:propstypes.array,
    setProfExp:propstypes.func,
    edu:propstypes.array,
    setEdu:propstypes.func,
    skillIdx:propstypes.number,
    setSkillIdx:propstypes.func,
    profExpIdx:propstypes.number,
    setProfExpIdx:propstypes.func,
    eduIdx:propstypes.number,
    setEduIdx:propstypes.func,
}

export default function Sections(props){
    
    useEffect(() => {
        initTWE({ Collapse });
      }, []);
      
    
    return(
        <div className="text-gray-800 shadow-inner  dark:border-neutral-950 dark:text-white dark:bg-zinc-700 "  id="accordionFlushExample">
        
        <About aboutobj={props.about} setAbout={props.setAbout} />
        <Skills 
        skillsobj={props.skills}
        setSkills={props.setSkills}
        skillIdx={props.skillIdx} setSkillIdx={props.setSkillIdx}
        />
        <ProfExp  profExpobj={props.profExp} setProfExp={props.setProfExp}
                  profExpIdx={props.profExpIdx}  setProfExpIdx={props.setProfExpIdx}/>
        <Education eduobj={props.edu} setEdu={props.setEdu}
                   eduIdx={props.eduIdx} setEduIdx={props.setEduIdx} />
      </div>
    );
}