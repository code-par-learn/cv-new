import '../styles/skillstyle.css';
import propstypes from "prop-types";
import { useState , useEffect, useRef } from 'react';
import '../styles/tw_index.css';
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
Skills.propTypes = {
    skillsobj: propstypes.array,
    setSkills: propstypes.func,
    skillIdx:propstypes.number,
    setSkillIdx:propstypes.func,

}

export default function Skills({ skillsobj, setSkills ,skillIdx,setSkillIdx }) {
    const [dispAddBox, setDispAddBox] = useState([]);
    const [showTitle, setShowTitle] = useState([]);
    const [showAdd, setShowAdd] = useState([<button className='add_btn2' key={"addbtn"} id="addskillbtn" onClick={handleAdd}><FaPlus  value={{ size:"2em"}} /></button>]);
    const [showEdit, setShowEdit] = useState([]);
    const [action, setAction] = useState(false);
    const [temp,setTemp]=useState({title:"",list:""});
    let active=useRef(false);
  
    
    
    //useRef is used to keep track of a variable it wont change after the re-render
    //the use effect is called every time react re-renders
    useEffect(() => {
        if (skillsobj) {
         update_showtitle(skillsobj);
         if (active.current==true){
            
            open_addIp(skillIdx-1);
          
         }
         
         
        }

       }, [skillsobj]);
    function handleAdd() {
       console.log(skillIdx);
        let addnew = {
            sktitle: "",
            sklist: "",
            id: crypto.randomUUID(),
            index:skillIdx
           
            
        }
       
       
       setSkillIdx(skillIdx+=1); 
      
       setSkills(prev=>[...prev,addnew]);
      
        active.current=true;
        setAction("dispAddBox");
       
    }

    function handleChange(e) {
        let changeskills = [...skillsobj];

        let Index = e.target.getAttribute("data-index");

        changeskills.map((obj) => {
            if (Number(Index) == obj["index"]) {
                obj[e.target.placeholder]=e.target.value;
            }
        })
        setSkills(changeskills);
}

    function update_showtitle(skills) {
        setShowTitle([]);
        /*
            display: flex;
    gap: 10px; 
    min-height: 80px;
    flex-direction: column;
    justify-content: space-between;

        */
        if (skills.length>0){
        skillsobj.forEach((obj) => {
            let disp=(<div key={crypto.randomUUID()} className="skillDisplay disp_spacing">
            
            <p key={crypto.randomUUID()} id={obj["index"]}>{obj["sktitle"]}</p>
            
            <div className='flex flex-row gap-2.5 justify-evenly'>
                <button onClick={(e) => edit_skill(obj["index"])}><MdOutlineModeEditOutline /></button>
                <button id={obj["index"]} onClick={(e) =>removeItem(obj["index"])}><MdDelete /></button>
            </div>
        </div>);
            setShowTitle((prev)=>{
                return ([
                    ...prev,
                    disp
                ]);
            });
        });
    }
   
    }

    function open_addIp(idx) {
       setDispAddBox((prev) => {
            let newele = skillsobj.map((obj) => {
                if (idx == obj["index"]) {
                    return (<>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["sktitle"]} placeholder={"sktitle"} type="text" value={obj["index"]["sktitle"]} onChange={(e) => { handleChange(e) }} />
                        <textarea data-index={obj["index"]} id={obj["sklist"]} placeholder={"sklist"} value={obj["index"]["sklist"]} onChange={(e) => { handleChange(e) }} />
                        <div className='flex flex-row justify-evenly'>
                        <button  id="cancel_btn" onClick={(e)=>{removeItem(idx); setAction(false)}} >Cancel</button>
                        <button id="add_update_showtitle" onClick={(e) =>{ setAction(false); }}>add now</button>
                        </div>
                    </>
                    );
                }
            });

            return ([

                newele
            ]
            );
        })
        active.current=false;

    }
    function edit_skill(idx) {
        setAction("showEdit");
        let dispedit=skillsobj.map((obj) => {
            if (idx == obj["index"]) {
                return (
                    <>

                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="title"  type="text"  defaultValue={obj["sktitle"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <textarea data-index={obj["index"]}  id="list"  defaultValue={obj["sklist"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}}    />
                        <div className='flex flex-row justify-evenly'>
                        <button  onClick={(e)=>{setAction(false)}} >cancel</button>
                        <button onClick={(e)=>{update_skill(idx)}} >update</button>
                        </div>
                    </>
                );
            }
        });
        set_temp(idx)
        setShowEdit([dispedit]);
        
    }
    
    const removeItem = (id) => {
        setSkills(prev => prev.filter((el) => el.index !== id));         
    };
    
    function set_temp(idx){
        let vals=temp;
        skillsobj.map((obj) => {
            if (idx == obj["index"]) {
                vals["title"]=obj["sktitle"];
                vals["list"]=obj["sklist"];
            }
        });
        setTemp(prev => ({
            
            ...vals
          }));
    }
    const update_temp=(id,val)=>{
        // iam changing the set_temp to be called inside 
        // the edit function itself avoid duplication while updating
        let vals=temp;
        vals[id]=val;
        setTemp(prev => ({
            ...prev,
            ...vals
          }));
    }
    function update_skill(idx){  
        skillsobj.map((obj) => {
            if (idx == obj["index"]) {
                obj["sktitle"] = temp["title"];
                obj["sklist"] = temp["list"];
            }
        })
        let changeskills=[...skillsobj]
        
        setSkills(changeskills);
        setAction(false);
    }
    function render_disp() {
       //condition ? <expression if true> : <expression if false>
       //<button className=".btn_dark group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-zinc-700 dark:text-white [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 " type="button" data-twe-collapse-init data-twe-collapse-collapsed data-twe-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
       
       return(
        <div className="rounded-none border border-e-0 border-s-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
        <h2 className="mb-0" id="flush-headingTwo">
          <button className=".btn_dark group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-zinc-700 dark:text-white  [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 " type="button" data-twe-collapse-init data-twe-collapse-collapsed data-twe-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          SKills
            <span className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        </h2>
        <div id="flush-collapseTwo" className="!visible hidden border-0" data-twe-collapse-item aria-labelledby="flush-headingTwo" data-twe-parent="#accordionFlushExample">
          <div className="flex flex-col px-5 py-4 dark:text-white dark:bg-zinc-700 gap-5">
          {action == false ? <> {showTitle} {showAdd} </> : action == "dispAddBox" ?<>{dispAddBox} </>  : action == "showEdit" ?<>{showEdit}</> : false }
          </div>
        </div>
      </div>
        
            
    
       )
}
   
    return (action == false ? render_disp() : render_disp());
    
}