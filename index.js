#!/usr/bin/env node

"use strict";

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const inquirer = require("inquirer");
const chalk = require("chalk");
const question = {
  type: "input",
  name: "serviceId",
  message: "프로젝트 이름을 작성해주세요.",
  default: "defaultServiceId"
};
const handlebars = require("handlebars");
const devices = ["m", "p"];

process.on("exit", () => console.log("\nBye~👋"));

inquirer.prompt([question]).then(({ serviceId }) => {
  if (serviceId === "") {
    throw Error("serviceId를 입력해주세요.");
  }
  console.log(`✅  the service id : ${chalk.bgGreen(serviceId)}`);

  tmonReactStarter()
    .then(async () => {
      await setBoilerplate(serviceId);
    })
    .catch(e => {
      console.log("⛔️ ", e);
    });
});

function setBoilerplate(serviceId) {
  const pathToCopy = path.join(process.cwd(), `${serviceId}`);

  if (!fs.existsSync(pathToCopy)) {
    fs.mkdirSync(pathToCopy);
  } else {
    throw Error(`/${serviceId}는 이미 존재하는 디렉토리입니다.`);
  }

  console.log("✅  Setting boilerplate...");

  console.log(`✅  create ${chalk.green(`.workconfig-${serviceId}`)}`);

  devices.forEach(function(d) {
    const devicePath = path.join(pathToCopy, d);
    fs.mkdirSync(devicePath);
    fse.copySync(path.join(__dirname, "/boilerplate/"), devicePath);

    // gitignore -> .gitignore
    fs.renameSync(
      path.join(devicePath, "gitignore"),
      path.join(devicePath, ".gitignore")
    );
    fs.renameSync(
      path.join(devicePath, "npmrc"),
      path.join(devicePath, ".npmrc")
    );

    fs.writeFileSync(
      path.join(devicePath, `.workconfig-${serviceId}`),
      handlebars.compile(
        fs.readFileSync(
          path.join(__dirname, "template/workconfig.hbs"),
          "utf-8"
        )
      )({ serviceId, device: d })
    );
  });

  console.log("✅  setting boilerplate successfully!");
}

function shouldUseNpm() {
  console.log("✅  Checking npm...");

  try {
    execSync("npm --version");
    console.log("✅  Ok !");
    return true;
  } catch (e) {
    console.log("✅  Nope !");
    return false;
  }
}

function shouldUseYarn() {
  console.log("✅  Checking yarnpkg...");

  try {
    execSync("yarnpkg --version");
    console.log("✅  Ok !");
    return true;
  } catch (e) {
    console.log("✅  Nope !");
    return false;
  }
}

function tmonReactStarter() {
  return new Promise((resolve, reject) => {
    const useNpm = shouldUseNpm();
    const useYarn = useNpm ? false : shouldUseYarn();

    if (useNpm) {
      resolve("npm");
    } else if (useYarn) {
      resolve("yarn");
    } else {
      reject({
        msg:
          "⛔️ Please install package manager(https://yarnpkg.com/lang/en/ or https://nodejs.org/en/) !!!! "
      });
    }
  });
}
