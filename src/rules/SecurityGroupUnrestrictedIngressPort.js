exports.check = async function (context, port) { //integer
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')



    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'awsfms::types::securitygroupruledescription') {
                let isAllowed = false;


             try{

                if(_.has(resource.properties, 'ipv4_range') && resource.properties.ipv4_range =="0.0.0.0/0")
                {
                    if(_.has(resource.properties, 'from_port') && resource.properties.from_port ==-1)
                        { 
                            break //false, no need to check the second statement 
                        }

                    if (_.has(resource.properties, 'from_port' && resource.properties.from_port <=port)  || (resource.properties, 'to_port') && resource.properties.to_port >=port) {
                        
                        isAllowed = true;
                    }
      
                }
            }
            
            catch(e) {

                    console.error(e.message);

            }

            finally{

                //might perform faster here under finally block, to be checked and compared

                if (isAllowed) {
                    problems.push({
                        message: `AWS Security Group : ${resource.name} has the port ${port} open to public`
                    })
                }

                    continue

                    
        
            }

            }
        }
    }
    return problems


    
}