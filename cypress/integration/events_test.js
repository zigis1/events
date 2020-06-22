import * as common from '../integration/common'
const noEventsToday = "No events today"
const noEventsFound = "No events found"
const todaysEventsButton = "Today’s Events"
const featuredEventsButton = "Featured Events"

describe('Check events lists tests', function () {

    beforeEach(function(){
        cy.visit(common._appUrl)
    });

    it('One event found for Todays Events' , function() {
        clickTodaysEventsInNavMenu();
        cy.checkNumberOfAvailableEventsCards(1);
    }); 

    it('No events found for specific date', function() {
        cy.clickDateInCalendar(16);
        checkNoEventsFoundMessage();
    }); 

    it('One event found for specific date', function() {
        cy.clickDateInCalendar(18);
        cy.checkNumberOfAvailableEventsCards(1);
    }); 

    it('BUG Check Featured Events list', function() {
        clickFeaturedEventsInNavMenu();
        //it fails now, b/c there are 4 events -> it will pass when 1 even will be deleted
        cy.checkNumberOfAvailableEventsCards(3);
    }); 
})

//#Test functions
const checkNoEventsFoundMessage = () => {
    cy.checkListingMessage(noEventsFound);
}

const checkNoEventsTodayMessage = () => {
    cy.checkListingMessage(noEventsToday);
}

const clickTodaysEventsInNavMenu = () => {
    cy.clickButtonInNavigationMenu(todaysEventsButton);
}

const clickFeaturedEventsInNavMenu = () => {
    cy.clickButtonInNavigationMenu(featuredEventsButton);
}
//#endregion