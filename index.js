#!/usr/bin/env node

"use strict";

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const inquirer = require("inquirer");
const chalk = require("chalk");

process.on("exit", () => console.log("\nbye👋👋"));

async function askProjectName() {
  const question = {
    type: "input",
    name: "projectName",
    message: `${chalk.gray("[1/4]")} 💡 enter project name :`
  };

  const { projectName } = await inquirer.prompt([question]);
  if (!projectName || projectName === "") {
    throw Error("please enter project name..");
  }

  // console.log(`\nyour project name : ${chalk.blue(projectName)}`);

  return projectName;
}

function setBoilerplate(projectName) {
  const pathToCopy = path.resolve(process.cwd(), `${projectName}`);

  if (!fs.existsSync(pathToCopy)) {
    fs.mkdirSync(pathToCopy);
  } else {
    throw Error(`${chalk.red(`/${projectName} is already exists.`)}`);
  }

  process.stdout.write(
    `${chalk.green("!")} ${chalk.gray("[3/4]")} 🎢  Setting boilerplate....  `
  );

  fse.copySync(path.resolve(__dirname, "boilerplate"), pathToCopy);

  console.log("✅  Success!");
}

function checkNpmAvailable() {
  process.stdout.write(
    `${chalk.green("?")} ${chalk.gray(
      "[2/4]"
    )} 🧙‍  I'll check if you're using the ${chalk.bold("npm....  ")}`
  );

  try {
    execSync("npm --version");
    console.log("✅  Ok !");
  } catch (e) {
    console.log(
      "⛔️ Please install package manager(https://yarnpkg.com/lang/en/ or https://nodejs.org/en/) !!!! "
    );
  }
}

function installPakcages(projectName) {
  process.stdout.write(
    `${chalk.green("!")} ${chalk.gray("[4/4]")} 🧙‍  install Packages..`
  );
  execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });
}

function suggestShell(projectName) {
  console.log(`\n\n ${chalk.yellow('cd')} ${projectName}`);
  console.log(`${chalk.yellow('npm start')}`);
}

async function startTasks() {
  // 1. [1/1] 질문받기
  const projectName = await askProjectName();
  // 1. [2/4] npm 사용하는지 확인하기
  checkNpmAvailable();
  // 2. [3/4] 복붙하기
  setBoilerplate(projectName);
  // 3. [4/4] npm i 하기
  installPakcages(projectName);
  // 명령문 설명해주기.
  suggestShell();
}

startTasks();
