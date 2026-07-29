import {rateLimit} from "express-rate-limit";

const loginLimitter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 2,
    message : "too many attempts",
});
export default loginLimitter;