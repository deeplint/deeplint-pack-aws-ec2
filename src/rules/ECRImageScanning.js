exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')



    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'aws::ecr::types::imagescanningconfiguration') {
                let isScanEnabled = false;

                if (_.has(resource.properties, 'scan_on_push') && resource.properties.scan_on_push ==true) {
                    isScanEnabled = true;
                }
                if (isScanEnabled) {
                    problems.push({
                        message: `AWS ECR : ${resource.name} does not have push scan enabled`
                    })
                }
            }
        }
    }
    return problems


    
}