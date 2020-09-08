exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isLoggingEnabled = false;

                try {

                if (resource.type === 'aws::apigateway::types::accesslogsettings') {

                    if (_.has(resource.properties, 'destination_arn') && resource.properties.destination_arn != "")
                    {

                        isLoggingEnabled = true
                        continue 
                    }


            }

                else if (resource.type === 'aws::apigatewayv2::types::accesslogsettings') {

                    if (_.has(resource.properties, 'destination_arn') && resource.properties.destination_arn != "")
                    {

                        isLoggingEnabled = true
                        continue 
                    }


            }


            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isLoggingEnabled) {
                    problems.push({
                        message: `AWS APi Gateway: ${resource.name} does not have logging enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}