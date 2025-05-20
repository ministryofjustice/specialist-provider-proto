const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/v2')
const cookieParser = require('cookie-parser');

const version = 'v2'

router.get('/test1', function (request, response) {
    response.send('test1')
})

// Middleware to parse cookies
router.use(cookieParser());

router.use((request, response, next) => {
    // if cookie exists assign it to `caseSelected` in session data
    if (request.cookies.cookieValueForCaseSelected) {
        request.session.data['caseSelected'] = request.cookies.cookieValueForCaseSelected;
    }

    // Make `caseSelected` available in all templates, if it exists
    response.locals.caseSelected = request.session.data['caseSelected'] || null;

    next();
});

//Thirdparty Route
router.post('/thirdparty_answer', function (request, response) {

    var passphrase = request.session.data['thirdPartySpokenToClient']
    if (passphrase == "yes") {
        response.redirect('/' + version + '/cases/new/case1/clientdetails')
    } else {
        response.redirect('/' + version + '/change_answer/client_details/client_thirdparty_nopassphrase.html')
    }
})

//Scope (Discrimination) Routes
router.post('/category_of_law_answer', function (request, response) {

    var clientProblem = request.session.data['clientProblem']
    if (clientProblem == "Discrimination") {
        response.redirect('/' + version + '/change_answer/scope/discrimination_type')
    } else {
        response.redirect('/' + version + '/change_answer/scope/out_of_scope')
    }
})

router.post('/type_of_discrimination_answer', function (request, response) {

    var typeofdiscrimination = request.session.data['typeOfDiscrimination']
    if (typeofdiscrimination == "Direct Discrimination" || typeofdiscrimination == "Indirect Discrimination" || typeofdiscrimination == "Victimisation" || typeofdiscrimination == "Harrassment") {
        response.redirect('/' + version + '/change_answer/scope/discrimination_basis')
    } else {
        response.redirect('/' + version + '/change_answer/scope/discrimination_location')
    }
})

router.post('/basis_of_discrimination_answer', function (request, response) {

    var basisofdiscrimination = request.session.data['typeOfDiscrimination']
    if (basisofdiscrimination == "ageOver18") {
        response.redirect('/' + version + '/change_answer/scope/discrimination_location')
    } else {
        response.redirect('/' + version + '/change_answer/scope/discrimination_location')
    }
})

//Financial eligibility routes
router.post('/financial_eligibility_answer', function (request, response) {
    const { financiallyEligibile } = request.body;

    const caseSelected = request.cookies.cookieValueForCaseSelected;

    const updateIfNotEmpty = (field, value) => {
        if (value && value.trim() !== '') {
            request.session.data[caseSelected][field] = value;
        }
    };

    updateIfNotEmpty('financiallyEligibile', financiallyEligibile);

    if (financiallyEligibile == "yes") {
        response.redirect('/' + version + '/cases/accepted/case1/financial_eligibility_b')
    } else {
        response.redirect('/' + version + '/cases/accepted/case1/financial_eligibility_b')
    }
})


//Rejection flow routes
router.post('/reject-case', function (request, response) {
    response.redirect('/' + version + '/case_actions/reject_case_reason')
})

router.post('/reject_case_reason', function (request, response) {
    response.redirect('/' + version + '/case_actions/reject_case_feedback')
})


// close case notification
router.post('/close-case', function (request, response) {
    response.redirect('/' + version + '/home/closed')
})

router.get('/home/closed', function (request, response) {

    if (request.session.data['close-case']) {
        delete request.session.data['close-case']
    }
    response.render('/' + version + '/home/closed')
})

// reject case notification
router.post('/reject_case_feedback', function (request, response) {
    response.redirect('/' + version + '/home/closed')
})

router.get('/home/closed', function (request, response) {

    if (request.session.data['reject-case']) {
        delete request.session.data['reject-case']
    }
    response.render('/' + version + '/home/closed')
})

router.post('/feedback-case', function (request, response) {
    response.redirect('/' + version + '/case_actions/case_feedback')
})

//reopen case notification
router.post('/reopen_case', function (request, response) {
    response.redirect('/' + version + '/cases/accepted/case1/clientdetails')
})

router.get('/cases/accepted/case1/clientdetails', function (request, response) {

    if (request.session.data['reopen-case']) {
        delete request.session.data['reopen-case']
    }
    response.render('/' + version + '/cases/accepted/case1/clientdetails')
})

//split case notification
router.post('/split_case', function (request, response) {
    response.redirect('/' + version + '/home/new')
})

router.post('/split_type', function (request, response) {

    var passphrase = request.session.data['splitAreaOfLaw']
    if (passphrase == "splitSelf") {
        response.redirect('/' + version + '/case_actions/split_matterType1')
    } else {
        response.redirect('/' + version + '/case_actions/split_areaOfLaw')
    }
})

router.get('/home/new', function (request, response) {

    if (request.session.data['split-case']) {
        delete request.session.data['split-case']
    }
    response.render('/' + version + '/home/new')
})


