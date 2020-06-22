import * as common from '../integration/common'
const emailAddress = "newemail@coursedog.com"
const eventName = "Lukasz S"
const startDate = "2020-08-01"
const endDate = "2020-08-02"
const newEventFormHeader = "Request A New Event: Public Form"
const featureMicrophone = "microphone"
const onlineRoomName = "Online"
const onlineChatRoomName = "Online Chat"
const selectRoomButtonName = "Select Room"
const addMeetingButtonName = "Add Meeting"
const meetingsAndLocationsSectionName = "Meetings & Locations"
const eventInfoSectionName = "Event Info"

describe('Create new event tests', function () {

    beforeEach(function(){
        cy.visit(common._appUrl);
        setTypeOfEventToCreate('Public Events');
    });

    it('Header name and Submit button disabled', function() {
        //verify header name
        cy.verifyHeaderText(newEventFormHeader);
        //make sure button is disabled when required field missing
        cy.buttonIsDisabled("Submit");
    }); 

    it('Select room modal verification', function() {
        clickAddMeetingButton();
        cy.getSectionNameInForm(meetingsAndLocationsSectionName)
        .should('be.visible');
        clickSelectRoomButton();
        getSelectRoomModal()
        .should('be.visible');
    });

    it('Add new room verification', function() {
        clickAddMeetingButton();
        clickSelectRoomButton();
        selectFeature(featureMicrophone);
        searchForAvailableRooms();
        checkAvailableRoomsListNumber(4);
        searchRoomByName(onlineRoomName);
        checkAvailableRoomsListNumber(1);
        clickRoomByName(onlineChatRoomName);
        //verify modal was closed
        getSelectRoomModal()
        .should('not.exist');
        //verify room name for meeting
        verifyRoomNameForMeeting(onlineChatRoomName);
    });

    it('Create new event', function() {
        fillEventInfo();
        clickAddMeetingButton();
        fillMeetingsAndLocations();
        //add room
        clickSelectRoomButton();
        searchRoomByName(onlineRoomName);
        clickRoomByName(onlineChatRoomName);
        //submit
        cy.submitForm();
        //verify request was sent
        cy.contains('Your event request has been submitted!')
        .should('be.visible');
    }); 
})

//#region Test functions
const clickSelectRoomButton = () => {
    cy.clickButtonInForm(selectRoomButtonName);
};

const clickAddMeetingButton = () => {
    cy.clickButtonInForm(addMeetingButtonName);
};

const setTypeOfEventToCreate = (name) => {
    cy.get('[class="bg-white p-4 text-sm rounded shadow w-full mb-4"]', {timeout: common._defaultTimeout})
    .within(() => {
        cy.get('select[id="requestEventTypeSelect"]', {timeout: common._defaultTimeout})
        .select(name, {force: true});
    })
};

const fillEventInfo = () => {
    cy.typeInForm('Requester Info', 'Email Address', emailAddress);
    cy.typeInForm(eventInfoSectionName, 'Event Name', eventName);
    cy.typeInForm(eventInfoSectionName, 'Start date', startDate);
    cy.typeInForm(eventInfoSectionName, 'End date', endDate);
    cy.selectRadioForLabel('Featured Event', 'Yes');
};

const fillMeetingsAndLocations = () => {
    cy.typeInForm(meetingsAndLocationsSectionName, 'Start Date', startDate);
    cy.typeInForm(meetingsAndLocationsSectionName, 'End Date', endDate);
    cy.typeInForm(meetingsAndLocationsSectionName, 'Start Time', '13:00');
    cy.typeInForm(meetingsAndLocationsSectionName, 'End Time', '14:00');
};

const getSelectRoomModal = () => {
    return cy.get('[class="modal-content absolute w-full md:w-1/2 bg-white rounded-sm shadow-lg flex flex-col justify-between"]', {timeout: common._defaultTimeout})
};

const selectFeature = (name) => {
    getSelectRoomModal()
    .within(() => {
        cy.get('select[name="Rooms Required Features"]', {timeout: common._defaultTimeout})
        .select(name, {force: true});
    })
};

const searchForAvailableRooms = () => {
    cy.clickButton('Search for Available Rooms')
};

const getAvailableRoomsList = () => {
    return cy.get('[class="w-full border p-3 mb-4 rounded text-left hover:bg-grey-lighter"]', {timeout: common._defaultTimeout})
};

const checkAvailableRoomsListNumber = (number) => {
    getSelectRoomModal()
    .within(() => {
        getAvailableRoomsList()
        .should('have.length', number)
    })
};

const searchRoomByName = (name) => {
    getSelectRoomModal()
    .within(() => {
        cy.get('[name="Rooms Search Query"]')
        .type(name)
    })
    searchForAvailableRooms();
};

const clickRoomByName = (name) => {
    getSelectRoomModal()
    .within(() => {
        getAvailableRoomsList()
        .contains(name)
        .click({force: true})
    })
};

const verifyRoomNameForMeeting = (name) => {
    cy.getForm()
    .within(() => {
        cy.contains('label', 'Room')
        .parent('div')
        .within(() => {
            cy.get('input')
            .should('have.value', name);           
        })
    })
};
//#endregion