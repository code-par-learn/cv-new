//we have to asemble the sections of the cv here using import
//About , Skills,Professional_experience,Projects,Education,Achievements 
import About from "./About";
import propstypes from "prop-types";
import Skills from "./Skills";
Sections.propTypes={
    about:propstypes.object,
    setAbout:propstypes.func,
    skills:propstypes.array,
    setSkills:propstypes.func
}
export default function Sections({about,setAbout,skills,setSkills}){
    return(
        <>
    
        <About 
        aboutobj={about}
        setAbout={setAbout}
        />
        <Skills 
        skillsobj={skills}
        setSkills={setSkills}
        />
        
        </>
    );
}