//changing details
router.post('/cases/accepted/case1/clientdetails', function (request, response) {
    // extract data from the form submission (request.body)
    const { fullName, phoneNumber, addressLine1, addressLine2, postcode, birthDay, birthMonth, birthYear, email, refCode, niNumber, accessNeeds, urgent, clientVulnerable, thirdPartyName, thirdPartyEmail, thirdPartyPhoneNumber, thirdPartyAddressLine1, thirdPartyAddressLine2, thirdPartyTown, thirdPartyCounty, thirdPartyPostcode, thirdPartyRelationshipToClient, thirdPartyPassphrase, thirdPartySpokenToClient, reasonNotSpoken, thirdPartyResearch, clientAdditionalInfo, thirdParty, urgentReason, clientVulnerableReason } = request.body;

    // get `caseSelected` variable from cookie
    const caseSelected = request.cookies.cookieValueForCaseSelected;

    // get `theFormChangeLinkClicked` variable from cookie
    const theFormChangeLinkClicked = request.cookies.theFormChangeLinkClicked;

    // function to update only if value exists
    const updateIfNotEmpty = (field, value) => {
        if (value && value.trim() !== '') {
            request.session.data[caseSelected][field] = value;
        }
    };

    updateIfNotEmpty('fullName', fullName);
    updateIfNotEmpty('phoneNumber', phoneNumber);
    updateIfNotEmpty('addressLine1', addressLine1);
    updateIfNotEmpty('addressLine2', addressLine2);
    updateIfNotEmpty('postcode', postcode);
    updateIfNotEmpty('email', email);
    updateIfNotEmpty('refCode', refCode);
    updateIfNotEmpty('birthDay', birthDay);
    updateIfNotEmpty('birthMonth', birthMonth);
    updateIfNotEmpty('birthYear', birthYear);
    updateIfNotEmpty('niNumber', niNumber);
    updateIfNotEmpty('thirdPartyName', thirdPartyName);
    updateIfNotEmpty('thirdPartyEmail', thirdPartyEmail);
    updateIfNotEmpty('thirdPartyPhoneNumber', thirdPartyPhoneNumber);
    updateIfNotEmpty('thirdPartyAddressLine1', thirdPartyAddressLine1);
    updateIfNotEmpty('thirdPartyAddressLine2', thirdPartyAddressLine2);
    updateIfNotEmpty('thirdPartyTown', thirdPartyTown);
    updateIfNotEmpty('thirdPartyCounty', thirdPartyCounty);
    updateIfNotEmpty('thirdPartyPostcode', thirdPartyPostcode);
    updateIfNotEmpty('thirdPartyPassphrase', thirdPartyPassphrase);
    updateIfNotEmpty('thirdPartyResearch', thirdPartyResearch);
    updateIfNotEmpty('reasonNotSpoken', reasonNotSpoken);
    updateIfNotEmpty('thirdPartySpokenToClient', thirdPartySpokenToClient);
    updateIfNotEmpty('clientAdditionalInfo', clientAdditionalInfo);
    updateIfNotEmpty('thirdParty', thirdParty);
    updateIfNotEmpty('urgentReason', urgentReason);
    updateIfNotEmpty('clientVulnerableReason', clientVulnerableReason);


    // checkboxes & radios are arrays so have to pick out their values differently
    if (accessNeeds) {
        let cleanedAccessNeeds = Array.isArray(accessNeeds)
            ? accessNeeds.filter(item => !item.includes('_unchecked')) // remove `_unchecked`
            : [accessNeeds];

        request.session.data[caseSelected]['accessNeeds'] = cleanedAccessNeeds;
    }

    if (urgent) {
        let cleanedUrgent = Array.isArray(urgent)
            ? urgent.filter(item => !item.includes('_unchecked'))
            : [urgent];

        request.session.data[caseSelected]['urgent'] = cleanedUrgent;
    }

    if (clientVulnerable) {
        let cleanedClientVulnerable = Array.isArray(clientVulnerable)
            ? clientVulnerable.filter(item => !item.includes('_unchecked'))
            : [clientVulnerable];

        request.session.data[caseSelected]['clientVulnerable'] = cleanedClientVulnerable;
    }

    if (thirdPartyRelationshipToClient) {
        let cleanedThirdPartyRelationshipToClient = Array.isArray(thirdPartyRelationshipToClient)
            ? thirdPartyRelationshipToClient.filter(item => !item.includes('_unchecked'))
            : [thirdPartyRelationshipToClient];

        request.session.data[caseSelected]['thirdPartyRelationshipToClient'] = cleanedThirdPartyRelationshipToClient;
    }

    if (thirdPartySpokenToClient) {
        let cleanedThirdPartySpokenToClient = Array.isArray(thirdPartySpokenToClient)
            ? thirdPartySpokenToClient.filter(item => !item.includes('_unchecked'))
            : [thirdPartySpokenToClient];

        request.session.data[caseSelected]['thirdPartySpokenToClient'] = cleanedThirdPartySpokenToClient;
    }

    // redirect to previous form page
    if (theFormChangeLinkClicked === 'New') {
        response.redirect('/' + version + '/cases/new/case1/clientdetails');
    } else if (theFormChangeLinkClicked === 'Accepted') {
        response.redirect('/' + version + '/cases/accepted/case1/clientdetails');
    } else {
        response.redirect('/' + version + '/cases/closed/case1/clientdetails');
    }
});