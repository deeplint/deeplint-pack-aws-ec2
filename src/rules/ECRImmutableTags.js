exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')



    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'aws::ecr::types::repository') {
                let isImmutable = false;

                if (_.has(resource.properties, 'image_tag_mutability') && resource.properties.image_tag_mutability =="IMMUTABLE") {
                    isImmutable = true;
                }
                if (isImmutable) {
                    problems.push({
                        message: `AWS ECR : ${resource.name} does not have push scan enabled`
                    })
                }
            }
        }
    }
    return problems


    
}