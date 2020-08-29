exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    let isPublic = true;


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'aws::ecr::types::getrepositorypolicyresponse') {
                

        try {

            if (_.has(resource.properties, 'policy_text') && !String(resource.properties.policy_text).includes('*')) {
                isPublic = false;
                }


            if (isPublic) {
                problems.push({
                    message: `AWS ECR : ${resource.name} has a publicly set policy`
                })
            }

            }

        catch(e) {
            if (e instanceof TypeError) {
                
                console.error(e.message);
                console.log('Ensure Policy Text is properly parsed or is available\n');
            } else {
                console.error(e.message);
            }  
        
        }

        finally{

            continue

        }

            }
        }
    }
    return problems


    
}