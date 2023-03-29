/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Joey',
      password: 'password',
      email: 'joey@hotmail.com',
      isAdmin: true,
      classification: 'Top Secret',
      unit: '1 SCS'
    },
    {
      name: 'Jasmine',
      password: 'password1',
      email: 'jasmine@hotmail.com',
      isAdmin: false,
      classification: 'Unclassified',
      unit: '1 CAB'
    },
    { name: 'Alice', password: 'p@ssw0rd', isAdmin: false, classification: 'Unclassified', unit: '3 ASG', email: 'alice@example.com' },
    { name: 'Bob', password: 'c0rrectHorseB@tterySt@ple', isAdmin: false, classification: 'Secret', unit: '1 ACS', email: 'bob@example.com' },
    { name: 'Charlie', password: 'il0veY0uJ@ne', isAdmin: true, classification: 'Top Secret', unit: '4 ARB', email: 'charlie@example.com' },
    { name: 'David', password: 'd@v1dR0cks!', isAdmin: false, classification: 'Unclassified', unit: '2 BSB', email: 'david@example.com' },
    { name: 'Eve', password: 'EvilEve123', isAdmin: false, classification: 'Secret', unit: '1 DIV', email: 'eve@example.com' },
    { name: 'Frank', password: 'fr@nklin123', isAdmin: true, classification: 'Top Secret', unit: '3 TRS', email: 'frank@example.com' },
    { name: 'Grace', password: 'gr@ceful123', isAdmin: false, classification: 'Secret', unit: '2 ESB', email: 'grace@example.com' },
    { name: 'Harry', password: 'Potter123', isAdmin: true, classification: 'Top Secret', unit: '5 FRS', email: 'harry@example.com' }
  ]);
};
