/* jshint esversion: 8 */

// This module exports an object which has methods for every type of action
 // when a request is made to an api endpoint.

// Require the function that updates the database
// and the one that queries the database table for entries.

const update = require("./../database/update");
const query = require("./../database/query");

// The controller object has methods for post, put and delete operations.

const apiController = {




  // Create a new row into the specified database table.

  create: (tableName) => {

    // The name property for a new database entry will be the current timestamp.

    const date = Date.now();

    // Create the sql text that will insert a new row into the specified database table.

    const sql = `INSERT INTO ${tableName} (name) VALUES (${date})`;

    // Update the database.

    update(sql);
  },




  // Delete a row from the specified database table.
  // Locate the correct row using the provided index.

  delete: async (tableName, index) => {

    // Query the specified database table for results, which will be returned in an array.

    const result = await query(tableName);

    // Use the provided index to obtain the correct result from the array.

    const id = result[index].id;

    // Use the id to locate the correct entry from the database table and create the sql text to delete it.

    const sql = `DELETE FROM ${tableName} WHERE id = '${id}'`;

    // Update the database.

    update(sql);
  },




  // Archive an entry (Move to another table).

  archive: async (original, archive, index) => {

    // Query the sepcified database for results and return them in an array.

    const result = await query(original);

    // Use the provided index to get the id of the correct entry.

    const id = result[index].id;

    // Create the sql text for moving this entry to another table which stores archived data.

    const sql1 = `INSERT INTO ${archive}  SELECT * FROM ${original} WHERE id ='${id}'`;

    // Create the sql text for deleting this entry from the original database.

    const sql2 = `DELETE FROM ${original} WHERE id = '${id}'`;

    // Carry out the database operations.

    update(sql1);
    update(sql2);
  },




  // Restore the entry from an archive table to the original one.

  restore: async (original, archive, index) => {

    // Query the sepcified database for results and return them in an array.

    const result = await query(archive);

    // Use the provided index to get the id of the correct entry.

    const id = result[index].id;

    // Create the sql text for moving this entry back to its original database table.

    const sql1 = `INSERT INTO ${original}  SELECT * FROM ${archive} WHERE id ='${id}'`;

    // Create the sql text for deleting the entry from the archive database table.

    const sql2 = `DELETE FROM ${archive} WHERE id = '${id}'`;

    // Carry out the database operations.

    update(sql1);
    update(sql2);
  },




  // Update a database table.
  // This property has methods for different types of database tables.

  update: {


    // Update a specified database table containing information about static images
    // (which means that these images cannot be deleted and new ones cannot be created).
    // The method also needs access to the uploaded files object and an index to locate the correct entries from the table.

    staticImages: async (files, tableName, index) => {

      // If an index is not provided, it reverts to zero.

      index = index || 0;

      // The uploaded images are made available in the files variable as named properties.
      // The names of those properties are name attributes of the file inputs.
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

        // Update the database using the sql text created above. Await for its completion, then continue with the loop.

        await update(sql);
      }
    },


    // Update a database table containing information about dynamic images.
    // This method needs access to the uploaded files object and a selector string,
    // which contains information about the update process.

    dynamicImages: async (files, selector) => {

      // Construct the database table name that will be updated, from the provided selector.

      let tableName = selector + "_images";

      // Query the database table for results ordered by timestamp.

      const result = await query(tableName);

      // The uploaded images are made available in the files variable as named properties.
      // The names of those properties are name attributes of the file inputs.
      // Access those property names or index numbers and write them into an array.

      const keys = Object.keys(files);

      // Loop through the array.

      for (let i = 0; i < keys.length; i++) {

        // The name of each key is the provided selector + "img" + an index number.
        // Extract the index number from the key name using this knowledge,
        // then convert it to a js index by making it 0-based.

        let index = keys[i].slice(selector.length + 3) - 1;

        // Use this index to get the correct entry from the database.
        // Obtain the id of this database entry.

        let id = result[index].id;

        // The files object has access to the uploaded file's original filename.
        // Use it to get the precise location of the file in the server (add "/img/" in front of it).
        // Store the concatenated url in a variable.

        let url = "/img/" + files[keys[i]][0].originalname;

        // Create the sql text for updating the database.

        // The sql text will update the corresponding entry in the provided database table.

        let sql = `UPDATE ${tableName} SET url = '${url}' WHERE id = '${id}'`;

        // Update the database using the sql text created above. Await for its completion and then continue with the loop.

        await update(sql);
      }
    },


    // Update a specified database table, which contains information about images with a link property.
    // This method also needs access to the uploaded files object, a parsed form-data object,
    // and selector string, which contains information about the update process,

    imageLinks: async (files, body, selector, tableName) => {

      // Query the provided database table for results ordered by timestamp.

      const result = await query(tableName);

      // The text sent to the server is available in the provided body object as key-value pairs.
      // The key is the name attribute of each input, which sent the data, while the value is the inputted data itself.
      // Get all of these keys as an array.

      const keys = Object.keys(body);

      // Loop through the array.

      for (let i = 0; i < keys.length; i++) {

        // The name of each key is the provided selector + a number + "Link".
        // Extract the number from the key name using this knowledge,

        let number = keys[i].slice(selector.length, -4);

        // This number can be converted into a relevant index by making it 0-based.

        let index = number - 1;

        // Use this index to get the correct entry from the database.
        // Obtain the id of this database entry.

        let id = result[index].id;

        // Get the corresponding link property from the provided form-data object.
        // The name of this property can be constructed from the selector string and the obtain index number.

        let link = body[selector + (index + 1) + "Link"];

        // For each key in the body object, a corresponding key can be found in the files object as well,
        // but only if any file was selected and sent to the server from that form.
        // The corresponding key name in the files object can be constructed as follows:

        let file = selector + "Img" + number;

        // If the corresponding file exists update both the link and the url property of the correct entry in the database.

        if (files[file]) {

          // The files object has access to the uploaded file's original filename.
          // Use it to get the precise location of the file in the server (add "/img/" in front of it).
          // Store the concatenated url in a variable.

          const url = "/img/" + files[file][0].originalname;

          // Create the sql text for updating the database.
          // The sql text will update the corresponding entry in the provided database table.

          let sql = `UPDATE ${tableName} SET url = '${url}', link = '${link}' WHERE id = '${id}'`;

          // Update the database using the sql text created above. Await for its completion, then continue with the loop.

          await update(sql);

          // If no file is selected, only update the link property.

        } else {

          // Create the sql text for updating the link property in the database.

          let sql = `UPDATE ${tableName} SET link = '${link}' WHERE id = '${id}'`;

          // Update the database using the sql text created above. Await for its completion, then continue with the loop.

          await update(sql);
        }
      }
    },


    // Update a specified database table which contains text in Estonian and English.
    // This method also needs access to the parsed form-data object
    // and an index which can be used to locate the correct entry from the table.

    text: async (body, tableName, index) => {

      // If an index is not provided, it reverts to zero.

      index = index || 0;

      // The body object contains the form data in key-value pairs.
      // Get the names of the keys.

      const keys = Object.keys(body);

      // Get the value of each property by using the obtained keys.

      const est = body[keys[0]];
      const en = body[keys[1]];

      // Query the specified database table for entries.

      const result = await query(tableName);

      // Use the provided index to get the id of the relevant entry in the database table.

      const id = result[index].id;

      // Use the obtained information to create a sql text updating the database.

      const sql = `UPDATE ${tableName} SET est = '${est}', en = '${en}' WHERE id = '${id}'`;

      // Use the sql text to update the database.

      update(sql);

    },


    // Update a specified database table, which contains text in Estonian and English,
    // as well as a separate heading in both languages.
    // The method also needs access to the parsed form-data object
    // and an index, which can be used to locate the correct entry from the table.

    section: async (body, tableName, index) => {

      // If an index is not provided, it reverts to zero.

      index = index || 0;

      // The body object contains the form data in key-value pairs.
      // Get the names of the keys.

      const keys = Object.keys(body);

      // Get the value of each property by using the obtained keys.

      const headingEst = body[keys[0]];
      const headingEn = body[keys[1]];
      const est = body[keys[2]];
      const en = body[keys[3]];

      // Query the specified database table for entries.

      const result = await query(tableName);

      // Use the provided index to get the id of the relevant entry in the database table.

      const id = result[index].id;

      // Use the obtained information to create a sql text updating the database.

      const sql = `UPDATE ${tableName} SET heading_est = '${headingEst}', heading_en = '${headingEn}', est = '${est}', en = '${en}' WHERE id = '${id}'`;

      // Use the sql text to update the database.

      update(sql);
    },


    // Update a specified database table that contains information about a form element.
    // This method also needs access to the parsed form-data object.

    form: async (body, tableName) => {

      // The body object contains the form data in key-value pairs.
      // Get the names of the keys in an array.

      const keys = Object.keys(body);

      // The two first keys in the array correspond to the Estonian and English versions of the form heading.
      // Create a js object out of those keys.

      const heading = {
        est: body[keys[0]],
        en: body[keys[1]]
      };

      // The entry for this heading are located in the database table called "miscellaneous" not the provided one,
      // but the name property of this entry can be constructed from the name of the provided database table.
      // Create the sql text to update the database.

      const sql = `UPDATE miscellaneous SET est = '${heading.est}', en = '${heading.en}' WHERE name = '${tableName}_heading'`;

      // Update the database.

      update(sql);

      // Now query the provided database table for entries.

      const result = await query(tableName);

      // The keys array contains four types of properties- "est", "en", "required" and "expandable".
      // The type is specified at the very end of each key name.

      // Create an empty array to capture all the "est" properties from the keys array.

      const estKeys = [];

      // Loop through the array. Ignore the first two items which belong to the heading entry.

      for (let i = 2; i < keys.length; i++) {

        // If the string "Est" is found anywhere after the string "Form" in the name of a key,
        // it means that this key stores values for the "est" properties.
        // Capture those keynames into the empty array.

        if (keys[i].indexOf("Est") > keys[i].indexOf("Form")) {
          estKeys.push(keys[i]);
        }
      }

      // Loop through this newly populated array of "est" keynames.

      for (let i = 0; i < estKeys.length; i++) {

        // The name of each "est" key is an identifier + FormField + a number + "Est".
        // The only unknowns here are the identifier and the number.
        // Get the number using this knowledge.

        let pos = estKeys[i].indexOf("Field") + 5;
        let number = estKeys[i].slice(pos, -3);

        // This number can be converted to a js index and used on the database results.
        // To do that make this number 0-based.
        let index = number - 1;

        // Use the index to get a corresponding entry from the database table.

        let id = result[index].id;

        // The keyname for the "est" property is now known.
        // Other keynames can be constructed from this.
        // Use the keynames on the body object to get all the data sent from the form.

        let est = body[estKeys[i]];
        let en = body[estKeys[i].slice(0, pos) + number + "En"];
        let required = body[estKeys[i].slice(0, pos) + number + "Required"];
        let expandable = body[estKeys[i].slice(0, pos) + number + "Expandable"];

        // Create the sql text to update the correct database entry.

        let sql = `UPDATE ${tableName} SET est = '${est}', en = '${en}', required = '${required}', expandable = '${expandable}' WHERE id = '${id}'`;

        // Update the database. Await for its completion, then continue with the loop.

        await update(sql);
      }
    },


    // Update a specified database table that contains information about an iframe element.
    // This method also needs access to the parsed form-data object.

    iframes: async (body, tableName) => {

      // The body object contains the form data in key-value pairs.
      // Get the names of the keys.

      const keys = Object.keys(body);

      // Query the specified database table for entries.

      const result = await query(tableName);

      // Loop through the array of results, which should correspond precisely to the array of keynames.

      for (let i = 0; i < result.length; i++) {

        // Use the same iterator to match a database entry to a corresponding form-data value in the body variable.
        // Capture the database entry by using its id and the form-data value by using the keys array.

        let id = result[i].id;
        let link = body[keys[i]];

        // Use the obtained information to create a sql text updating the database.

        const sql = `UPDATE ${tableName} SET link = '${link}' WHERE id = '${id}'`;

        // Use the sql text to update the database. Wait for the function to complete, then continue with the loop.

        await update(sql);
      }
    },


    // Update a specified database table that contains information about a shop item.
    // This method also needs access to the parsed form-data object
    // and an index which can be used to locate the correct entry from the database.

    shopItem: async (body, tableName, index) => {

      // If an index is not provided, it reverts to zero.

      index = index || 0;

      // The body object contains the form data in key-value pairs.
      // Get the names of the keys.

      const keys = Object.keys(body);

      console.log(keys);

      // Get the value of each property by using the obtained keys.

      const headingEst = body[keys[0]];
      const headingEn = body[keys[1]];
      const price = body[keys[2]];
      const est = body[keys[3]];
      const en = body[keys[4]];

      // Query the specified database table for entries.

      const result = await query(tableName);

      // Use the provided index to get the id of the relevant entry in the database table.

      const id = result[index].id;

      // Use the obtained information to create a sql text updating the database.

      const sql = `UPDATE ${tableName} SET heading_est = '${headingEst}', heading_en = '${headingEn}', est = '${est}', en = '${en}', price = '${price}' WHERE id = '${id}'`;

      // Use the sql text to update the database.

      update(sql);
    }
  }
};

// Export the object.

module.exports = apiController;
