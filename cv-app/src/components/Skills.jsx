import '../styles/skillstyle.css';
import propstypes from "prop-types";
import { useState } from 'react';
Skills.propTypes = {
    skillsobj: propstypes.array,
    setSkills: propstypes.func,

}

export default function Skills({ skillsobj, setSkills }) {
    console.log(typeof skillsobj);
    console.log("hi");
    console.log(skillsobj);
    const [dispAddBox, setDispAddBox] = useState([]);
    const [showTitle, setShowTitle] = useState([]);
    const [showAdd, setShowAdd] = useState([<button key={"addbtn"} id="addskillbtn" onClick={handleAdd}>add</button>]);
    const [showEdit, setShowEdit] = useState([]);
    const [action, setAction] = useState(false);
    const [updatedVal,setUpdatedVal]=useState({title:"",list:""});
    let call_initate=false;
    let index_now=0;
    function handleAdd() {
       
        let addnew = {
            sktitle: "",
            sklist: "",
            id: crypto.randomUUID(),
            index:index_now
            //update the index to the last index for the new one
        }
       
        index_now+=1
        console.log(index_now);
        skillsobj.push(addnew);
        setSkills(skillsobj);

        setAction("dispAddBox");
        return (generateinputs(addnew.index));
    }

    function handleChange(e) {
        let changeskills = [...skillsobj];

        let Index = e.target.getAttribute("data-index");

        //changeskills[Number(Index)][e.target.placeholder] = e.target.value;
        changeskills.map((obj) => {
            if (Number(Index) == obj["index"]) {
                obj[e.target.placeholder]=e.target.value;
            }
        })
        setSkills(changeskills);
        
        console.log(skillsobj)
        

    }

    function permanent_skill() {
        
        setShowTitle([]);
        console.log("insinde");
        console.log(skillsobj);
        if (skillsobj.length>0){
        skillsobj.forEach((obj) => {
            let disp=(<div key={crypto.randomUUID()} className="skillDisplay">
            
            <p key={crypto.randomUUID()} id={obj["index"]}>{obj["sktitle"]}</p>
            
            <div>
                <button onClick={(e) => edit_skill(obj["index"])}>edit</button>
                <button onClick={(e) => delete_skill(obj["index"])}>Delete</button>
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
    console.log(showTitle);
    }

    function generateinputs(idx) {

        setDispAddBox((prev) => {
            let newele = skillsobj.map((obj) => {
                // let labels=["sktitle","sklist","id",'index'];
                if (idx == obj["index"]) {
                    return (<>
                        <input key={crypto.randomUUID()} data-index={obj["index"]} id={obj["sktitle"]} placeholder={"sktitle"} type="text" value={obj["index"]["sktitle"]} onChange={(e) => { handleChange(e) }} />
                        <textarea data-index={obj["index"]} id={obj["sklist"]} placeholder={"sklist"} value={obj["index"]["sklist"]} onChange={(e) => { handleChange(e) }} />
                        <button id="add_permanent_skill" onClick={(e) =>{ setAction(false); permanent_skill(); }}>add now</button>
                    </>
                    );
                }
            });

            return ([

                newele
            ]
            );
        })


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
        
        setShowEdit([dispedit]);
        console.log("edit"); 
    }
    //here make the delete work tomorrow
    const delete_skill = (index) => {
        let i=0;
        let idx=0;
        skillsobj.map((obj)=>{
            if (index == obj["index"]) {
                idx=i;
            }
            i+=1
            
        }
        )
        //make direct changes on skillsonj other than deleteobj
        /*
        console.log(idx);
        let deleteobj=[...skillsobj];
        deleteobj.splice(idx, 1);
        console.log('not up');
        console.log(deleteobj);
        setSkills((prev)=>{
            return(deleteobj)});
            */
        console.log(idx);
        skillsobj.splice(idx,1);
        console.log('not up');
        console.log(skillsobj);
        setSkills((prev)=>{
            return(skillsobj)});
           
        //the delete is not disp crtly if the last ele is 
        //deleted so we make this
        //the above code works for just delete
        permanent_skill();
        console.log(skillsobj);
      }
    function dupe(){
      
       
            let addnew = {
                sktitle: "",
                sklist: "",
                id: crypto.randomUUID(),
                index:index_now
                //update the index to the last index for the new one
            }
           
            index_now+=1
            skillsobj.push(addnew);
            setSkills(skillsobj);
    }
    
    function initia_update(idx){
        let vals=updatedVal;
        vals["title"]=skillsobj[idx]["sktitle"];
        vals["list"]=skillsobj[idx]["sklist"];
        setUpdatedVal(prev => ({
            ...vals
          }));
        console.log(updatedVal);
        call_initate=true;
    }
    const update_val=(idx,id,val)=>{
        if (call_initate==false){
            initia_update(idx);
        }

        let vals=updatedVal;
        vals[id]=val;
        setUpdatedVal(prev => ({
            ...prev,
            ...vals
          }));
        
        console.log(updatedVal);
    }
    function update_skill(idx){
        console.log("hey ther");
        let Updateskills = [...skillsobj];
        Updateskills[idx]["sktitle"] = updatedVal["title"];
        Updateskills[idx]["sklist"] = updatedVal["list"];

        setSkills(Updateskills);
        permanent_skill();
        console.log("called permanent skills");
        setAction(false);
        call_initate=false;

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