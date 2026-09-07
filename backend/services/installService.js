import query from  '../config/db.config.js'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const install =async ()=>{   
    // read the sql file and store it in a variable
    const queryfile = __dirname + '/sql/initial-queries.sql';
        console.log("file ===============",queryfile)
        
        // create temporary variable to hold the all  sql queries, the return message of the install service
        let queries = [];
        let finalMessage = {};
        let templine='';
        // read the sql file and store it in a variable
       const  lines=  fs.readFileSync(queryfile, 'utf8').split('\n');
    
    //    create the promiss to handle the async function to create the database and tables
        const executed = await new Promise ((resolve, reject) => {
            // iterate over all lines in the sql file and execute each query
            lines.forEach((line) => {
                // skip comments and empty lines
                if (line.startsWith('--') || line.trim() === '') {
                    return;
                }
               templine += line;
                // check if the line ends with a semicolon, which indicates the end of a query
                if (line.trim().endsWith(';')) {
                    // if it has a semicolon its the end of the query, so we can execute it
                //    prepare individual query to be executed
                   const sqlQuery = templine.trim();
                //    add aquery to the list of queries to be executed
                queries.push(sqlQuery);
                templine = '';}
                });
                resolve("queries executed successfully");
            });
            
        //  loop through the queries and execute them one by one asynchronously
        for(let i=0;i<queries.length; i++){
            try{
              const result = await query(queries[i]);
              console.log('table created')
            }catch(err){
                finalMessage.message="not able to create the database and tables";
            }
    }
    // prepare the final message to be send to the controller
    if(finalMessage.message){
        finalMessage.status=500;
    }else{
        finalMessage.message="database and tables created successfully";
        finalMessage.status=200;
    }
    // return the final message to the controller
    return finalMessage;
    }
   
   


export default install