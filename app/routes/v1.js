const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/v1')

const version = 'v1'

router.get('/test1', function(request, response) {
    response.send('test1')
})

//Scope (Discrimination) Routes

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

//Financial eligibility routes


router.post('/financial_eligibility_answer', function(request, response) {

    var financiallyEligibile = request.session.data['financiallyEligibile']
    if (financiallyEligibile  == "yes"){
        response.redirect('/' + version + '/cases/accepted/case1/financial_eligibility_b')
    } else {
        response.redirect('/' + version + '/cases/accepted/case1/financial_eligibility_b')
    }
})


//Rejection flow routes

router.post('/reject-case', function(request, response) {
    response.redirect('/' + version + '/case_actions/reject_case_reason')
})

router.post('/reject_case_reason', function(request, response) {
    response.redirect('/' + version + '/case_actions/reject_case_feedback')
})


// close case notification

router.post('/close-case', function(request, response) {
    response.redirect('/' + version + '/home/closed')
    })

router.get('/home/closed', function(request, response) {

    if (request.session.data['close-case']){
        delete request.session.data['close-case']
      }
      response.render('/' + version + '/home/closed')
})

// reject case notification

router.post('/reject_case_feedback', function(request, response) {
    response.redirect('/' + version + '/home/closed')
})

router.get('/home/closed', function(request, response) {

    if (request.session.data['reject-case']){
        delete request.session.data['reject-case']
      }
      response.render('/' + version + '/home/closed')
})

router.post('/feedback-case', function(request, response) {
    response.redirect('/' + version + '/case_actions/case_feedback')
})

//reopen case notification


router.post('/reopen_case', function(request, response) {
    response.redirect('/' + version + '/cases/accepted/case1/clientdetails')
})

router.get('/cases/accepted/case1/clientdetails', function(request, response) {

    if (request.session.data['reopen-case']){
        delete request.session.data['reopen-case']
      }
      response.render('/' + version + '/cases/accepted/case1/clientdetails')
})

//split case notification

router.post('/split_case', function(request, response) {
    response.redirect('/' + version + '/home/new')
})

router.get('/home/new', function(request, response) {

    if (request.session.data['split-case']){
        delete request.session.data['split-case']
      }
      response.render('/' + version + '/home/new')
})

