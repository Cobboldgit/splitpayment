import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { appColor } from './theme';

const user = require("../assets/icons/user.png")
const add = <Ionicons name="add-circle" size={24} color={appColor.purple} />
const contact = <MaterialIcons name="contact-phone" size={24} color={appColor.purple} />

export default {
    user,
    add,
    contact
}