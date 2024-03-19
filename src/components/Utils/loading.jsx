import React from "react";

const Loading = (props) => {

    const load = (!!props.load);

    return (

        <>

            {(!load) ||

                <div>

                    <img className="d-block m-auto tam-load" src={require("assets/img/common/loading.gif")} ></img>

                </div>

            }
            
        </>

    );
    
}

export default Loading;