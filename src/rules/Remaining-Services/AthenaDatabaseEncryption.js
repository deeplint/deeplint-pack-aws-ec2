exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEncrypted = false;

                try {

                if (resource.type === 'aws::athena::types::encryptionconfiguration') {
                


                if (_.has(resource.properties, 'encryption_option') && resource.properties.encryption_option != "")
                {

                    isEncrypted = true
                    continue 
                }


            }
            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isEncrypted) {
                    problems.push({
                        message: `AWS Athena: ${resource.name} does not have the encryption enabled for the data in rest`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}