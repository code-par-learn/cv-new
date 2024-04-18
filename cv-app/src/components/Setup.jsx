import '../styles/index.min.css';
import Sections from "./Sections";
import Preview from './Preview';
import { useState} from 'react';
import generatePDF from 'react-to-pdf';
import Switcher from "./Switcher";
import { FaPenToSquare } from "react-icons/fa6";

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
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
                        description:"A seasoned Backend Developer, I excel in designing resilient APIs and effectively integrating AWS services, MongoDB, and Cassandra for secure data management My commitment to industry best practices and system optimization has played a pivotal role in driving Apnakonnect's growth and success.",
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
        //<button id="auto_fill" onClick={(e)=>{ auto_fill_clear(e.target.id)}}>Auto fill</button>
        //<button id="clear" onClick={(e)=>{ auto_fill_clear(e.target.id)}}>Clear</button>
        <>
        <div className='flex justify-center items-center'>
            <h1 className='self-center mb-4 text-3xl font-extrabold  md:text-5xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mt-7'>Resume Crafter</h1>
        </div>
        <div  className='  cv-container'>
        <div  className='sections rounded-md dark:border-gray-950 border-gray-400  p-4  dark:text-white dark:bg-zinc-800'>
           
            <div className='gap-2 justify-between inline-flex'>
                <Switcher />
            <div className='flex'>
            <button id="auto_fill" onClick={(e)=>{ auto_fill_clear(e.target.id)}} className="flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <FaPenToSquare style={{ fontSize: '18px' }}/>Auto fill
                </button>
                <button id="clear" onClick={(e)=>{ auto_fill_clear(e.target.id)}} className="flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <RiDeleteBin6Line style={{ fontSize: '18px' }} />Clear
                </button>
                </div>
        
            </div>
            <div className='hgsection  dark:border-neutral-950 dark:text-white dark:bg-zinc-700'>
           <Sections  about={about} setAbout={setAbout}  
                     skills={skills} setSkills={setSkills}
                     skillIdx={skillIdx} setSkillIdx={setSkillIdx} 
                     profExp={profExp} setProfExp={setProfExp}
                     profExpIdx={profExpIdx} setProfExpIdx={setProfExpIdx}
                     edu={edu}        setEdu={setEdu}
                     eduIdx={eduIdx} setEduIdx={setEduIdx}/>
            </div>
        </div>
        <div  className='previewBox rounded-md dark:border-gray-950 border-gray-400 dark:text-white dark:bg-zinc-800' >
            <div><p className='hp flex justify-center'>Preview</p></div>
            <Preview about={about}  skillsobj={skills} profExpobj={profExp} eduobj={edu}/>
            <div id="create_pdf_btn" className='justify-end flex'>
                <button id="pdf_btn"
                className='flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                onClick={
                    ()=>{
                        const pdfTarget =()=>document.getElementById("preview");
                        const pdfContent = pdfTarget();
                        pdfContent.classList.add("print-pdf");
                        generatePDF(pdfTarget, pdfOptions);
                        pdfContent.classList.remove("print-pdf");
                    }
                }
                ><MdDownload style={{ fontSize: '24px' }} /> DownloadPDF</button>
            </div>
            
        </div>
        </div>
        </>
    );
}
