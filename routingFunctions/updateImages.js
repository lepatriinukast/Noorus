/* jshint esversion: 8 */

// This module exports a function which uploads images to the server
// and updates a specified database table using form data that is parsed with multer.

// Require from the database folder the function that updates the database
// and the one that queries the database table for entries.

const update = require("./../database/update");
const query = require("./../database/query");

// Three arguments are passed into the function:
// The selected files object, the name of the database table name that will be updated,
// and in case not all entries need to be updated in a table, an index as well.
// The index denotes the position in the database table, where the relevant entries start.

const updateImages = async (files, tableName, index) => {

  // If an index is not provided, it reverts to zero.

  index = index || 0;

  // Query the provided database table for results ordered by timestamp.

  const result = await query(tableName);

  // The uploaded images are made available in the files variable as named properties.
  // The names of those properties are name attributes of the file inputs.
  // The file inputs in turn have been named as index numbers,
  // which denote the position of the corresponding entry in the database table.

  // Access those property names or index numbers and write them into an array.

  const keys = Object.keys(files);

  // Loop through the array.

  for (let i = 0; i < keys.length; i++) {

    // The files object has access to the uploaded file's original filename.
    // Use it to get the precise location of the file in the server (add "/img/" in front of it).
    // Store the concatenated url in a variable.

    let url = "/img/" + files[keys[i]][0].originalname;

    // Create the sql text for updating the database.

    // The sql text will look for an entry in the provided database table,
    // where the name column matches the name of the key that is currently being looped over.
    // Then it will update the url column of this entry by replacing its contents with the new url.

    let sql = `UPDATE ${tableName} SET url = '${url}' WHERE name = '${keys[i]}'`;

    // Update the database using the sql text created above.

    await update(sql);
  }
};

// Export the function.

module.exports = updateImages;
