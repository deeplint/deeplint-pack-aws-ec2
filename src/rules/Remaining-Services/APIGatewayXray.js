exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isXrayEnabled = false;

                try {

                if (resource.type === 'aws::apigateway::types::stage') {

                if (_.has(resource.properties, 'tracing_enabled') && resource.properties.protocol.tracing_enabled == true)
                {

                    isXrayEnabled = true
                    continue 
                }


            }
            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isXrayEnabled) {
                    problems.push({
                        message: `AWS API Gateway: ${resource.name} does not have X-Ray enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}