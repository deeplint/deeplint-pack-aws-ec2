exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnforced = false;

                try {

                if (resource.type === 'aws::athena::types::workgroupconfiguration') {
                


                if (_.has(resource.properties, 'enforce_work_group_configuration') && resource.properties.enforce_work_group_configuration == true)
                {

                    isEnforced = true
                    continue 
                }


            }
            }
                catch(e) {

                    console.error(e.message);
                }
        
            finally{
                if (!isEnforced) {
                    problems.push({
                        message: `AWS Athena Workgroup: ${resource.name} does not enforce the encryption on clients`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}