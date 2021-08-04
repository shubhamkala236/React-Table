import React,{ useState,useEffect } from 'react'
import MaterialTable from 'material-table';



// const userdata = [
//     {name:"shubham",username:'shinegami',email:'lol@gmail.com',phone:'2313132',website:'slol@gmal.com'}
// ]


export const Table = () => {
    
    
//    const [data, setdata] = useState(userdata)
   const [data, setdata] = useState([])
    
    
    const columns = [
        {
            title:'Name', field:'name'
        },
        {
            title:'Username', field:'username'
        },
        {
            title:'Email', field:'email'
        },
        {
            title:'Phone', field:'phone'
        },
        {
            title:'Website', field:'website'
        }
    ]

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res)=>res.json())
        // .then(res=>console.log(res));
        .then(res=>{
            console.log(res);
            setdata(res)});
    }, [])



      

 return (
        <div>
            <MaterialTable 
            title="User Table"
            data={data}

            columns={columns}

            editable={{
                onRowAdd:(newRow)=> new Promise((resolve,reject)=>{
                    const updatedRows = [...data,newRow]
                    console.log(newRow);
                    setTimeout(() => {
                        setdata(updatedRows);
                        resolve(); 
                    }, 2000);
                   
                }),
                
                onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
                const index = selectedRow.tableData.id;
                const updatedRows =[...data]
                updatedRows.splice(index,1)
                setTimeout(() => {
                    setdata(updatedRows);
                    resolve();
                    
                }, 2000);
                }),

                onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{

                    const index = oldRow.tableData.id;
                    const updatedRows = [...data];
                    updatedRows[index]= updatedRow;
                    setTimeout(() => {
                        setdata(updatedRows);
                        resolve();
                        
                    }, 2000);
                    })


                //     console.log("updateRow",updatedRow);
                //     console.log("oldRow",oldRow);
                // })

            }}

            options={{
                actionColumnindex:-1,addRowPosition:"first"
            }}
            
            />

        </div>
    )
}


