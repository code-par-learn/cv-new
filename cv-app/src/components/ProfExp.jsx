import propstypes from "prop-types";
import { useState , useEffect, useRef } from 'react';
ProfExp.propTypes = {
    profExpobj: propstypes.array,
    setProfExp: propstypes.func,

}
export default function ProfExp({profExpobj,setProfExp}){
    const [dispAddBox, setDispAddBox] = useState([]);
    const [showTitle, setShowTitle] = useState([]);
    const [showAdd, setShowAdd] = useState([<button key={"addbtn"} id="addskillbtn" onClick={handleAdd}>add</button>]);
    const [showEdit, setShowEdit] = useState([]);
    const [action, setAction] = useState(false);
    const [temp,setTemp]=useState({compName: "",positionTitle: "",startDate:"",endDate:"",location:"",description:""});
    let active=useRef(false);
    let index_now=useRef(0);

    useEffect(() => {
        if (profExpobj) {
         update_showtitle(profExpobj);
         if (active.current==true){
            open_addIp(index_now.current-1);
         }
         
        }

       }, [profExpobj]);
       function handleAdd() {
       
        let addnew = {
            compName: "",
            positionTitle: "",
            startDate:"",
            endDate:"",
            location:"",
            description:"",
            id: crypto.randomUUID(),
            index:index_now.current
            //update the index to the last index for the new one
        }
       
        index_now.current=index_now.current+1;
        setProfExp(prev=>[...prev,addnew]);
        active.current=true;
        setAction("dispAddBox");
       
    }
    function handleChange(e) {
        let changeskills = [...profExpobj];

        let Index = e.target.getAttribute("data-index");

        changeskills.map((obj) => {
            if (Number(Index) == obj["index"]) {
                obj[e.target.placeholder]=e.target.value;
            }
        })
        setProfExp(changeskills);
}

    function update_showtitle(skills) {
        setShowTitle([]);
        if (skills.length>0){
        profExpobj.forEach((obj) => {
            let disp=(<div key={crypto.randomUUID()} className="skillDisplay">
            
            <p key={crypto.randomUUID()} id={obj["index"]}>{obj["compName"]}</p>
            
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
        /* ,*/
        setDispAddBox((prev) => {
            let newele = profExpobj.map((obj) => {
                if (idx == obj["index"]) {
                    return (<>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["compName"]} placeholder={"compName"} type="text" value={obj["index"]["compName"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["positionTitle"]} placeholder={"positionTitle"} type="text" value={obj["index"]["positionTitle"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["startDate"]} placeholder={"startDate"} type="text" value={obj["index"]["startDate"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["endDate"]} placeholder={"endDate"} type="text" value={obj["index"]["endDate"]} onChange={(e) => { handleChange(e) }} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["location"]} placeholder={"location"} type="text" value={obj["index"]["location"]} onChange={(e) => { handleChange(e) }} />
                        
                        <textarea data-index={obj["index"]} id={obj["description"]} placeholder={"description"} value={obj["index"]["description"]} onChange={(e) => { handleChange(e) }} />
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
        setAction("showEdit");
        let dispedit=profExpobj.map((obj) => {
            if (idx == obj["index"]) {
                return (
                    <>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="compName"  type="text" defaultValue={obj["compName"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="positionTitle" type="text" defaultValue={obj["positionTitle"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="startDate" type="text" defaultValue={obj["startDate"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="endDate"  type="text" defaultValue={obj["endDate"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="location"  type="text" defaultValue={obj["location"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />
                        
                        <textarea data-index={obj["index"]} id="description"  defaultValue={obj["description"]} onChange={(e)=>{update_temp(e.target.id,e.target.value)}} />

                        <button  onClick={(e)=>{setAction(false)}} >cancel</button>
                        <button onClick={(e)=>{update_profExp(idx)}} >update</button>
                    </>
                );
            }
        });
        set_temp(idx)
        setShowEdit([dispedit]);
        
    }
    //here make the delete work tomorrow
    const removeItem = (id) => {
        setProfExp(prev => prev.filter((el) => el.index !== id));         
    };
    
    function set_temp(idx){
        let vals=temp;
        profExpobj.map((obj) => {
            if (idx == obj["index"]) {
                vals["compName"]=obj["compName"];
                vals["positionTitle"]=obj["positionTitle"];
                vals["startDate"]=obj["startDate"];
                vals["endDate"]=obj["endDate"];
                vals["location"]=obj["location"];
                vals["description"]=obj["description"];
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
        profExpobj.map((obj) => {
            if (idx == obj["index"]) {
                obj["compName"] = temp["compName"];
                obj["positionTitle"] = temp["positionTitle"];
                obj["startDate"]=temp["startDate"];
                obj["endDate"]=temp["endDate"];
                obj["location"]=temp["location"];
                obj["description"]=temp["description"];
            }
        })
        let changeskills=[...profExpobj]
        
        //******problem is here it is updating but not the display in the displayskills and in the disptitle
        setProfExp(changeskills);
        setAction(false);
    }
    function render_disp() {

        if (action == false) {
            return (
                <>
                    <h1>Professtional Experience</h1>
                    {showTitle}
                    {showAdd}
                </>
            );
        }
        else if (action == "dispAddBox") {

            return (
                <>
                    <h1>Professtional Experience</h1>
                    {dispAddBox}
                </>
            );
        }
        else if (action == "showEdit") {
            return (
                <>
                    <h1>Professtional Experience</h1>
                    {showEdit}
                </>
            );
        }
    }

    return (action == false ? render_disp() : render_disp());
    

}