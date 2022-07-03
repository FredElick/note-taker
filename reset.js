const fs=require('fs');
const path=require('path');
let defaultArray =  [
    {
      "title": "Test Title",
      "text": "Test text",
      "id": "test1234"
    }
]

fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(defaultArray, null, 2)
);