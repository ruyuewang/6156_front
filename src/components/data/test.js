const object = "{\"country\":{\"S\":\"US\"},\"address3\":{\"NULL\":true},\"address2\":{" +
    "\"S\":\"Fl 2\"},\"city\":{\"S\":\"Palisades Park\"},\"address1\":{\"S\":\"8 Henry Ave\"},\"display_address\":{\"L\":[{\"S\":\"8 Henry Ave\"},{\"S\":\"Fl 2\"},{\"S\":\"Palisades Park, NJ 07650\"}]},\"state\":{\"S\":\"NJ\"},\"zip_code\":{\"S\":\"07650\"}}"


console.log("test ", JSON.parse(object));