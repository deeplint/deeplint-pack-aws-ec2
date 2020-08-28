exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')



    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            if (resource.type === 'aws::ec2::types::ebsinfo') {
                let encSupported = false;

                if (_.has(resource.properties, 'encryption_support') && resource.properties.encryption_support =="supported") {
                    encSupported = true;
                }
                if (encSupported) {
                    problems.push({
                        message: `AWS EBS : ${resource.name} does not support encryption`
                    })
                }
            }
        }
    }
    return problems


    
}