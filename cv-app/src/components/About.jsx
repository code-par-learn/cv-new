import propstypes from "prop-types";

About.propTypes={
    aboutobj:propstypes.object,
    setAbout:propstypes.func,
    inputs:propstypes.array
}

export default function About({aboutobj,setAbout}){
    
    const handleChange=(id,val)=>{
        
       
        aboutobj[id]=val;
        
        setAbout(about => ({
            ...about,
            ...aboutobj
          }));
    }   
       
   
    function Generatefields({inputs}){
        return(
            <>
            {inputs.map((inputI)=>{
                return(
                    <>
                    <label htmlFor={inputI}></label>
                <input id={inputI} placeholder={inputI} type="text" value={aboutobj[inputI]}   onChange={(e)=>{handleChange(e.target.id,e.target.value)}}  />
                    </>
                );
                
    })}
            </>
        );
    }
    let inputs=["name","email","phone","linkedin"];

    return(
        <div className="rounded-none border border-e-0 border-s-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
        <h2 className="mb-0 " id="flush-headingOne">
          <button className="group dark:border-neutral-950 relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white  [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-primary dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 " type="button" data-twe-collapse-init data-twe-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            About
            <span className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        </h2>
        <div id="flush-collapseOne" className="!visible border-0" data-twe-collapse-item data-twe-collapse-show aria-labelledby="flush-headingOne" data-twe-parent="#accordionFlushExample">
          <div className="flex flex-col px-5 py-4 dark:text-white dark:bg-zinc-700 gap-2.5">
          {Generatefields({inputs})}
          </div>
        </div>
      </div>
        
    );

}