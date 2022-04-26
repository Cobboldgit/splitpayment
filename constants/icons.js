import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { appColor } from "./theme";

const user = require("../assets/icons/user.png");
const add = <Ionicons name="add-circle" size={24} color={appColor.black} />;
const contact = (
  <MaterialIcons name="contact-phone" size={24} color={appColor.purple} />
);
const team1 = require("../assets/icons/team1.png");
const team2 = require("../assets/icons/team2.png");
const addteam = require("../assets/icons/addteam.png");
const logo = require("../assets/icons/logo1.png");
const mtn = require("../assets/icons/mtn.png");
const mark = require("../assets/icons/Mark.png");
const eye = require("../assets/icons/eye.png");
const disabledEye = require("../assets/icons/disable_eye.png");
const error = require("../assets/icons/error.png");

export default {
  user,
  add,
  contact,
  team1,
  team2,
  addteam,
  logo,
  mtn,
  mark,
  eye,
  disabledEye,
  error
};
