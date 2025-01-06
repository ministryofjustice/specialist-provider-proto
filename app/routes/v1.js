const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/v1')

const version = 'v1'

router.get('/test1', function(request, response) {
    response.send('test1')
})


router.post('/category_of_law_answer', function(request, response) {

    var clientProblem = request.session.data['clientProblem']
    if (clientProblem == "Discrimination"){
        response.redirect('/' + version + '/change_answer/scope/discrimination_type')
    } else {
        response.redirect('/' + version + '/change_answer/scope/out_of_scope')
    }
})

router.post('/type_of_discrimination_answer', function(request, response) {

    var typeofdiscrimination = request.session.data['typeOfDiscrimination']
    if (typeofdiscrimination  == "Direct Discrimination" || typeofdiscrimination  ==  "Indirect Discrimination" || typeofdiscrimination  ==  "Victimisation"|| typeofdiscrimination  ==  "Harrassment" ){
        response.redirect('/' + version + '/change_answer/scope/discrimination_basis')
    } else {
        response.redirect('/' + version + '/change_answer/scope/discrimination_location')
    }
})

router.post('/basis_of_discrimination_answer', function(request, response) {

    var basisofdiscrimination = request.session.data['typeOfDiscrimination']
    if (basisofdiscrimination == "ageOver18"){
        response.redirect('/' + version + '/change_answer/scope/discrimination_location')
    } else {
        response.redirect('/' + version + '/change_answer/scope/discrimination_location')
    }
})

router.post('/financial_eligibility_answer', function(request, response) {

    var financiallyEligibile = request.session.data['financiallyEligibile']
    if (financiallyEligibile  == "yes"){
        response.redirect('/' + version + '/cases/accepted/case1/financial_eligibility')
    } else {
        response.redirect('/' + version + '/cases/accepted/case1/financial_eligibility')
    }
})