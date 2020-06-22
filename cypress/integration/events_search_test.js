import * as common from '../integration/common'
const partialEventNameToSearch = "Finale"

describe('Search events tests', function () {

    beforeEach(function(){
        cy.visit(common._appUrl)
    });

    it('Search event by partial name', function() {
        cy.searchForTextFromMainBar(partialEventNameToSearch)
        //check number of cards
        cy.checkNumberOfAvailableEventsCards(1);
        //check that presented event has partial name in title
        cy.getEventCardFromListingByTitle(partialEventNameToSearch)
        .should('contain', partialEventNameToSearch)
    }); 
})

