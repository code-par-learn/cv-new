import propstypes from "prop-types";
import { useState , useEffect, useRef } from 'react';
Education.propTypes = {
    eduobj: propstypes.array,
    setEdu: propstypes.func,

}
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function Education({eduobj,setEdu,eduIdx,setEduIdx}){
   
    const [dispAddBox, setDispAddBox] = useState([]);
    const [showTitle, setShowTitle] = useState([]);
    const [showAdd, setShowAdd] = useState([<button className='add_btn2' key={"addbtn"} id="addskillbtn" onClick={handleAdd}><FaPlus  value={{ size:"2em"}} /></button>]);
    const [showEdit, setShowEdit] = useState([]);
    const [action, setAction] = useState(false);
    const [temp,setTemp]=useState({institution: "",degree: "",startDate:"",endDate:"",region:""});
    let active=useRef(false);
   
    useEffect(() => {
        if (eduobj) {
         update_showtitle(eduobj);
         if (active.current==true){
           
            open_addIp(eduIdx-1);
         }
         
        }

       }, [eduobj]);

      
       function handleAdd() {
       
        let addnew = {
            institution:"",
            degree:"",
            startDate:"",
            endDate:"",
            region:"",
            id: crypto.randomUUID(),
            index:eduIdx
            
        }
        setEduIdx(eduIdx+=1)
        
        setEdu(prev=>[...prev,addnew]);
        active.current=true;
        setAction("dispAddBox");
       
    }
    function handleChange(e) {
        let changeskills = [...eduobj];

        let Index = e.target.getAttribute("data-index");

        changeskills.map((obj) => {
            if (Number(Index) == obj["index"]) {
                obj[e.target.placeholder]=e.target.value;
            }
        })
        setEdu(changeskills);
}

    function update_showtitle(skills) {
        setShowTitle([]);
        if (skills.length>0){
           
        eduobj.forEach((obj) => {
            let disp=(<div key={crypto.randomUUID()} className="skillDisplay disp_spacing">
            
            <p key={crypto.randomUUID()} id={obj["index"]}>{obj["degree"]}</p>
            
            <div className='flex flex-row gap-2.5 justify-evenly'>
                <button onClick={(e) => edit_profExp(obj["index"])}><MdOutlineModeEditOutline /></button>
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
            let newele = eduobj.map((obj) => {
                if (idx == obj["index"]) {
                    return (<> 
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["institution"]} placeholder={"institution"} type="text" value={obj["index"]["institution"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["degree"]} placeholder={"degree"} type="text" value={obj["index"]["degree"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["startDate"]} placeholder={"startDate"} type="text" value={obj["index"]["startDate"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["endDate"]} placeholder={"endDate"} type="text" value={obj["index"]["endDate"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["region"]} placeholder={"region"} type="text" value={obj["index"]["region"]} onChange={(e) => { handleChange(e) }} />
                        <div className='flex flex-row justify-evenly'>
                        <button id="cancel_btn" onClick={(e)=>{removeItem(idx); setAction(false)}} >Cancel</button>
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
    function edit_profExp(idx) {
        setAction("showEdit");                                                  
        let dispedit=eduobj.map((obj) => {
            if (idx == obj["index"]) {
                return (
                    <>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="institution"  type="text" defaultValue={obj["institution"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="degree" type="text" defaultValue={obj["degree"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="startDate" type="text" defaultValue={obj["startDate"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="endDate"  type="text" defaultValue={obj["endDate"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="region"  type="text" defaultValue={obj["region"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <div className='flex flex-row justify-evenly'>
                        <button  onClick={(e)=>{setAction(false)}} >cancel</button>
                        <button onClick={(e)=>{update_profExp(idx)}} >update</button>
                        </div>
                    </>
                );
            }
        });
        set_temp(idx)
        setShowEdit([dispedit]);
        
    }
   
    const removeItem = (id) => {
        setEdu(prev => prev.filter((el) => el.index !== id));         
    };
    
    function set_temp(idx){
        let vals=temp;  
        eduobj.map((obj) => {
            if (idx == obj["index"]) {
                vals["institution"]=obj["institution"];
                vals["degree"]=obj["degree"];
                vals["startDate"]=obj["startDate"];
                vals["endDate"]=obj["endDate"];
                vals["region"]=obj["region"];
            }
        });
        setTemp(prev => ({
            
            ...vals
          }));
    }
    const update_temp=(id,val)=>{
      
        let vals=temp;
        vals[id]=val;
        setTemp(prev => ({
            ...prev,
            ...vals
          }));
    }
    function update_profExp(idx){  
        eduobj.map((obj) => {
            if (idx == obj["index"]) {
                obj["institution"] = temp["institution"];
                obj["degree"] = temp["degree"];
                obj["startDate"]=temp["startDate"];
                obj["endDate"]=temp["endDate"];
                obj["region"]=temp["region"];
            }
        })
        let changeskills=[...eduobj]
        
        setEdu(changeskills);
        setAction(false);
    }
    function render_disp() {
         return(
            <div className="rounded-none border border-e-0 border-s-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
            <h2 className="mb-0" id="flush-headingFour">
              <button className="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white  [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 " 
              type="button" 
              data-twe-collapse-init 
              data-twe-collapse-collapsed 
              data-twe-target="#flush-collapseFour" 
              aria-expanded="false" 
              aria-controls="flush-collapseFour">
              Education
                <span className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div id="flush-collapseFour" 
            className="!visible hidden border-0" 
            data-twe-collapse-item 
            aria-labelledby="flush-headingFour" 
            data-twe-parent="#accordionFlushExample">
              <div className="dark:text-white dark:bg-zinc-700 flex flex-col px-5 py-4 gap-5">
              {action == false ? <> {showTitle} {showAdd} </> : action == "dispAddBox" ?<>{dispAddBox} </>  : action == "showEdit" ?<>{showEdit}</> : false }
              </div>
            </div>
          </div>
         )
        
    }
     
    return (action == false ? render_disp() : render_disp());
    

}