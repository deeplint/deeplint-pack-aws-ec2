exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isAuthEnabled = true;

                try {

                if (resource.type === 'aws::apigateway::types::accesslogsettings') { //apigateway v2 does not have this resource

                    if ((_.has(resource.properties, 'authorization_type') && resource.properties.authorization_type == "NONE") && (_.has(resource.properties, 'http_method') && resource.properties.http_method != "OPTIONS"))
                    {

                        isAuthEnabled = false
                        continue 
                    }


            }




            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isAuthEnabled) {
                    problems.push({
                        message: `AWS APi Gateway: ${resource.name} has open access to backend resources through API`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}