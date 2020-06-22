import * as common from '../integration/common'
const eventTypeToFilter = "Coursedog Team"

describe('Filter events tests', function () {

    beforeEach(function(){
        cy.visit(common._appUrl)
    });

    it('BUG Filter events by Organization', function() {
        //this test fails, b/c it expect to see 5 events (per description), but there are 4
        //will pass when 1 extra event will be removed
        filterByOrganization(eventTypeToFilter)
        cy.checkNumberOfAvailableEventsCards(5);
    }); 
})

//#region Test functions
const filterByOrganization = (name) => {
    cy.getFilterMenu()
    .within(() => {
        cy.get('select[id="orgSelect"]')
        .select(name, {force: true})
    })
};

const filterByEventType = (type) => {
    cy.getFilterMenu()
    .within(() => {
        cy.get('select[id="typeSelect"]')
        .select(type, {force: true})
    })
};
//#endregion