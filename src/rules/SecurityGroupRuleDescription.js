exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')



    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'aws::ec2::securitygroup') {
                let isDescribed = false;


             try{   

                if (_.has(resource.properties, 'description') && resource.properties.description !="") {
                    isDescribed = true;
                }


            }
            
            catch(e) {

                    console.error(e.message);

            }

            finally{
                if (isDescribed) {
                    problems.push({
                        message: `AWS Security Group : ${resource.name} does not have a description`
                    })
                }
                    continue
        
            }

            }
        }
    }
    return problems


    
}