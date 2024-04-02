import '../styles/index.min.css';
import Sections from "./Sections";
import Preview from './Preview';
import { useState} from 'react';
import generatePDF from 'react-to-pdf';

export default function Setup(){
    const [about,setAbout]=useState({name:"",email:"",phone:"",linkedin:""});
    const [skills,setSkills]=useState([]);
    const [skillIdx,setSkillIdx]=useState(0);
    const [profExp,setProfExp]=useState([]);
    const [profExpIdx,setProfExpIdx]=useState(0);
    const [edu,setEdu]=useState([]);
    const [eduIdx,setEduIdx]=useState(0);
    function auto_fill_clear(id){
        if (id=="auto_fill"){
            //modify the about,skills,profExp,edu all to display the default data              
            let aboutobj={name:"DANI SCHWAIGER",email:"hello@gmail.com",phone:"123-456-7890",linkedin:"dani-schwaiger"}
            
            setAbout(about => ({
                ...about,
                ...aboutobj
              }));
            
            let skillList=[
                {
                    sktitle: "Languages",
                    sklist: "Java, JavaScript, TypeScript, Python, C++, C, HTML, CSS",
                    id: crypto.randomUUID(),
                    index:crypto.randomUUID()
                },
                   
                {
                    sktitle: "Frameworks",
                    sklist: "React JS, Express JS, Next JS, Remix JS, Node JS, Tailwind CSS,GraphQL, Svelte",
                    id: crypto.randomUUID(),
                    index:crypto.randomUUID()
                   
                },
                {
                    sktitle: "Databases",
                    sklist: "Mongo DB, Cassandra, PostgreSQL, Supabase, Sanity, Firebase,AWS Dynamo DB, AWS S3",
                    id: crypto.randomUUID(),
                    index:crypto.randomUUID()
                   
                },
                {
                    sktitle: "Cloud and DevOps",
                    sklist: "Git, Github, Amazon Web Services",
                    id: crypto.randomUUID(),
                    index:crypto.randomUUID()
                   
                }
                ]
            skillList.forEach((obj)=>{
                
                setSkills(prev=>[...prev,obj])
            });
          
            let profexplist=[
                {
                    compName: "Amazon",
                    positionTitle: "Frontend Developer Intern",
                    startDate:"03/2023",
                    endDate:"06/2023",
                    location:" Bengaluru, India",
                    description:"Led research initiatives to seamlessly integrate the Visual Studio Code web client with our Ed-tech platform, reflecting a dedication to adopting cutting-edge technologies for improved user experiences and functionality.",
                    id: crypto.randomUUID(),
                    index:crypto.randomUUID()},
                {
                        compName: "Wipro",
                        positionTitle: "Backend Developer Intern",
                        startDate:"06/2023",
                        endDate:"09/2023",
                        location:" Bengaluru, India",
                        description:"A seasoned Backend Developer, I excel in designing resilient APIs and effectively integrating AWS services, MongoDB, and Cassandra for secure data management •My commitment to industry best practices and system optimization has played a pivotal role in driving Apnakonnect's growth and success.",
                        id: crypto.randomUUID(),
                        index:crypto.randomUUID()}
            ]
            profexplist.forEach((obj)=>{setProfExp(prev=>[...prev,obj])});
            
            let eduList=[
                {
                    institution:"Really Great High School",
                    degree:"SECONDARY SCHOOL",
                    startDate:"2010",
                    endDate:"2014",
                    region:"chennai",
                    id: crypto.randomUUID(),
                    index:crypto.randomUUID()},
                    {
                        institution:"Really Great University",
                        degree:"BACHELOR OF TECHNOLOGY",
                        startDate:"2014",
                        endDate:"2016",
                        region:"Bengaluru",
                        id: crypto.randomUUID(),
                        index:crypto.randomUUID()}
            ];
            eduList.forEach((obj)=>{setEdu(prev=>[...prev,obj])});
           console.log("hey there 1");
        }
        else{
            //clear all the above ds That's all
            let aboutobj={name:"",email:"",phone:"",linkedin:""}
            setAbout(about=>({
                ...about,
                ...aboutobj
            }));
            setSkills([]);
            setProfExp([]);
            setEdu([]);
        }
    }
    const pdfOptions = {
        method: "open",
        filename: 'resume.pdf'
      };
    return(
        <>
        <h1>CV App</h1>
        <div  className='cv-container'>
        <div  className='sections'>
            Sections
            <button id="auto_fill" onClick={(e)=>{ auto_fill_clear(e.target.id)}}>Auto fill</button>
            <button id="clear" onClick={(e)=>{ auto_fill_clear(e.target.id)}}>Clear</button>
           <Sections about={about} setAbout={setAbout}  
                     skills={skills} setSkills={setSkills}
                     skillIdx={skillIdx} setSkillIdx={setSkillIdx} 
                     profExp={profExp} setProfExp={setProfExp}
                     profExpIdx={profExpIdx} setProfExpIdx={setProfExpIdx}
                     edu={edu}        setEdu={setEdu}
                     eduIdx={eduIdx} setEduIdx={setEduIdx}/>
        </div>
        <div  className='previewBox' >
            Preview
            <Preview about={about}  skillsobj={skills} profExpobj={profExp} eduobj={edu}/>
            <div id="create_pdf_btn">
                <button id="pdf_btn"
                onClick={
                    ()=>{
                        const pdfTarget =()=>document.getElementById("preview");
                        const pdfContent = pdfTarget();
                        pdfContent.classList.add("print-pdf");
                        generatePDF(pdfTarget, pdfOptions);
                        pdfContent.classList.remove("print-pdf");
                    }
                }
                >DownloadPDF</button>
            </div>
            
        </div>
        </div>
        </>
    );
}
