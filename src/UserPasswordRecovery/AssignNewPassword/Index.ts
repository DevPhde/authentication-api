import { RedisUserPasswordRecoveryRepository } from "../repository/implementations/RedisUserPasswordRecovery";
import { SequelizeUserPasswordRecoveryRepository } from "../repository/implementations/SequelizeUserPasswordRecovery";
import { PasswordProtection } from "../../provider/bcrypt/BcryptProvider";
import { AssignNewPasswordUseCase } from "./useCases/AssignNewPasswordUseCase";
import { AssignNewPasswordController } from "./useCases/AssignNewPasswordController";

const redis = new RedisUserPasswordRecoveryRepository();
const sequelize = new SequelizeUserPasswordRecoveryRepository();
const passwordProtection = new PasswordProtection();

const assignNewPasswordUseCase = new AssignNewPasswordUseCase(
    redis,
    sequelize,
    passwordProtection
)

export const assignNewPasswordController = new AssignNewPasswordController(
    assignNewPasswordUseCase
)