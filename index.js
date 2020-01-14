  
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const convertFactory = require("electron-html-to");
const electron = require("electron");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);



const generateHTML = require("./generateHTML")







function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your GitHub username?"
      },
      {
        type: "list",
        name: "color",
        message: "What's your favorite color?",
        choices: [
          "green",
          "blue",
          "pink",
          "red"
        ]
      },   
    ]);
  }

  promptUser()
  .then(function(data) {
   const queryUrl = `https://api.github.com/users/${data.name}`;
   const starsUrl = `https://api.github.com/users/${data.name}/starred`;
    // console.log(queryUrl)
    const color = data.color;
    axios.get(queryUrl).then(function(res){
      //console.log(res)

        axios.get(starsUrl).then(function(stars){

          //console.log(stars) 
          const html = generateHTML({stars, color, res });
          writeFileAsync("index.html", html);
          
        
            });
          });
        });
     
  
  
  
 
  

  

