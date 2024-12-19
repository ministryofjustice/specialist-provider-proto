const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/v1')

const version = 'v1'

router.get('/test1', function(request, response) {
    response.send('test1')
})
