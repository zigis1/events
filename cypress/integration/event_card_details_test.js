import * as common from '../integration/common'
const addToCalendarButtonText = "Add to calendar"
const addToGoggleCalendarButtonText = "Add to Google Calendar"
const eventTypeLabelText = "Event Type"
const organizedByLabelText = "Organized by"
const defaultEventName = "QA Task Submission"
const featuredEventsButton = "Featured Events"

describe('Check event details', function () {

    beforeEach(function(){
        cy.visit(common._appUrl);
        clickFeaturedEventsInNavMenu();
    });

    it('Open Event card and verify details', function() {
        cy.openEventCardWithTitle(defaultEventName);
        verifyEventDetails();
    }); 

    it('Open Event card and verify upcoming meetings list is presented', function() {
        cy.openEventCardWithTitle(defaultEventName);
        //list of upcoming meetings is presented
        cy.getUpcomingEventsListFromEventDetails()
        .should('be.visible')
        //number of meetings is more than 0
        verifyUpcomingMeetingsNumberMoreThan(0);
    }); 
})

//#region Test functions
const clickFeaturedEventsInNavMenu = () => {
    cy.clickButtonInNavigationMenu(featuredEventsButton);
}

const verifyEventDetails = () => {
    //verify location
    cy.getEventsDetailsCard()
    .within(() => {
        cy.get('[class="mr-1 svg-inline--fa fa-map-marker-alt fa-w-12"]')
        .should('be.visible')
    })
    //verify Add to calendar button
   cy.getEventsDetailsCard()
   .checkButtonContainsName(addToCalendarButtonText);
   //verify Add to google calendar button
   cy.getEventsDetailsCard()
   .checkButtonContainsName(addToGoggleCalendarButtonText);
   //verify Event type label
   cy.getEventsDetailsCard()
   .checkLabelContainsName(eventTypeLabelText);
   //verify Organized by label
   cy.getEventsDetailsCard()
   .checkLabelContainsName(organizedByLabelText);
};

const verifyUpcomingMeetingsNumberMoreThan = (number) => {
    cy.getUpcomingEventsListFromEventDetails()
    .within(() => {
        //verify list of cards for Upcoming meetings is > number
        cy.get('[class="card-content flex-col"]')
        .should(($cards) => {
            expect($cards.length).to.be.greaterThan(number)    
        })
    })
};
//#endregion