const config = require('../../data/config/config.data.json');
const internalAdminEmail = config.INTERNAL_ADMINS.USERNAME;
const internalAdminPassword = config.INTERNAL_ADMINS.PASSWORD;
const secondInternalAdminEmail = config.INTERNAL_ADMINS.SECOND_USERNAME;
const secondInternalAdminPassword = config.INTERNAL_ADMINS.SECOND_PASSWORD;
const userBuilderEmail = config.USER_BUILDER.BUILDER.USERNAME;
const userBuilderPassword = config.USER_BUILDER.BUILDER.PASSWORD;
const userAdminEmail = config.USER_ADMIN.ADMIN.USERNAME;
const userAdminPassword = config.USER_ADMIN.ADMIN.PASSWORD;
const userPrivateThemeEmail = config.USER_ADMIN_PRIVAT_THEME.ADMIN.USERNAME;
const userPrivateThemePassword = config.USER_ADMIN_PRIVAT_THEME.ADMIN.PASSWORD;
const secondUserAdminEmail = config.SECOND_USER_ADMIN.ADMIN.USERNAME;
const secondUserAdminPassword = config.SECOND_USER_ADMIN.ADMIN.PASSWORD;
const secondUserBuilderEmail = config.SECOND_USER_BUILDER.BUILDER.USERNAME;
const activateDeactivateEmail = config.ACTIVATE_DEACTIVATE_USER_ADMIN.ADMIN.USERNAME;
const activateDeactivatePassword = config.ACTIVATE_DEACTIVATE_USER_ADMIN.ADMIN.PASSWORD;
const changePasswordUserEmail = config.CHANGE_PASSWORD_UI.ADMIN.USERNAME;
const changePasswordUserPassword = config.CHANGE_PASSWORD_UI.ADMIN.PASSWORD;
const grantType = config.API.GRANT_TYPE;
const code = config.API.CODE;
const clientID = config.API.CLIENT_ID;
const wrongCode = config.API.WRONG_CODE;
const apiAdminName = config.API.ADMIN.name;
const apiAdminPassword = config.API.ADMIN.password;
const apiUserName = config.API.USER.NAME;
const apiUserPassword = config.API.USER.PASSWORD;

export class UserDataHelper {

  static async getUser(type: string) {
    switch (type) {
      case 'internal_admin': {
        return {
          email: internalAdminEmail,
          password: internalAdminPassword,
        }
      }
      case 'second_internal_admin': {
        return {
          email: secondInternalAdminEmail,
          password: secondInternalAdminPassword,
        }
      }
      case 'user_admin': {
        return  {
          email: userAdminEmail,
          password: userAdminPassword,
        }
      }
      case 'second_user_admin': {
        return  {
          email: secondUserAdminEmail,
          password: secondUserAdminPassword,
        }
      }
      case 'change_password_user_admin': {
        return  {
          email: changePasswordUserEmail,
          password: changePasswordUserPassword,
        }
      }
      case 'user_privat_theme': {
        return  {
          email: userPrivateThemeEmail,
          password: userPrivateThemePassword,
        }
      }
      case 'user_builder': {
        return  {
          email: userBuilderEmail,
          password: userBuilderPassword,
        }
      }
      case 'second_user_builder': {
        return  {
          email: secondUserBuilderEmail,
          password: secondUserAdminPassword,
        }
      }
      case 'activate_deactivate_account': {
        return {
          email: activateDeactivateEmail,
          password: activateDeactivatePassword,
        }
      }
      case 'api_admin': {
        return  {
          grantType: grantType,
          name: apiAdminName,
          password: apiAdminPassword,
          code: code,
          clientID: clientID,
          wrong_code: wrongCode,
        }
      }
      case 'api_user': {
        return  {
          grantType: grantType,
          name: apiUserName,
          password: apiUserPassword,
          code: code,
          clientID: clientID,
          wrong_code: wrongCode,
        }
      }
    }
  }
}
