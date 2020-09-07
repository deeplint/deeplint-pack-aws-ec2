exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    allowedProtocols =[ 'HTTPS', 'SSL']
    allowedProtocolsV2 =[ 'HTTPS', 'TLS']

    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEncryptionEnabled = false;

                try {

                if (resource.type === 'aws::elasticloadbalancing::types::listener') {

                if (_.has(resource.properties, 'protocol') && resource.properties.protocol.indexOf(allowedProtocols))
                {

                    isEncryptionEnabled = true
                    continue 
                }

                else if (resource.type === 'aws::elasticloadbalancingv2::types::listener') {

                    if (_.has(resource.properties, 'protocol') && resource.properties.protocol.indexOf(allowedProtocolsV2))
                    {
    
                        isEncryptionEnabled = true
                        continue 
                    }

                    else if (_.has(resource.properties, 'protocol') && resource.properties.protocol == 'HTTP')
                        {
                                //No check for action type as it is required
                                // Was not sure how JS would react, therefore, left all the step by step checks, the first 3 checks could be omitted.
                        if (_.has(resource.properties, 'default_action') && resource.properties.default_action.type ==  'redirect' && _.has(resource.properties.default_action, 'redirect_config' && _.has(resource.properties.default_action.redirect_config, 'protocol') && resource.properties.default_action.redirect_config.protocol == "HTTPS"))  
                            {

                                isEncryptionEnabled = true
                                continue 

                            }

                        }
                


                }
            }
            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isEncryptionEnabled) {
                    problems.push({
                        message: `AWS Load Balancer: ${resource.name} does not have encryption enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}