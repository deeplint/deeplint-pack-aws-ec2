exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    let isEnabled = false;


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'aws::ecr::types::getrepositorypolicyresponse') {
                

        try {

            if (_.has(resource.properties, 'name') && resource.properties.name == "containerInsights" && _.has(resource.properties, 'value') && resource.properties.value == "enabled") {
                isEnabled = true;
                }

           

            if (!isEnabled) {
                problems.push({
                    message: `AWS ECS : ${resource.name} does not have container Insights enabled`
                })
            }

        }

        catch(e) {
/*             if (e instanceof TypeError) {
                
                console.error(e.message);
                console.log('Could not retrive the value for:\n'+ resource.name+ 'Ensure Policy Text is properly parsed or is available\n');
            } else {
                console.error(e.message);
            }   */

            console.error(e.message);
        
        }

        finally{

            continue

        }

            }
        }
    }
    return problems


    
}