import { 
    MONITOR_ROUTE, PRIVATE_USER_ROUTE, ERROR_404_ROUTE, FORGOT_PASSWORD_ROUTE, 
    HOME_ROUTE, RESET_PASSWORD_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE, 
    SUCCESS_ROUTE, PUBLIC_DEVICE_ROUTE, BASKET_ROUTE, PRIVATE_PROFILE_ROUTE, 
    PRIVATE_TYPE_ROUTE, PRIVATE_DEVICE_ROUTE, PRIVATE_BRAND_ROUTE,
    PRIVATE_ADMIN_ROUTE, USER_PROFILE, PRIVATE_DEVICE_PAGE_ROUTE, 
    PUBLIC_DEVICE_PAGE_ROUTE,
    PUBLIC_TYPE_ROUTE,
    PRIVATE_FOLLOW_NOTIFICATION,
    PRIVATE_NOTIFICATION_ROUTE,
    ABOUT_US_ROUTE,
    VERIFY_ROUTE,
    CHECK_MAIL_ROUTE,
    PRIVATE_SETTINGS_ROUTE,
    CHECKOUT_ROUTE,
    PAYMENT_SUCCESS_ROUTE,
} from "../utils/consts";

import AuthContainer from "../containers/auth/AuthContainer";
import Success from "../pages/success/Success"
import PrivateUserContainer from "../containers/private/PrivateUserContainer";
import PrivateAdminContainer from "../containers/private/PrivateAdminContainer";
import PrivateMonitorContainer from "../containers/private/PrivateMonitorContainer";
import PrivateProfileContainer from "../containers/private/PrivateProfileContainer";
import PrivateTypeContainer from "../containers/private/PrivateTypeContainer";
import PrivateBrandContainer from "../containers/private/PrivateBrandContainer";
import PrivateDeviceContainer from "../containers/private/PrivateDeviceContainer";
import PrivateDevicePage from "../pages/private/PrivateDevicePage";
import PublicDeviceContainer from "../containers/public/PublicDeviceContainer";
import PublicDevicePage from "../pages/public/PublicDevicePage";
import HomeContainer from "../containers/public/HomeContainer";
import UserProfileContainer from "../containers/public/UserProfileContainer";
import PublicTypeContainer from "../containers/public/PublicTypeContainer";
import PrivateFollowNotificationContainer from "../containers/private/PrivateFollowNotificationContainer";
import PrivateNotificationContainer from "../containers/private/PrivateNotificationContainer";
import AboutUsContainer from "../containers/public/AboutUsContainer";
import VerifyContainer from "../containers/auth/VerifyContainer";
import CheckMailContainer from "../containers/auth/CheckMailContainer";
import PrivateSettingsContainer from "../containers/private/PrivateSettingsContainer";
import BasketContainer from "../containers/public/BasketContainer";
import CheckOutContainer from "../containers/public/CheckOutContainer";
import PaymentSuccessContainer from "../containers/public/PaymentSuccessContainer";
import ForgotContainer from "../containers/auth/ForgotContainer";
import ResetContainer from "../containers/auth/ResetContainer";
import ErrorContainer from "../containers/error/ErrorContainer";

const authRoutes = [
    {
        path: SIGNIN_ROUTE,
        Component: AuthContainer
    },
    {
        path: SIGNUP_ROUTE,
        Component: AuthContainer
    },
    {
        path: VERIFY_ROUTE,
        Component: VerifyContainer
    },
    {
        path: CHECK_MAIL_ROUTE,
        Component: CheckMailContainer
    },
    {
        path: RESET_PASSWORD_ROUTE,
        Component: ResetContainer
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        Component: ForgotContainer
    },
    {
        path: ERROR_404_ROUTE,
        Component: ErrorContainer
    },
];

const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: HomeContainer,
    },
    {
        path: PUBLIC_DEVICE_ROUTE,
        Component: PublicDeviceContainer
    },
    {
        path: PUBLIC_DEVICE_PAGE_ROUTE + '/:id',
        Component: PublicDevicePage
    },
    {
        path: PUBLIC_TYPE_ROUTE,
        Component: PublicTypeContainer
    },
    {
        path: BASKET_ROUTE,
        Component: BasketContainer
    },
    {
        path: CHECKOUT_ROUTE,
        Component: CheckOutContainer
    },
    {
        path: PAYMENT_SUCCESS_ROUTE,
        Component: PaymentSuccessContainer
    },
    {
        path: USER_PROFILE + '/:id',
        Component: UserProfileContainer
    },
    {
        path: ABOUT_US_ROUTE,
        Component: AboutUsContainer
    }
];

const privateRoutes = [
    {
        path: MONITOR_ROUTE,
        Component: PrivateMonitorContainer
    },
    {
        path: PRIVATE_USER_ROUTE,
        Component: PrivateUserContainer
    },
    {
        path: PRIVATE_PROFILE_ROUTE + '/:id',
        Component: PrivateProfileContainer
    },
    {
        path: PRIVATE_TYPE_ROUTE,
        Component: PrivateTypeContainer
    },
    {
        path: PRIVATE_DEVICE_ROUTE,
        Component: PrivateDeviceContainer
    },
    {
        path: PRIVATE_DEVICE_PAGE_ROUTE + '/:id',
        Component: PrivateDevicePage
    },
    {
        path: PRIVATE_BRAND_ROUTE,
        Component: PrivateBrandContainer
    },
    {
        path: PRIVATE_ADMIN_ROUTE,
        Component: PrivateAdminContainer
    },
    {
        path: PRIVATE_FOLLOW_NOTIFICATION,
        Component: PrivateFollowNotificationContainer
    },
    {
        path: PRIVATE_NOTIFICATION_ROUTE,
        Component: PrivateNotificationContainer
    },
    {
        path: PRIVATE_SETTINGS_ROUTE,
        Component: PrivateSettingsContainer
    }
];


export {
    publicRoutes,
    privateRoutes,
    authRoutes
};