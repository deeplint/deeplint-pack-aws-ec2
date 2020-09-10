exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isHTTPS = true;

                try {

                if (resource.type === 'aws:::cloudFront::types::defaultcachebehavior') {
                


                if (_.has(resource.properties, 'viewer_protocol_policy') && resource.properties.viewer_protocol_policy == "allow-all")
                {

                    isHTTPS = false
                    continue 
                }


            }
            

            //This is not mentioned in the AWS documentation but including since it is referred in the repo
            if (resource.type === 'aws:::cloudFront::types::orderedcachebehavior') {
                


                if (_.has(resource.properties, 'viewer_protocol_policy') && resource.properties.viewer_protocol_policy == "allow-all")
                {

                    isHTTPS = false
                    continue 
                }


            }


            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isHTTPS) {
                    problems.push({
                        message: `AWS Cloudfront Distribution ViewerProtocolPolicy of: ${resource.name} is not set to HTTPS`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}