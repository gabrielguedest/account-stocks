import { Constants } from "src/constants";
import { User } from "./entities/user.entity";
import { UserSequelizeRepository } from "./repositories/user-sequelize.repository";
import { UserBaseRepository } from "./repositories/user-base.repository";

export const userProviders = [
  {
    provide: Constants.UserRepository,
    useValue: User,
  },
  {
    provide: UserBaseRepository,
    useClass: UserSequelizeRepository,
  }
]