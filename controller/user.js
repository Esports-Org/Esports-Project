const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

const secretKey = "this-key-must-be-changed-in-deployment-and-add-it-to-process-env";

const userModel = require("../model/user");

const userController = {};

/*****************************validate password*************/
const validateCriteria = new passwordValidator();
validateCriteria
.is().min(8)
.is().max(70)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
/************************************************************/
