import '../styles/skillstyle.css';
import propstypes from "prop-types";
import { useState , useEffect, useRef } from 'react';
Skills.propTypes = {
    skillsobj: propstypes.array,
    setSkills: propstypes.func,

}

export default function Skills({ skillsobj, setSkills }) {
    const [dispAddBox, setDispAddBox] = useState([]);
    const [showTitle, setShowTitle] = useState([]);
    const [showAdd, setShowAdd] = useState([<button key={"addbtn"} id="addskillbtn" onClick={handleAdd}>add</button>]);
    const [showEdit, setShowEdit] = useState([]);
    const [action, setAction] = useState(false);
    const [updatedVal,setUpdatedVal]=useState({title:"",list:""});
    let active=useRef(false);
    let addnew={};
    let index_now=useRef(0);
    let Updated_copy=useRef([]);
    //useRef is used to keep track of a variable it wont change after the re-render
    //the use effect is called every time react re-renders
    useEffect(() => {
        if (skillsobj) {
         Updated_copy.current=[];
         permanent_skill(skillsobj);
         if (active.current==true){
            generateinputs(index_now.current-1);
         }
         
        }

       }, [skillsobj]);
    function handleAdd() {
       
        addnew = {
            sktitle: "",
            sklist: "",
            id: crypto.randomUUID(),
            index:index_now.current
            //update the index to the last index for the new one
        }
       
        index_now.current=index_now.current+1;
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

    function permanent_skill(skills) {
        setShowTitle([]);
        if (skills.length>0){
        skillsobj.forEach((obj) => {
            let disp=(<div key={crypto.randomUUID()} className="skillDisplay">
            
            <p key={crypto.randomUUID()} id={obj["index"]}>{obj["sktitle"]}</p>
            
            <div>
                <button onClick={(e) => edit_skill(obj["index"])}>edit</button>
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

    function generateinputs(idx) {
        setDispAddBox((prev) => {
            let newele = skillsobj.map((obj) => {
                // let labels=["sktitle","sklist","id",'index'];
                // <button id="add_permanent_skill" onClick={(e) =>{ setAction(false); permanent_skill(); }}>add now</button>

                if (idx == obj["index"]) {
                    return (<>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["sktitle"]} placeholder={"sktitle"} type="text" value={obj["index"]["sktitle"]} onChange={(e) => { handleChange(e) }} />
                        <textarea data-index={obj["index"]} id={obj["sklist"]} placeholder={"sklist"} value={obj["index"]["sklist"]} onChange={(e) => { handleChange(e) }} />
                        <button id="add_permanent_skill" onClick={(e) =>{ setAction(false); }}>add now</button>
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

                        <input key={crypto.randomUUID()} data-index={obj["index"]} id="title"  type="text"  defaultValue={obj["sktitle"]} onChange={(e)=>{update_val(idx,e.target.id,e.target.value)}} />
                        <textarea data-index={obj["index"]}  id="list"  defaultValue={obj["sklist"]} onChange={(e)=>{update_val(idx,e.target.id,e.target.value)}}    />
                        <button  onClick={(e)=>{setAction(false)}} >cancel</button>
                        <button onClick={(e)=>{update_skill(idx)}} >update</button>
                    </>
                );
            }
        });
        initia_update(idx)
        setShowEdit([dispedit]);
        
    }
    //here make the delete work tomorrow
    const removeItem = (id) => {
        setSkills(prev => prev.filter((el) => el.index !== id));         
    };
    
    function initia_update(idx){
        let vals=updatedVal;
        skillsobj.map((obj) => {
            if (idx == obj["index"]) {
                vals["title"]=obj["sktitle"];
                vals["list"]=obj["sklist"];
            }
        });
        setUpdatedVal(prev => ({
            
            ...vals
          }));
    }
    const update_val=(idx,id,val)=>{
        // iam changing the initia_update to be called inside 
        // the edit function itself avoid duplication while updating
        let vals=updatedVal;
        vals[id]=val;
        setUpdatedVal(prev => ({
            ...prev,
            ...vals
          }));
    }
    function update_skill(idx){  
        skillsobj.map((obj) => {
            if (idx == obj["index"]) {
                obj["sktitle"] = updatedVal["title"];
                obj["sklist"] = updatedVal["list"];
            }
        })
        let changeskills=[...skillsobj]
        
        //******problem is here it is updating but not the display in the displayskills and in the disptitle
        setSkills(changeskills);
        setAction(false);
    }
    function render_disp() {

        if (action == false) {
            return (
                <>
                    <h1>Skills</h1>
                    {showTitle}
                    {showAdd}
                </>
            );
        }
        else if (action == "dispAddBox") {

            return (
                <>
                    <h1>Skills</h1>
                    {dispAddBox}
                </>
            );
        }
        else if (action == "showEdit") {
            return (
                <>
                    <h1>Skills</h1>
                    {showEdit}
                </>
            );
        }
    }

    return (action == false ? render_disp() : render_disp());
    
}