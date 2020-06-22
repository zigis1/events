import * as common from '../integration/common';

//#region Common
Cypress.Commands.add("checkLabelContainsName", (name) => { 
    cy.contains('label', name, {timeout: common._defaultTimeout})
})

Cypress.Commands.add("checkButtonContainsName", (name) => { 
    cy.contains('button', name, {timeout: common._defaultTimeout})
})

Cypress.Commands.add("getEventCard", (name) => { 
    cy.get('[class="card xl:min-h-64"]', {timeout: common._defaultTimeout})
})

Cypress.Commands.add("verifyHeaderText", (text) => { 
    cy.contains('h1', text, {timeout: common._defaultTimeout})
    .should('be.visible')
})

Cypress.Commands.add("buttonIsDisabled", (name) => { 
    cy.contains('button', name, {timeout: common._defaultTimeout})
    .should('be.disabled');
})

Cypress.Commands.add("clickButton", (name) => { 
    cy.contains('button', name, {timeout: common._defaultTimeout})
    .click()
})

Cypress.Commands.add("submitForm", () => { 
    cy.clickButton('Submit');
})
//#endregion Common

//#region Form
Cypress.Commands.add("getForm", () => { 
    cy.get('form[data-v-5cbd0d79]', {timeout: common._defaultTimeout})
})

Cypress.Commands.add("getSectionNameInForm", (name) => { 
    cy.getForm()
    .within(() => {
        cy.contains(name, {timeout: common._defaultTimeout})
    })
})

Cypress.Commands.add("typeInForm", (sectionName, labelName, data) => { 
    cy.getForm()
    .within(() => {
        cy.get('[class="bg-white p-4 text-sm rounded shadow mb-4 block -mx-4 md:mx-0"]')
        .contains(sectionName)
        .parent()
        .within(() => {
            cy.contains(labelName)
            .parent()
            .within(() => {
                cy.get('input')
                .clear()
                .type(data)
            }); 
        })
    })
})

Cypress.Commands.add("clickButtonInForm", (name) => { 
    cy.getForm()
    .within(() => {
        cy.clickButton(name)
    })
})

Cypress.Commands.add("selectRadioForLabel", (label, radio) => { 
    cy.getForm()
    .within(() => {
        cy.contains(label)
        .parent('fieldset')
        .within(() => {
            cy.contains('label', radio)
            .first()
            .click({force: true})
        })
    })
})
//#endregion Form

//#region Calendar
Cypress.Commands.add("clickDateInCalendar", (day) => { 
    cy.get('[class="vc-w-full vc-relative"]', {timeout: common._defaultTimeout})
    .within(() => {
        cy.contains(day)
        .click({force: true})
    })
})
//#endregion Calendar

//#region Events Listing
Cypress.Commands.add("checkListingMessage", (message) => { 
    cy.contains('h1', message, {timeout: common._defaultTimeout})
    .should('be.visible')
})

Cypress.Commands.add("checkNumberOfAvailableEventsCards", (number) => { 
    cy.get('[id="main-content"]', {timeout: common._defaultTimeout})
    .within(() => {
        cy.getEventCard()
        .should('have.length', number)
    })
})

Cypress.Commands.add("getEventCardFromListingByTitle", (title) => { 
    cy.get('[id="main-content"]', {timeout: common._defaultTimeout})
    .within(() => {
        cy.getEventCard()
        .contains(title)
    })
})

Cypress.Commands.add("openEventCardWithTitle", (title) => { 
    cy.getEventCardFromListingByTitle(title)
    .first()
    .click({force: true})
})
//#endregion Events Listing

//#region Event Details
Cypress.Commands.add("getEventsDetailsCard", (title) => {
    cy.get('div[id="main-content"]', {timeout: common._defaultTimeout})
    .within(() => {
        cy.get('article', {timeout: common._defaultTimeout})
    })
})

Cypress.Commands.add("getUpcomingEventsListFromEventDetails", (title) => {
    cy.contains('div[id="main-content"]', "QA Task Submission", {timeout: common._defaultTimeout})
    .within(() => {
        cy.get('aside', {timeout: common._defaultTimeout})
    })
})
//#endregion Event Details

//#region Navigation Menu
Cypress.Commands.add("clickButtonInNavigationMenu", (buttonName) => { 
    cy.get('nav', {timeout: common._defaultTimeout})
    .within(() => {
        cy.contains(buttonName)
        .click({force: true})
    })
})

Cypress.Commands.add("getSearchFromNavBar", () => { 
    cy.get('form[role="search"]', {timeout: common._defaultTimeout})
})

Cypress.Commands.add("searchForTextFromMainBar", (text) => { 
    cy.getSearchFromNavBar()
    .type(text)
    cy.getSearchFromNavBar()
    .within(() => {
        cy.get('[class="search__button"]')
        .click({force: true})
    })
    cy.contains('Search results for "'+text+'"', {timeout: common._defaultTimeout})
})
//#endregion Navigation Menu

//#region Filter
Cypress.Commands.add("getFilterMenu", () => { 
    cy.get('[class="card p-4 flex flex-col w-full"]', {timeout: common._defaultTimeout})
})
//endregion Filter