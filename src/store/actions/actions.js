import * as userAction from './userAction';
import * as adminAction from './adminAction';
import * as appAction from './appAction';
import * as errorAction from './errorAction';
import * as typeAction from './typeAction';
import * as brandAction from './brandAction';
import * as deviceAction from './deviceAction';
import * as notificationAction from './notificationAction';
import * as cartAction from './cartAction';
import * as deliveryAction from './deliveryAction';
import * as wishListAction from './wishListAction';

export default {
    ...userAction,
    ...adminAction,
    ...appAction,
    ...errorAction,
    ...typeAction,
    ...brandAction,
    ...deviceAction,
    ...notificationAction,
    ...cartAction,
    ...deliveryAction,
    ...wishListAction
}