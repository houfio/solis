const fetch = require('node-fetch');
const { writeFile } = require('fs');
const { join } = require('path');

fetch('http://localhost:8000/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    result.data.__schema.types = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );

    writeFile(join(__dirname, '..', 'src', 'fragmentTypes.json'), JSON.stringify(result.data), (err) => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      }
    });
  });
