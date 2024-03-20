import propstypes from "prop-types";
import { useState , useEffect, useRef } from 'react';
Education.propTypes = {
    eduobj: propstypes.array,
    setEdu: propstypes.func,

}
export default function Education({eduobj,setEdu,eduIdx,setEduIdx}){
   
    const [dispAddBox, setDispAddBox] = useState([]);
    const [showTitle, setShowTitle] = useState([]);
    const [showAdd, setShowAdd] = useState([<button key={"addbtn"} id="addskillbtn" onClick={handleAdd}>add</button>]);
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

       //institution: "",degree: "",startDate:"",endDate:"",region:""
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
            //institution: "",degree: "",startDate:"",endDate:"",region:""
        eduobj.forEach((obj) => {
            let disp=(<div key={crypto.randomUUID()} className="skillDisplay">
            
            <p key={crypto.randomUUID()} id={obj["index"]}>{obj["degree"]}</p>
            
            <div>
                <button onClick={(e) => edit_profExp(obj["index"])}>edit</button>
                <button id={obj["index"]} onClick={(e) =>removeItem(obj["index"])}>Delete</button>
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
        //institution: "",degree: "",startDate:"",endDate:"",region:"" //institution: "",degree: "",startDate:"",endDate:"",region:""
        setDispAddBox((prev) => {
            let newele = eduobj.map((obj) => {
                if (idx == obj["index"]) {
                    return (<> 
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["institution"]} placeholder={"institution"} type="text" value={obj["index"]["institution"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["degree"]} placeholder={"degree"} type="text" value={obj["index"]["degree"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["startDate"]} placeholder={"startDate"} type="text" value={obj["index"]["startDate"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["endDate"]} placeholder={"endDate"} type="text" value={obj["index"]["endDate"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["region"]} placeholder={"region"} type="text" value={obj["index"]["region"]} onChange={(e) => { handleChange(e) }} />
                        
                        <button id="cancel_btn" onClick={(e)=>{removeItem(idx); setAction(false)}} >Cancel</button>
                        <button id="add_update_showtitle" onClick={(e) =>{ setAction(false); }}>add now</button>
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
        setAction("showEdit");                                                  //institution: "",degree: "",startDate:"",endDate:"",region:""
        let dispedit=eduobj.map((obj) => {
            if (idx == obj["index"]) {
                return (
                    <>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="institution"  type="text" defaultValue={obj["institution"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="degree" type="text" defaultValue={obj["degree"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="startDate" type="text" defaultValue={obj["startDate"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="endDate"  type="text" defaultValue={obj["endDate"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="region"  type="text" defaultValue={obj["region"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        
                        <button  onClick={(e)=>{setAction(false)}} >cancel</button>
                        <button onClick={(e)=>{update_profExp(idx)}} >update</button>
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
        let vals=temp;  //institution: "",degree: "",startDate:"",endDate:"",region:""
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
        // iam changing the set_temp to be called inside 
        // the edit function itself avoid duplication while updating
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

        if (action == false) {
            return (
                <>
                    <h1>Education</h1>
                    {showTitle}
                    {showAdd}
                </>
            );
        }
        else if (action == "dispAddBox") {

            return (
                <>
                    <h1>Education</h1>
                    {dispAddBox}
                </>
            );
        }
        else if (action == "showEdit") {
            return (
                <>
                    <h1>Education</h1>
                    {showEdit}
                </>
            );
        }
    }

    return (action == false ? render_disp() : render_disp());
    

}